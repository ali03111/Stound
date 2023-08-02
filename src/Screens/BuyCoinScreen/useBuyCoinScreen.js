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
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import API from '../../Utils/helperFunc';
import {iosAppUrl} from '../../Utils/Urls';
import {errorMessage} from '../../Config/NotificationMessage';
const useBuyCoinScreen = ({navigate, goBack}, {params}) => {
  console.log({params});
  const {dispatch} = useReduxStore();
  const {items} = params;
  const errorLog = ({message, error}) => {
    console.error('An error happened', message, error);
  };

  const isIos = Platform.OS === 'ios';
  const HeaderDetailScreen = item => navigate('HeaderDetailScreen', item);

  //product id from appstoreconnect app->subscriptions
  const subscriptionSkus = Platform.select({
    // ios: [items?.productId],
    ios: ['productId_10', 'productId_50', 'productId_300'],
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
    dispatch(loadingTrue());

    try {
      await requestSubscription({
        sku: productId,
      });
      setLoading(false);
      dispatch(loadingFalse());
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        dispatch(loadingFalse());

        errorLog({message: `[${error.code}]: ${error.message}`, error});
      } else {
        dispatch(loadingFalse());

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
                //Post The Data of backend
                const {ok, data} = await API.post(iosAppUrl, {
                  token: receipt,
                });

                if (ok) {
                  const {status} = appleReceiptResponse;
                  if (status) {
                    // navigation.navigate('Home'); //Remove this commit if are u testing
                    navigate('HeaderDetailScreen', items);
                  }
                } else {
                  errorMessage(e.message);
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

  return {
    ChatData,
    HeaderDetailScreen,
    handleBuySubscription,
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory,
    loading,
    isIos,
    setLoading,
  };
};
export default useBuyCoinScreen;
