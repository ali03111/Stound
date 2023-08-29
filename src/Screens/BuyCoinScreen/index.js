import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {memo, useState, useEffect, useCallback, useRef} from 'react';
import {styles} from './styles';
import Header from '../../Components/Header';
import {arrowbackwhite} from '../../Assests';
import BuyCoinHeader from '../../Components/BuyCoinHeader';
import {TextComponent} from '../../Components/TextComponent';
import {hp, wp} from '../../Config/responsive';
import useBuyCoinScreen from './useBuyCoinScreen';

import {
  PurchaseError,
  clearTransactionIOS,
  flushFailedPurchasesCachedAsPendingAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from 'react-native-iap';
import useReduxStore from '../../Hooks/UseReduxStore';
import {baseURL, iosAppUrl} from '../../Utils/Urls';
import {types} from '../../Redux/types';
const subscriptionSkus = Platform.select({
  // ios: [items?.productId],
  ios: ['productId_10', 'productId_50', 'Ten100_1'],
  // android: ['productid_10', 'productid_30'],
  android: ['productid_10', 'productid_30', 'productid_50'],
});

const errorLog = ({message, error}) => {
  console.error('An error happened', message, error);
};

const isIos = Platform.OS === 'ios';

const index = ({navigation, route}) => {
  const {getState, dispatch} = useReduxStore();
  const {token} = getState('Auth');
  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
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
    handleGetPurchaseHistory();
  }, [connected]);
  let i = 0;

  const handleGetSubscriptions = async () => {
    try {
      setIsPurchasing(true);
      await clearTransaction();

      await getSubscriptions({skus: subscriptionSkus});
    } catch (error) {
      setIsPurchasing(false);
      errorLog({message: 'handleGetSubscriptions', error});
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);

  const handleBuySubscription = useCallback(async productId => {
    try {
      if (!isIos) {
        console.log('android');
        await requestSubscription({sku: productId});
      } else {
        const reqSubs = await requestSubscription({
          sku: productId,
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({message: `[${error.code}]: ${error.message}`, error});
      } else {
        errorLog({message: 'handleBuySubscription', error});
      }
    }
  }, []);

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
                  password: 'b3d4281737d54f98a8b4d663569a1441',
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
          console.log('error', error);
        } finally {
          setCheckInProgress(false);
        }
      }
    },
    [isPurchasing],
  );

  useEffect(() => {
    if (isPurchasing) checkCurrentPurchase(currentPurchase);
  }, [checkCurrentPurchase, currentPurchase, isPurchasing]);

  const hitAPIToSever = useCallback(async receipt => {
    const response = await fetch(baseURL + iosAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        // Add authorization headers if needed
      },
      body: JSON.stringify({
        token: receipt,
      }),
    });

    if (response.status == 200) {
      const data = await response.json();

      navigation.navigate('HeaderDetailScreen', items);
      setIsPurchasing(false);
    } else {
      console.log('RESPONSE OK ERROR');
      setIsPurchasing(false);
    }
  }, []);

  const clearTransaction = async () => {
    if (Platform.OS === 'ios') {
      await clearTransactionIOS();
    } else {
      flushFailedPurchasesCachedAsPendingAndroid();
    }
  };

  //START ANDROID WORK FOR PURCHASING

  // STATE
  const [isBoolProduct, setIsBoolProduct] = useState(false);

  const {products, getProducts} = useIAP();

  useEffect(() => {
    if (connected) {
      getProducts({skus: subscriptionSkus});
      console.log('getting product....');
      setIsBoolProduct(true);
    }

    setIsBoolProduct(false);
  }, [connected, getProducts]);

  useEffect(() => {
    const purchaseUpdateSub = purchaseUpdatedListener(async purchase => {
      const reciept = purchase.transactionReceipt;
      if (reciept) {
        //BACKEND
        console.log(reciept);
        let body = {receipt: reciept};
        try {
          //BACKENDQ
        } catch (error) {
          console.log(error, 'eror');
        }
      }
    });

    const PurchaseError = purchaseErrorListener(error => {
      console.log(error, 'purchaseErrorListener');
    });

    return () => {
      purchaseUpdateSub.remove();
      PurchaseError.remove();
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

  return (
    <>
      <View style={styles.container}>
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
          <TextComponent
            text={'Get your coins here!'}
            styles={{...styles.day}}
          />
        </View>

        {loading ? (
          <View style={{...styles.midContainer, marginTop: hp('10')}}>
            <ActivityIndicator />
          </View>
        ) : (
          (console.log(Platform.OS, subscriptions, 'alskfjlksdjflkasjdf'),
          subscriptions
            .sort((a, b) => a.price - b.price)
            .map((subscription, index) => {
              const owned = purchaseHistory.find(
                s => s?.productId === subscription.productId,
              );
              return (
                <View style={styles.midContainer}>
                  {isIos && !owned && (
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
        {isBoolProduct && !isIos ? (
          <View style={{...styles.midContainer, marginTop: hp('10')}}>
            <ActivityIndicator />
          </View>
        ) : (
          (console.log(
            Platform.OS,
            products,
            purchaseHistory,
            'alskfjlksdjflkasjdf',
          ),
          products
            // .sort((a, b) => a.price - b.price)
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
                      // coinDes={'Validy until your coins finish'}
                      coinPrice={subscription?.description}
                    />
                  )}
                </View>
              );
            }))
        )}
      </View>
    </>
  );
};

export default memo(index);
