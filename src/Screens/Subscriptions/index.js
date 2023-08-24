// import React, {useEffect, useState} from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
//   Image,
// } from 'react-native';

// import {
//   PurchaseError,
//   requestSubscription,
//   useIAP,
//   validateReceiptIos,
// } from 'react-native-iap';
// import BuyCoinHeader from '../../Components/BuyCoinHeader';
// import {arrowbackwhite} from '../../Assests';
// import {Colors} from '../../Theme/Variables';
// import {hp, wp} from '../../Config/responsive';
// import {TextComponent} from '../../Components/TextComponent';
// // import {ITUNES_SHARED_SECRET} from '@env';

// const errorLog = ({message, error}) => {
//   console.error('An error happened', message, error);
// };

// const isIos = Platform.OS === 'ios';

// // console.log(subscriptionSkus, 'sdklfjklsdj');
// const Subscriptions = ({navigation, route}) => {
//   const BuyCoin = ({coinTitle, coinDes, coinPrice, onPress}) => {
//     return (
//       <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
//         <View style={{flexDirection: 'row'}}>
//           <Image
//             style={styles.CoinImage}
//             source={require('../../Assests/Icons/usdCoin.png')}
//           />
//           <View style={styles.midTextContainer}>
//             <TextComponent text={coinTitle} styles={styles.coinText} />
//             <TextComponent text={coinDes} styles={styles.coinDesText} />
//           </View>
//         </View>
//         <View style={styles.lastTextContainer}>
//           <TextComponent text={'$'} styles={styles.last1Text} />
//           <TextComponent text={coinPrice} styles={styles.last2Text} />
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const items = route.params;
//   console.log('klajsdfkljalasdskfjklsdaj', items);
//   //useIAP - easy way to access react-native-iap methods to
//   //get your products, purchases, subscriptions, callback
//   //and error handlers.

//   //product id from appstoreconnect app->subscriptions
//   const subscriptionSkus = Platform.select({
//     // ios: [items?.productId],
//     ios: ['productId_10', 'productId_50', 'Ten100_1'],
//     // android: ['productid_10'],
//   });

//   const {
//     connected,
//     subscriptions, //returns subscriptions for this app.
//     getSubscriptions, //Gets available subsctiptions for this app.
//     currentPurchase, //current purchase for the tranasction
//     finishTransaction,
//     purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
//     getPurchaseHistory, //gets users purchase history
//   } = useIAP();

//   const [loading, setLoading] = useState(false);

//   const handleGetPurchaseHistory = async () => {
//     try {
//       await getPurchaseHistory();
//     } catch (error) {
//       errorLog({message: 'handleGetPurchaseHistory', error});
//     }
//   };

//   useEffect(() => {
//     handleGetPurchaseHistory();
//   }, [connected]);

//   const handleGetSubscriptions = async () => {
//     try {
//       await getSubscriptions({skus: subscriptionSkus});
//     } catch (error) {
//       errorLog({message: 'handleGetSubscriptions', error});
//     }
//   };

//   useEffect(() => {
//     handleGetSubscriptions();
//   }, [connected]);

//   //   useEffect(() => {
//   //     // ... listen if connected, purchaseHistory and subscriptions exist
//   //     if (
//   //       purchaseHistory.find(
//   //         x => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
//   //       )
//   //     ) {
//   //       navigation.navigate('Home');
//   //     }
//   //   }, [connected, purchaseHistory, subscriptions]);

