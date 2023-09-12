import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {TextComponent} from '../Components/TextComponent';
import {Touchable} from '../Components/Touchable';

import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import {goBack} from '../Utils';

const BuyCoinHeader = ({
  headerTitle,
  style,
  saveReset,
  icon,
  arrowBackIcon,
  backText,
  saveResetStyle,
  backTextStyle,
  centerTextStyle,
  centerImage,
  onPress,
}) => {
  return (
    <View>
      <ImageBackground
        source={require('../Assests//Images/bugCoinbackImage.png')}
        style={[styles.TopHeader, {...style}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.HeaderLeft}>
            <Touchable onPress={onPress} style={styles.backMain}>
              <Image
                source={arrowBackIcon}
                style={{
                  resizeMode: 'contain',
                  style: styles.arrowback,
                }}
              />

              <TextComponent
                text={backText}
                styles={{...styles.backBtn, ...backTextStyle}}
              />
            </Touchable>
          </View>
          <View style={{...styles.HeaderCenter, ...centerTextStyle}}>
            <TextComponent text={headerTitle} styles={styles.HeaderTitle} />
          </View>
          <View style={styles.HeaderRight}>
            <Touchable style={styles.backMain}>
              <Image
                source={icon}
                style={{
                  resizeMode: 'contain',
                  style: styles.arrowback,
                }}
              />
              <TextComponent
                text={saveReset}
                styles={{...styles.backBtn, ...saveResetStyle}}
              />
            </Touchable>
          </View>
        </View>
        <View>
          <Image
            resizeMode="contain"
            style={styles.centerImageStyle}
            source={centerImage}
          />
        </View>
      </ImageBackground>
      {/* <View style={styles.dayBarStyle}>
                <TextComponent text={'Get your coins here!'} styles={{ ...styles.day, ...dayStyle }} />
            </View>
            <View style={styles.midContainer}>

                <BuyCoin onPress={() => } coinTitle={'10 Coins'} coinDes={'Validy till 25 - 5 - 2023'} coinPrice={'28.38'} />
                <BuyCoin coinTitle={'10 Coins'} coinDes={'Validy till 25 - 5 - 2023'} coinPrice={'28.38'} />
                <BuyCoin coinTitle={'10 Coins'} coinDes={'Validy till 25 - 5 - 2023'} coinPrice={'28.38'} />
            </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  CoinImage: {
    aspectRatio: 1,
    width: wp('14'),
  },
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 8,
    borderWidth: 0.2,
    borderColor: Colors.primaryColor,
    width: wp('90'),
    marginTop: hp('3'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  midContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  midTextContainer: {
    marginLeft: wp('2'),
    justifyContent: 'center',
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
  last1Text: {
    fontSize: hp('3'),
    color: Colors.white,
    fontWeight: '500',
  },
  last2Text: {
    fontSize: hp('2'),
    color: Colors.white,
    fontWeight: '500',
  },
  TopHeader: {
    paddingTop: hp('4'),
    paddingBottom: hp('4'),
    width: wp('100'),
    // marginTop: Platform.OS == 'ios' ? hp('5') : hp('1.5'),
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    marginTop: hp('0.2'),
  },
  backBtn: {
    marginLeft: wp('3'),
    color: Colors.white,
  },
  HeaderTitle: {
    fontSize: hp('2.3'),
    color: Colors.white,
    fontWeight: '500',
  },
  HeaderLeft: {
    width: wp('20'),
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  HeaderCenter: {
    width: wp('52'),
    alignItems: 'center',
  },
  HeaderRight: {
    width: wp('20'),
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  profileImg: {
    width: wp('9'),
    height: hp('4.5'),
    marginLeft: wp('5'),
  },
  dayBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerImageStyle: {
    marginTop: hp('4'),
    width: wp('25'),
    height: hp('10'),
  },
});
export default BuyCoinHeader;
