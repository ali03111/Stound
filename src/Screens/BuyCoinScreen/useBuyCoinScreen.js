// import {useCallback, useRef} from 'react';
// import {
//     PurchaseError,
//     clearTransactionIOS,
//     flushFailedPurchasesCachedAsPendingAndroid,
//     purchaseErrorListener,
//     purchaseUpdatedListener,
//     requestPurchase,
//     requestSubscription,
//     useIAP,
//     validateReceiptIos,
//   } from 'react-native-iap';

// const useBuyCoinScreen = () => {
//     const {
//         connected,
//         subscriptions, //returns subscriptions for this app.
//         getSubscriptions, //Gets available subsctiptions for this app.
//         currentPurchase, //current purchase for the tranasction
//         purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
//         getPurchaseHistory, //gets users purchase history
//         finishTransaction
//       } = useIAP();
//   const purchaseUpdateSubscription = useRef([]);
//   const purchaseErrorSubscription = useRef([]);

//   const init = useCallback(async () => {
//     console.log('call iap init');

//     await RNIap.initConnection();

//     await RNIap.flushFailedPurchasesCachedAsPendingAndroid();

//     purchaseUpdateSubscription.current.push(
//       RNIap.purchaseUpdatedListener(async purchase => {
//         console.log( 'purchaseUpdatedLaaaistener', purchase);

//         try {
//         //   await finalizePurchase(purchase);
//         } catch (err) {
//         //   handleFailedPurchase();
//         }
//       }),
//     );

//     // use array to be sure to not accidentally overwrite subscriptions and lose access to them.
//     // being an array I can always iterate and call `remove` on them
//     purchaseErrorSubscription.current.push(
//       RNIap.purchaseErrorListener(error => {
//         handleFailedPurchase(error);
//       }),
//     );

//     // updateProducts();
//     return clear;
//   }, []);

//   const clear = useCallback(() => {
//     console.taggedLog(logTag, 'clearing all');
//     clearPurchaseEventListeners();
//   }, [clearPurchaseEventListeners]);

//   const clearPurchaseEventListeners = useCallback(() => {
//     console.taggedLog(
//       logTag,
//       'clearing purchase event listener',
//       purchaseUpdateSubscription.current.length,
//       purchaseErrorSubscription.current.length,
//     );
//     purchaseUpdateSubscription.current.forEach(sub => sub.remove());
//     purchaseErrorSubscription.current.forEach(sub => sub.remove());
//     purchaseUpdateSubscription.current = [];
//     purchaseErrorSubscription.current = [];
//   }, []);

//   return {init, clear};
// };

// export default useBuyCoinScreen;
