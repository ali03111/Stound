import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {memo, useState, useEffect, useCallback, useRef} from 'react';
import {styles} from './styles';
import Header from '../../Components/Header';
import {arrowbackwhite} from '../../Assests';
import BuyCoinHeader from '../../Components/BuyCoinHeader';
import {TextComponent} from '../../Components/TextComponent';
import {wp} from '../../Config/responsive';
import useBuyCoinScreen from './useBuyCoinScreen';

import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from 'react-native-iap';
import useReduxStore from '../../Hooks/UseReduxStore';
import {baseURL, iosAppUrl} from '../../Utils/Urls';
import {types} from '../../Redux/types';
let i = 0;
const dateObject = new Date();
let date = dateObject.toUTCString();
const subscriptionSkus = Platform.select({
  // ios: [items?.productId],
  ios: ['productId_10', 'productId_50', 'Ten100_1'],
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
  const {items} = route.params;

  const [loading, setLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [dummy, setDummy] = useState(0);

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

  const handleGetSubscriptions = async () => {
    try {
      setIsPurchasing(true);
      await getSubscriptions({skus: subscriptionSkus});
    } catch (error) {
      setIsPurchasing(false);
      errorLog({message: 'handleGetSubscriptions', error});
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);

  const handleBuySubscription = async productId => {
    try {
      const reqSubs = await requestSubscription({
        sku: productId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({message: `[${error.code}]: ${error.message}`, error});
      } else {
        errorLog({message: 'handleBuySubscription', error});
      }
    }
  };

  const checkCurrentPurchase = useCallback(
    async purchase => {
      let j = 0;

      if (isPurchasing) {
        // if (purchase && isPurchasing) {
        console.log({purchase});

        try {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            if (Platform.OS === 'ios') {
              const isTestEnvironment = __DEV__;

              //send receipt body to apple server to validete
              const appleReceiptResponse = await validateReceiptIos(
                {
                  'receipt-data': receipt,
                  // password: 'b3d4281737d54f98a8b4d663569a1441', //user
                  password: 'b3d4281737d54f98a8b4d663569a1441',
                },
                isTestEnvironment,
              );

              //if receipt is valid
              if (appleReceiptResponse) {
                const {status} = appleReceiptResponse;
                j = 1;
                setTimeout(() => {
                  if (status && j == 1) {
                    hitAPIToSever(receipt);
                  }
                }, 0);
              }

              return;
            }
          }
        } catch (error) {
          setIsPurchasing(false);

          console.log('error', error);
        }
      }
    },
    [currentPurchase],
  );
  useEffect(() => {
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase]);

  // console.log(receiptRef.current,'euuejdykjdy')
  const hitAPIToSever = async receipt => {
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
    console.log({aklsdfjaklsdfjlksdj: receipt});
    if (response.status == 200) {
      const data = await response.json();
      console.log(data, 'asdasdasdas123123dasdasasdsadasdasd');
      dispatch({type: types.UpdateProfile, payload: data.data});

      navigation.navigate('HeaderDetailScreen', items);
      setIsPurchasing(false);
    } else {
      console.log('RESPONSE OK ERROR');
      setIsPurchasing(false);
    }
  };
  // const checkCurrentPurchase = useCallback(
  //   async purchase => {
  //     if (isPurchasing) {
  //       console.log({purchase});

  //       try {
  //         const receipt = purchase.transactionReceipt;
  //         console.log({receipt});
  //         if (receipt) {
  //           if (Platform.OS === 'ios') {
  //             const isTestEnvironment = __DEV__;

  //             //send receipt body to apple server to validate
  //             const appleReceiptResponse = await validateReceiptIos(
  //               {
  //                 'receipt-data': receipt,
  //                 password: 'b3d4281737d54f98a8b4d663569a1441',
  //               },
  //               isTestEnvironment,
  //             );

  //             if (appleReceiptResponse) {
  //               console.log({appleReceiptResponse});
  //               const {status} = appleReceiptResponse;
  //               if (status) {
  //                 console.log('alskdfjeljk', date, i);
  //                 console.log({status});
  //                 const response = await fetch(baseURL + iosAppUrl, {
  //                   method: 'POST',
  //                   headers: {
  //                     'Content-Type': 'application/json',
  //                     Authorization: `Bearer ${token}`,
  //                   },
  //                   body: JSON.stringify({
  //                     token: receipt,
  //                   }),
  //                 });
  //                 console.log({aklsdfjaklsdfjlksdj: receipt});
  //                 if (response.status == 200) {
  //                   const data = await response.json();
  //                   console.log(data, 'asdasdasdas123123dasdasasdsadasdasd');
  //                   dispatch({type: types.UpdateProfile, payload: data.data});

  //                   navigation.navigate('HeaderDetailScreen', items);
  //                   setIsPurchasing(false);
  //                 } else {
  //                   console.log('RESPONSE OK ERROR');
  //                   setIsPurchasing(false);
  //                 }
  //               }
  //             }

  //             return;
  //           }
  //         }
  //       } catch (error) {
  //         setIsPurchasing(false);
  //         console.log('error', error);
  //       }
  //     }
  //   },
  //   [isPurchasing, token, navigation, dispatch],
  // );

  // useEffect(() => {
  //   checkCurrentPurchase(currentPurchase);
  //   console.log({getPurchaseHistory});
  // }, [checkCurrentPurchase, currentPurchase]);

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
  // const renderSubscriptionCallback =
  //   (loading, isIos, handleBuySubscription) =>
  //   ({item}) => {
  //     const owned = purchaseHistory.find(s => s?.productId === item.productId);
  //     return (
  //       <View style={styles.midContainer}>
  //         {!loading && !owned && isIos && (
  //           <BuyCoin
  //             onPress={() => {
  //               setLoading(true);
  //               handleBuySubscription(item.productId);
  //             }}
  //             coinTitle={item?.title}
  //             coinPrice={item?.localizedPrice}
  //           />
  //         )}
  //       </View>
  //     );
  //   };
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
        {/* {subscriptions.map((subscription, index) => {
          
          const owned = purchaseHistory.find(
            s => s?.productId === subscription.productId,
          );
          console.log({subscription});
          return (
            <View style={styles.midContainer}>
              {!loading && !owned && isIos && (
                <BuyCoin
                  onPress={() => {
                    setLoading(true);
                    handleBuySubscription(subscription.productId);
                  }}
                  coinTitle={subscription?.title}
                  // coinDes={'Validy till 25 - 5 - 2023'}
                  coinPrice={subscription?.localizedPrice}
                />
              )}
            </View>
          );
        })} */}

        {subscriptions.map((subscription, index) => {
          return (
            <View style={styles.midContainer}>
              {!loading && isIos && (
                <BuyCoin
                  onPress={() => {
                    setLoading(true);
                    handleBuySubscription(subscription.productId);
                  }}
                  coinTitle={subscription?.title}
                  // coinDes={'Validy till 25 - 5 - 2023'}
                  coinPrice={subscription?.localizedPrice}
                />
              )}
            </View>
          );
        })}
        {/* <FlatList
          data={subscriptions}
          keyExtractor={item => item.productId}
          renderItem={renderSubscriptionCallback(
            loading,
            isIos,
            handleBuySubscription,
          )}
        /> */}

        {/* <BuyCoin onPress={() => HeaderDetailScreen(items)} coinTitle={'10 Coins'} coinDes={'Validy till 25 - 5 - 2023'} coinPrice={'28.38'} /> */}
        {/* <BuyCoin
            // onPress={() => HeaderDetailScreen(items)}
            onPress={() =>
              navigation.navigate('Subscriptions', {
                ...items,
                productId: 'productId_50',
              })
            }
            coinTitle={'10 Coins'}
            // coinDes={'Validy till 25 - 5 - 2023'}
            coinPrice={'28.38'}
          />
          */}
      </View>
    </>
  );
};

export default memo(index);
