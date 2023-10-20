import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import {styles} from './styles';
import Header from '../../Components/Header';
import {arrowbackwhite} from '../../Assests';
import BuyCoinHeader from '../../Components/BuyCoinHeader';
import {TextComponent} from '../../Components/TextComponent';
import {hp, wp} from '../../Config/responsive';
import useBuyCoinScreen from './useBuyCoinScreen';

import {
  IapAndroid,
  PurchaseError,
  acknowledgePurchaseAndroid,
  clearTransactionIOS,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  requestSubscription,
  useIAP,
  validateReceiptIos,
  clearProductsIOS,
} from 'react-native-iap';
import useReduxStore from '../../Hooks/UseReduxStore';
import {androidAppUrl, baseURL, iosAppUrl} from '../../Utils/Urls';

import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {store} from '../../Redux/Reducers';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
const subscriptionSkus = Platform.select({
  ios: ['productId_10', 'productId20', 'productId_30', 'productId50'],
  // android: ['productid_10', 'productid_30'],
  // android: ['productsid_10'],
  android: [
    'productsid_10',
    'productsid_20',
    'productsid_30',
    'productsid_100',
  ],
});

// let purchaseUpdateSubscription = null;
// let purchaseErrorSubscription = null;
const errorLog = ({message, error}) => {
  console.error('An error happened', message, error);
};

const isIos = Platform.OS === 'ios';

