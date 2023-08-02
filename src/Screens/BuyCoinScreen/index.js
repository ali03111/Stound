import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from '../../Components/Header';
import {arrowbackwhite} from '../../Assests';
import BuyCoinHeader from '../../Components/BuyCoinHeader';
import {TextComponent} from '../../Components/TextComponent';
import {wp} from '../../Config/responsive';
import useBuyCoinScreen from './useBuyCoinScreen';
const index = ({navigation, route}) => {
  // const {items} = route.params;

  const {
    HeaderDetailScreen,
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
    handleBuySubscription,
  } = useBuyCoinScreen(navigation, route);

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
        {subscriptions.map((subscription, index) => {
          const owned = purchaseHistory.find(
            s => s?.productId === subscription.productId,
          );
          return (
            <View style={styles.midContainer}>
              {!loading && !owned && isIos && (
                <BuyCoin
                  // onPress={() =>
                  //   navigation.navigate('Subscriptions', {
                  //     ...items,
                  //     productId: 'productId_10',
                  //   })
                  // }
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
          <BuyCoin
            onPress={() =>
              navigation.navigate('Subscriptions', {
                ...items,
                productId: 'productId_300',
              })
            }
            // onPress={() => HeaderDetailScreen(items)}
            coinTitle={'10 Coins'}
            // coinDes={'Validy till 25 - 5 - 2023'}
            coinPrice={'28.38'}
          /> */}
      </View>
    </>
  );
};

export default index;
