import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {share} from '@/Assets/Images';
import {hp, wp} from '../Config/responsive';
import {cardOverlay, profile, bed, bathtub, location} from '../Assests';
import {TextComponent} from './TextComponent';
import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import BlurImage from './BlurImage';
import BlurBackground from './BlurBackground';

const HomeCard = ({
  onPress,
  image,
  style,
  textStyle,
  profile,
  userName,
  bath,
  Beds,
  locationText,
  forRent,
  price,
  duration,
}) => {
  return (
    // <ShadowButton>
    <View style={styles.HomeCardMain}>
      <BlurBackground
        uri={image}
        mainView={{
          height: hp('75'),
        }}
        blurImageStyle={{
          height: hp('75'),
        }}
        resizeMode="cover"
        styles={styles.image}>
        <ImageBackground
          source={cardOverlay}
          resizeMode="cover"
          borderRadius={10}
          style={styles.overlay}>
          <View style={styles.cardMain}>
            <View style={styles.bottomNav}>
              <View style={styles.locationInner}>
                <Image source={location} style={styles.locationSt} />
                <TextComponent
                  numberOfLines={2}
                  text={locationText}
                  styles={styles.locationText}
                />
              </View>
              <View style={styles.locationMain}>
                <View style={styles.cardTopbar}>
                  <View style={styles.cardTopRight}>
                    <Image source={bathtub} style={styles.bathImg} />
                    <TextComponent text={bath} styles={styles.bath} />
                    <Image source={bed} style={styles.bathImg} />
                    <TextComponent text={Beds} styles={styles.bed} />
                  </View>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <TextComponent text={forRent} styles={styles.forRent} />
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                  <TextComponent text={price} styles={styles.price} />
                  <TextComponent text={'/'} styles={styles.pillar} />

                  <TextComponent text={duration} styles={styles.month} />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </BlurBackground>
    </View>
    // </ShadowButton>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  HomeCardMain: {
    height: hp('73'),
    paddingHorizontal: wp('3'),
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    height: hp('100'),
    width: wp('94'),
    // flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    // bottom: 0,
    // backgroundColor: 'yellow',
  },
  cardMain: {
    justifyContent: 'flex-end',
    flex: 1,
    padding: 15,
  },
  cardTopbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('37'),
  },
  cardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: wp('15'),
    height: hp('6'),
    borderRadius: 60,
    aspectRatio: 1,
  },
  locationSt: {
    resizeMode: 'contain',
    width: wp('7'),
    height: hp('4.0'),
    tintColor: 'white',
  },
  userName: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    width: wp('22'),
    marginLeft: wp('2'),
  },
  bath: {
    color: 'white',
    marginLeft: wp('1'),
    marginRight: wp('1.5'),
    fontSize: hp('1.4'),
  },
  bed: {
    color: 'white',
    marginLeft: wp('1'),
    fontSize: hp('1.4'),
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationInner: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  locationText: {
    color: 'white',
    marginLeft: wp('1.5 '),
    fontSize: hp('2'),
    fontWeight: 'bold',
    width: wp('80'),
    marginBottom: hp('1.5'),
    // backgroundColor: 'red',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1.0'),
  },
  forRent: {
    color: 'white',
    fontSize: hp('2.9'),
    marginLeft: wp('1'),
  },
  price: {
    color: 'white',
    fontSize: hp('2.8'),
    textAlignVertical: 'bottom',
  },
  month: {
    color: 'white',
    fontSize: hp('2'),
  },
  pillar: {
    color: 'white',
    fontSize: hp('3.5'),
  },
  bottomNav: {
    justifyContent: 'space-between',
  },
  bathImg: {
    width: wp('5'),
  },
});