//   const handleBuySubscription = async productId => {
//     try {
//       await requestSubscription({
//         sku: productId,
//       });
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       if (error instanceof PurchaseError) {
//         errorLog({message: `[${error.code}]: ${error.message}`, error});
//       } else {
//         errorLog({message: 'handleBuySubscription', error});
//       }
//     }
//   };

//   useEffect(() => {
//     const checkCurrentPurchase = async purchase => {
//       if (purchase) {
//         console.log({purchase});

//         try {
//           const receipt = purchase.transactionReceipt;
//           console.log({receipt});
//           if (receipt) {
//             if (Platform.OS === 'ios') {
//               const isTestEnvironment = __DEV__;

//               //send receipt body to apple server to validete
//               const appleReceiptResponse = await validateReceiptIos(
//                 {
//                   'receipt-data': receipt,
//                   // password: 'b3d4281737d54f98a8b4d663569a1441', //user
//                   password: 'b3d4281737d54f98a8b4d663569a1441',
//                 },
//                 isTestEnvironment,
//               );

//               //if receipt is valid
//               if (appleReceiptResponse) {
//                 console.log({appleReceiptResponse});
//                 const {status} = appleReceiptResponse;
//                 if (status) {
//                   // navigation.navigate('Home'); //Remove this commit if are u testing
//                   navigation.navigate('HeaderDetailScreen', items);
//                 }
//               }

//               return;
//             }
//           }
//         } catch (error) {
//           console.log('error', error);
//         }
//       }
//     };
//     checkCurrentPurchase(currentPurchase);
//     return () => {
//       subscriptions.remove();
//     };
//   }, [currentPurchase, finishTransaction]);

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{flex: 1}}>
//           <BuyCoinHeader
//             onPress={() => navigation.goBack()}
//             dayStyle={styles.dayStyle}
//             style={styles.topHeader}
//             headerTitle={'Buy Coins'}
//             arrowBackIcon={arrowbackwhite}
//             centerTextStyle={styles.centerHeading}
//             backText={'Back'}
//             centerImage={require('../../Assests/Images/stoundLogo.png')}
//           />
//           <View style={{marginTop: 10}}>
//             {subscriptions.map((subscription, index) => {
//               const owned = purchaseHistory.find(
//                 s => s?.productId === subscription.productId,
//               );
//               console.log('subscriptions', subscription?.productId);
//               return (
//                 <View style={styles.box} key={index}>
//                   {subscription?.introductoryPriceSubscriptionPeriodIOS && (
//                     <>
//                       <Text style={styles.specialTag}>SPECIAL OFFER</Text>
//                     </>
//                   )}
//                   <View
//                     style={{
//                       flex: 1,
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       marginTop: 10,
//                     }}>
//                     <Text
//                       style={{
//                         paddingBottom: 10,
//                         fontWeight: 'bold',
//                         fontSize: 18,
//                         textTransform: 'uppercase',
//                       }}>
//                       {subscription?.title}
//                     </Text>
//                     <Text
//                       style={{
//                         paddingBottom: 20,
//                         fontWeight: 'bold',
//                         fontSize: 18,
//                       }}>
//                       {subscription?.localizedPrice}
//                     </Text>
//                   </View>
//                   {subscription?.introductoryPriceSubscriptionPeriodIOS && (
//                     <Text>
//                       Free for 1{' '}
//                       {subscription?.introductoryPriceSubscriptionPeriodIOS}
//                     </Text>
//                   )}
//                   <Text style={{paddingBottom: 20}}>
//                     {subscription?.description}
//                   </Text>
//                   {owned && (
//                     <Text style={{textAlign: 'center', marginBottom: 10}}>
//                       You are Subscribed to this plan!
//                     </Text>
//                   )}
//                   {owned && (
//                     <TouchableOpacity
//                       style={[styles.button, {backgroundColor: '#0071bc'}]}
//                       onPress={() => {
//                         navigation.navigate('Home');
//                       }}>
//                       <Text style={styles.buttonText}>Continue to App</Text>
//                     </TouchableOpacity>
//                   )}
//                   {loading && <ActivityIndicator size="large" />}
//                   {!loading && !owned && isIos && (
//                     <TouchableOpacity
//                       style={styles.button}
//                       onPress={() => {
//                         setLoading(true);
//                         handleBuySubscription(subscription.productId);
//                       }}>
//                       <Text style={styles.buttonText}>Subscribe</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               );
//             })}
//             {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
//               <BuyCoin
//                 // onPress={() => HeaderDetailScreen(items)}

