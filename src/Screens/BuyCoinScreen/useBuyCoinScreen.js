// import useNotificationScreen from '.';
import {Platform} from 'react-native';
import {ChatData} from '../../Utils/localDB';
import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from 'react-native-iap';
import {useEffect, useState} from 'react';
const useBuyCoinScreen = ({navigate, goBack}) => {
  const HeaderDetailScreen = item => navigate('HeaderDetailScreen', item);

  //product id from appstoreconnect app->subscriptions
  const subscriptionSkus = Platform.select({
    // ios: [items?.productId],
    ios: ['productId_10'],
  });

  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();
  const [loading, setLoading] = useState(false);

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
      await getSubscriptions({skus: subscriptionSkus});
    } catch (error) {
      errorLog({message: 'handleGetSubscriptions', error});
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);

  //   useEffect(() => {
  //     // ... listen if connected, purchaseHistory and subscriptions exist
  //     if (
  //       purchaseHistory.find(
  //         x => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
  //       )
  //     ) {
  //       navigation.navigate('Home');
  //     }
  //   }, [connected, purchaseHistory, subscriptions]);

  const handleBuySubscription = async productId => {
    try {
      await requestSubscription({
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

  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      if (purchase) {
        console.log({purchase});

        try {
          const receipt = purchase.transactionReceipt;
          console.log({receipt});
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
                console.log({appleReceiptResponse});
                const {status} = appleReceiptResponse;
                if (status) {
                  // navigation.navigate('Home'); //Remove this commit if are u testing
                  navigation.navigate('HeaderDetailScreen', items);
                }
              }

              return;
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  return {ChatData, HeaderDetailScreen};
};
export default useBuyCoinScreen;