const index = ({navigation, route}) => {
  // const {init, clear} = useBuyCoinScreen();
  const {getState, dispatch} = useReduxStore();
  const {token} = getState('Auth');
  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();
  const {items, isSub} = route.params;
  console.log(isSub, 'asdkjfklsajfklj');
  const [loading, setLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({message: 'handleGetPurchaseHistory', error});
    }
  };

  useEffect(() => {
    {
      isIos && handleGetPurchaseHistory();
    }
  }, [connected]);

  const handleGetSubscriptions = async () => {
    setIsPurchasing(true);

    try {
      await clearTransaction();
      // await clearProductsIOS();
      await getSubscriptions({skus: subscriptionSkus});
      setIsBoolProduct(false);
    } catch (error) {
      setIsPurchasing(false);
      errorLog({message: 'handleGetSubscriptions', error});
      setLoading(false);
    }
  };

  useEffect(() => {
    {
      isIos && handleGetSubscriptions();
    }
  }, [connected]);

  const handleBuySubscription = useCallback(
    async productId => {
      try {
        if (!isIos) {
          console.log('android');
          await requestPurchase({sku: productId}, true);
          setIsBoolProduct(false);
        } else {
          const reqSubs = await requestSubscription({
            sku: productId,
            andDangerouslyFinishTransactionAutomaticallyIOS: false,
          });
          setIsBoolProduct(false);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof PurchaseError) {
          setLoading(false);
          errorLog({message: `[${error.code}]: ${error.message}`, error});
        } else {
          errorLog({message: 'handleBuySubscription', error});
          setLoading(false);
        }
      }
    },
    [isIos],
  );

  const [checkInProgress, setCheckInProgress] = useState(false);

  const checkCurrentPurchase = useCallback(
    async purchase => {
      if (isPurchasing && purchase && !checkInProgress) {
        setCheckInProgress(true);

        try {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            if (Platform.OS === 'ios') {
              const isTestEnvironment = __DEV__;

              const appleReceiptResponse = await validateReceiptIos(
                {
                  'receipt-data': receipt,
                  // password: 'b3d4281737d54f98a8b4d663569a1441',
                  password: '2ed560e1272646beb57220f5818c6c46',
                },
                isTestEnvironment,
              );

              if (appleReceiptResponse) {
                const {status} = appleReceiptResponse;
                if (status && isSub.current) {
                  hitAPIToSever(receipt);
                  isSub.current = false;
                }
              }
            }
          }
        } catch (error) {
          setIsPurchasing(false);
          setLoading(false);

          console.log('error', error);
        } finally {
          setCheckInProgress(false);
          setLoading(false);
        }
      }
    },
    [isPurchasing],
  );

  useEffect(() => {
    if (isPurchasing) checkCurrentPurchase(currentPurchase);
  }, [checkCurrentPurchase, currentPurchase, isPurchasing]);

  const hitAPIToSever = useCallback(async receipt => {
    store.dispatch(loadingTrue());
    const body1 = {
      packageName: receipt?.packageNameAndroid,
      productId: receipt?.productId,
      purchaseToken: receipt?.purchaseToken,
    };
    let url = isIos ? iosAppUrl : androidAppUrl;
    console.log(body1, 'asfjaklsdfjlasjf1111klajaalsj');

    console.log(receipt, 'adklfjaklsdfjReceipt');
    const response = await fetch(baseURL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        // Add authorization headers if needed
      },
      body: JSON.stringify(
        isIos
          ? {
              token: receipt?.transactionReceipt,
            }
          : body1,
      ),
    });
    if (response.status == 200) {
      store.dispatch(loadingFalse());

      const data = await response.json();
      console.log('response=>>>>>', data);
      if (isIos) {
        navigation.navigate('HeaderDetailScreen', items);
      } else {
        const ackResult = await acknowledgePurchaseAndroid({
          token: receipt.purchaseToken,
        });
        const finishTransactionRes = await finishTransaction({
          purchase: receipt,
          isConsumable: true,
        });
        console.log('finishTransactionRes', finishTransactionRes);
        if (finishTransactionRes.code == 'OK') {
          navigation.navigate('HeaderDetailScreen', items);
        }
      }

      setIsPurchasing(false);
    } else {
      console.log('RESPONSE OK ERROR');
      setIsPurchasing(false);
      store.dispatch(loadingFalse());
    }
  }, []);

  const clearTransaction = async () => {
    if (Platform.OS === 'ios') {
      await clearTransactionIOS();
    } else {
      await flushFailedPurchasesCachedAsPendingAndroid();
    }
  };

  //START ANDROID WORK FOR PURCHASING

  // STATE
  const [isBoolProduct, setIsBoolProduct] = useState(false);

  const {products, getProducts, finishTransaction} = useIAP();

  useEffect(() => {
    if (connected) {
      getProducts({skus: subscriptionSkus});

      console.log('getting product....');
      setIsBoolProduct(true);
    }

    setIsBoolProduct(false);
  }, [connected, getProducts]);

  const hasExecutedRef = useRef(false);
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;

  const updateListenerFunction = () => {
    let i = 0;

    if (!hasExecutedRef.current) {
      purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
        const receipt = purchase.transactionReceipt;
        console.log(purchase.packageNameAndroid, 'PurchaseAaaaaaAaaas');
        console.log(purchase.productId, 'PurchaseAaaaaaAaaas');
        console.log(purchase.purchaseToken, 'PurchaseAaaaaaAaaas');
        console.log(i, 'ieyvaaaaavayassjuy');

        if (receipt && i == 0) {
          i++;
          console.log(i, isSub.current, 'ieyvaaavayassjuy');

          if (isSub.current) {
            isSub.current = false;
            await hitAPIToSever(purchase);
          }
        }
      });

      purchaseErrorSubscription = purchaseErrorListener(error => {
        console.log(error, 'purchaseErrorListener');
      });

      hasExecutedRef.current = true;
    }

    return async () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
      await endConnection();
    };
  };

  useEffect(() => {
    {
      !isIos && updateListenerFunction();
    }
  }, [updateListenerFunction]);

  useEffect(() => {
    const unsubscribe = updateListenerFunction();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  //END ANDROID WORK FOR PURCHASING

  const BuyCoin = ({coinTitle, coinDes, coinPrice, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.CoinImage}
            source={require('../../Assests/Icons/usdCoin.png')}
          />
          <View style={styles.midTextContainer}>
            <TextComponent text={coinTitle} styles={styles.coinText} />
            <TextComponent text={coinDes} styles={styles.coinDesText} />
          </View>
        </View>
        <View style={styles.lastTextContainer}>
          <TextComponent text={'$'} styles={styles.last1Text} />
          <TextComponent text={coinPrice} styles={styles.last2Text} />
        </View>
      </TouchableOpacity>
    );
  };
  if (loading && isIos) {
    return (
      <View style={{...styles.midContainer, flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isBoolProduct && !isIos) {
    return (
      <View style={{...styles.midContainer, flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <BuyCoinHeader
        onPress={() => navigation.goBack()}
        dayStyle={styles.dayStyle}
        style={styles.topHeader}
        headerTitle={'Buy Coins'}
        arrowBackIcon={arrowbackwhite}
        centerTextStyle={styles.centerHeading}
        backText={'Back'}
        centerImage={require('../../Assests/Images/stoundLogo.png')}
      />
      <View style={styles.dayBarStyle}>
        <TextComponent text={'Get your coins here!'} styles={{...styles.day}} />
      </View>
      <View style={{paddingBottom: hp('5')}}>
        {loading ? (
          <View style={{...styles.midContainer, marginTop: hp('10')}}>
            <ActivityIndicator />
          </View>
        ) : (
          (console.log(Platform.OS, subscriptions, 'alskfjlksdjflkasjdf'),
          products
            .sort((a, b) => a.price - b.price)
            .map((subscription, index) => {
              // const owned = purchaseHistory.find(
              //   s => s?.productId === subscription.productId,
              // );
              return (
                <View style={styles.midContainer}>
                  {isIos && (
                    <BuyCoin
                      onPress={() => {
                        setLoading(true);
                        handleBuySubscription(subscription.productId);
                      }}
                      coinTitle={subscription?.title}
                      // coinDes={'Validy until your coins finish'}
                      coinPrice={subscription?.localizedPrice}
                    />
                  )}
                </View>
              );
            }))
        )}

        {console.log(products, 'askldfjklsadjfklajsdfklajsld')}
        {isBoolProduct && !isIos ? (
          <View style={{...styles.midContainer, marginTop: hp('10')}}>
            <ActivityIndicator />
          </View>
        ) : (
          products
            .sort((a, b) => a.description - b.description)
            .map((subscription, index) => {
              return (
                <View key={subscription.productId} style={styles.midContainer}>
                  {!isIos && (
                    <BuyCoin
                      onPress={() => {
                        setLoading(true);
                        handleBuySubscription(subscription.productId);
                      }}
                      coinTitle={subscription?.name}
                      coinPrice={subscription?.description}
                    />
                  )}
                </View>
              );
            })
        )}
      </View>
    </ScrollView>
  );
};

export default memo(index);
