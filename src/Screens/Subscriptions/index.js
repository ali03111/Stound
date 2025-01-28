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
import {
  endConnection,
  initConnection,
  useIAP,
  getSubscriptions,
  purchaseUpdatedListener,
  purchaseErrorListener,
  requestSubscription,
  getPurchaseHistory,
  getProducts,
  flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';
import {TextComponent} from '../../Components/TextComponent';
import {Colors} from '../../Theme/Variables';
import {hp, wp} from '../../Config/responsive';

const items = Platform.select({
  android: ['productid_10', 'productid_30'],
  // android: {skus: ['productidsub_10']},
  // ios: ['productId_10', 'productId_50', 'Ten100_1'],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;
const Subscriptions = () => {
  //START ANDROID

  const [isPurchased, setIsPurchased] = useState(false);
  const [product1, setProduct1] = useState({});

  //GET PRODUCT_ID ios and android
  useEffect(() => {
    const initConnection = async () => {
      await initConnection()
        .catch(e => console.log('error in connecting', e))
        .then(() => flushFailedPurchasesCachedAsPendingAndroid())
        .then(() => {
          getSubscriptions({skus: items})
            .catch(e => console.log('not find items', e))
            .then(res => {
              console.log(res, 'askldjfaklsdjfasdaslj');
              setProduct1(res);
            });

          getPurchaseHistory()
            .catch(e => console.log('Get purchase History ', e))
            .then(res => {
              try {
                const receipt = res[res.length - 1].transactionReceipt;
                if (receipt) {
                  validFunction(receipt);
                }
              } catch (error) {}
            });
        });

      purchaseErrorSubscription = purchaseErrorListener(error => {
        if (!(error['responseCode'] === '2')) {
          Alert.alert(
            'Error',
            'There is an error with your purchase, error code ' + error.code,
          );
        }
      });

      purchaseErrorSubscription = purchaseErrorListener(error => {
        if (!(error['responseCode'] === '2')) {
          Alert.alert(
            'Error',
            'There is an error with your purchase, error code ' + error.code,
          );
        }
      });
      purchaseUpdateSubscription = purchaseUpdatedListener(purchase =>
        setIsPurchased(true),
      );
      return () => {
        try {
          purchaseUpdateSubscription.remove();
        } catch (error) {}
        try {
          purchaseErrorSubscription.remove();
        } catch (error) {}
        try {
          endConnection();
        } catch (error) {}
      };
    };
  }, []);

  // const {connected, getProducts, products} = useIAP();

  // useEffect(() => {
  //   if (connected) {
  //     getProducts(items);
  //     console.log('getting product....');
  //   }
  //   console.log(products, 'lkjlkjkljljljkljklj');
  // }, [connected, getProducts]);

  //END ANDROID

  // BUYCOMPONENT
  const BuyCoin = ({coinTitle, coinDes, coinPrice, onPress, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={styles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.CoinImage}
            source={require('../../Assets/Icons/coin.png')}
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

  if (isPurchased) {
    return (
      //YOU CAN NAVIGATE OTHER SCREEN BUT I AM DISPLAY SOME VIEW
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>Welcomema Pr</Text>
      </View>
    );
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      {product1?.length > 0 ? (
        product1
          .sort((a, b) => a.price - b.price)
          .map((item, index) => (
            <BuyCoin
              coinTitle={item.title}
              coinPrice={item.price}
              onPress={() => {
                q;
                console.log(item['productId']);
                requestSubscription(item['productId']);
              }}
            />
          ))
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