//                 coinTitle={'10 Coins'}
//                 // coinDes={'Validy till 25 - 5 - 2023'}
//                 coinPrice={'28.38'}
//               />
//             </View> */}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
//   listItem: {
//     fontSize: 16,
//     paddingLeft: 8,
//     paddingBottom: 3,
//     textAlign: 'center',
//     color: 'black',
//   },
//   box: {
//     margin: 10,
//     marginBottom: 5,
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 7,
//     shadowColor: 'rgba(0, 0, 0, 0.45)',
//     shadowOffset: {height: 16, width: 0},
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: 'mediumseagreen',
//     borderRadius: 8,
//     padding: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     textTransform: 'uppercase',
//   },
//   specialTag: {
//     color: 'white',
//     backgroundColor: 'crimson',
//     width: 125,
//     padding: 4,
//     fontWeight: 'bold',
//     fontSize: 12,
//     borderRadius: 7,
//     marginBottom: 2,
//   },
//   dayStyle: {
//     paddingTop: hp('6'),
//     color: Colors.primaryTextColor,
//     fontSize: hp('2.5'),
//   },
//   dayBarStyle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: hp('5'),
//   },
//   mainContainer: {
//     flexDirection: 'row',
//     borderRadius: 10,
//     padding: 8,
//     borderWidth: 0.5,
//     borderColor: Colors.primaryColor,
//     width: wp('90'),
//     marginTop: hp('3'),
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: 'red',
//   },
//   coinText: {
//     fontSize: hp('2'),
//     color: Colors.primaryTextColor,
//     fontWeight: '500',
//   },
//   coinDesText: {
//     fontSize: hp('1.6'),
//     color: Colors.gray,
//   },
//   lastTextContainer: {
//     width: wp('23'),
//     backgroundColor: Colors.primaryColor,
//     borderRadius: 10,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: hp('0.5'),
//   },
//   last1Text: {
//     fontSize: hp('3'),
//     color: Colors.white,
//     fontWeight: '500',
//   },
//   last2Text: {
//     fontSize: hp('2'),
//     color: Colors.white,
//     fontWeight: '500',
//   },
//   midTextContainer: {
//     marginLeft: wp('2'),
//     justifyContent: 'center',
//   },
// });

// export default Subscriptions;

import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {endConnection, initConnection,useIAP,getSubscriptions, purchaseUpdatedListener, purchaseErrorListener, requestSubscription, getPurchaseHistory} from 'react-native-iap';
import {TextComponent} from '../../Components/TextComponent';
import {Colors} from '../../Theme/Variables';
import {hp, wp} from '../../Config/responsive';

const items = Platform.select({
  android:['productid_10'],
  // ios: [
  //   'productId_10', 'productId_50', 'Ten100_1'
  // ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;
const Subscriptions = () => {

  //START ANDROID
  const{subscriptions} =useIAP();
  
  const [isPurchased, setIsPurchased] = useState(false);
  const [product, setProduct] = useState({});

  //GET PRODUCT_ID ios and android
  useEffect(() => {
    initConnection()
      .catch(e => console.log('error in connecting', e))
      .then(() => {
        getSubscriptions({skus: items})
          .catch(e => console.log('not find items', e))
          .then(res => {
            console.log(res,'askldjfaklsdjfasdaslj');
            setProduct(res)
          });
          getPurchaseHistory().catch(e=>console.log('Get purchase History ',e)).then(res=>{
           try {
            const receipt=res[res.length-1].transactionReceipt
            if(receipt){
              validFunction(receipt)
            }
           } catch (error) {
            
           }
          })
      }, );

      purchaseErrorSubscription=purchaseErrorListener(error=>{
        if(!(error['responseCode'] === "2")){
            Alert.alert('Error','There is an error with your purchase, error code '+ error.code)
        }
      });
      purchaseUpdateSubscription=purchaseUpdatedListener(purchase=>setIsPurchased(true));
      return ()=> {
        try {
            purchaseUpdateSubscription.remove();
        } catch (error) {
          
        }
        try {
            purchaseErrorSubscription.remove();
        } catch (error) {
          
        }
        try {
            endConnection();
        } catch (error) {
          
        }
      }
  },[]);

  //END ANDROID

  // BUYCOMPONENT
  const BuyCoin = ({coinTitle, coinDes, coinPrice, onPress,index}) => {
    return (
      <TouchableOpacity
      key={index}
       onPress={onPress} style={styles.mainContainer}>
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
  }


  if(isPurchased){
    return (
      //YOU CAN NAVIGATE OTHER SCREEN BUT I AM DISPLAY SOME VIEW 
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <Text>Welcomema Pr</Text>
      </View>
    )
  }

  return (
    
    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
    {console.log("askfjalskdjafklajsdfkl",product)}
      {product.length > 0 ? (
      product.sort((a, b) => a.price - b.price).map((item,index)=>(
          <BuyCoin
          index={index}
          coinTitle={item.title}
          coinPrice={item.price}
          onPress={()=>
          {
            console.log(item['productId'])
            requestSubscription(item['productId'])}}

       />
       )
       )
      ) : (
        <Text>Fetching here....</Text>
      )}
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 8,
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    width: wp('90'),
    marginTop: hp('3'),
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  coinText: {
    fontSize: hp('2'),
    color: Colors.primaryTextColor,
    fontWeight: '500',
  },
  coinDesText: {
    fontSize: hp('1.6'),
    color: Colors.gray,
  },
  lastTextContainer: {
    width: wp('23'),
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('0.5'),
  },
});
