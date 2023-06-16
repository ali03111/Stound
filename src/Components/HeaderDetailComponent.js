import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextComponent} from './TextComponent';
import {Touchable} from './Touchable';

import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import {goBack} from '../Utils';
import BlurImage from './BlurImage';

const BuyCoinHeader = ({
  headerTitle,
  style,
  saveReset,
  icon,
  arrowBackIcon,
  backText,
  backTextStyle,
  saveResetStyle,
  centerTextStyle,
  centerImage,
  navigation,
  onPress,
  profileName,
  onPressMessage,
  onPressCall,
  onPressEMail,
}) => {
  const SocialBox = ({image, imageText, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.socialbox}>
        <Image
          source={image}
          style={{
            tintColor: Colors.primaryColor,
            width: wp('5'),
            resizeMode: 'contain',
            height: hp('5'),
          }}
        />
        <TextComponent text={imageText} styles={styles.imageTextStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[styles.TopHeader, {...style}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.HeaderLeft}>
            <Touchable onPress={onPress} style={styles.backMain}>
              <Image
                source={arrowBackIcon}
                style={{
                  resizeMode: 'contain',
                  style: styles.arrowback,
                }}
              />
              {/* <CircleImageComp
                            styles={styles.profileImg}
                            image={notificationProfile2}
                        /> */}
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
      </View>

      <View style={styles.imageContainer}>
        {/* <Image
                    resizeMode='contain'
                    style={styles.centerImageStyle}
                    source={centerImage}
                /> */}
        <BlurImage
          styles={styles.profileImg1}
          radius={10}
          uri={
            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
        />
      </View>
      <View style={styles.nameContainer}>
        <TextComponent text={profileName} styles={styles.HeaderTitle} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: wp('95'),
            marginTop: hp('3'),
          }}>
          <SocialBox
            onPress={onPressMessage}
            image={require('../Assests/Icons/chat.png')}
            imageText={'Message'}
          />
          <SocialBox
            onPress={onPressCall}
            image={require('../Assests/Icons/phone.png')}
            imageText={'Call'}
          />
          <SocialBox
            onPress={onPressEMail}
            image={require('../Assests/Icons/send.png')}
            imageText={'Email'}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  imageTextStyle: {
    fontSize: hp('1.5'),
  },
  socialbox: {
    borderRadius: 10,
    padding: 8,
    borderWidth: 0.2,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    width: wp('25'),
    backgroundColor: 'rgba(11, 180, 255, 0.03)',
  },
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
  nameContainer: {
    alignItems: 'center',
    marginTop: hp('8'),
    marginBottom: hp('2'),
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
    width: wp('100'),
    paddingTop: Platform.OS == 'ios' ? hp('6') : hp('1.5'),
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    paddingBottom: hp('8'),
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
    letterSpacing: 1,
    fontSize: hp('2.3'),
    color: Colors.primaryTextColor,
    fontWeight: '500',
    marginTop: hp('0.2'),
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
  profileImg1: {
    height: hp('12'),
    borderRadius: 5,
    // marginRight: wp('3'),
    aspectRatio: 1,
  },
  dayBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerImageStyle: {
    resizeMode: 'contain',
    borderRadius: 10,
    width: wp('25'),
    height: hp('15'),
  },
  imageContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: Platform.OS == 'ios' ? 100 : 60,
    alignItems: 'center',
  },
});
export default BuyCoinHeader;
