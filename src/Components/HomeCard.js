import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Colors, FontFamily } from '../Theme/Variables';
import { Touchable } from './Touchable';
import { share } from '@/Assets/Images';
import { hp, wp } from '../Config/responsive';
import { cardOverlay, profile, bed, bathtub, location } from '../Assests';
import { TextComponent } from './TextComponent';
import { white } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
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
            <View style={styles.cardTopbar}>
              <View style={styles.cardTopLeft}>
                <BlurImage
                  styles={styles.profileImg}
                  radius={60}
                  uri={profile}
                />
                <TextComponent text={userName} styles={styles.userName} />
              </View>
              <View style={styles.cardTopRight}>
                <Image source={bathtub} />
                <TextComponent text={bath} styles={styles.bath} />
                <Image source={bed} />
                <TextComponent text={Beds} styles={styles.bed} />
              </View>
            </View>
            <View style={styles.locationMain}>
              <Image source={location} />
              <TextComponent numberOfLines={1} text={locationText} styles={styles.locationText} />
            </View>
            <View style={styles.cardFooter}>
              <TextComponent text={forRent} styles={styles.forRent} />
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <TextComponent text={price + '/'} styles={styles.price} />
                <TextComponent text={duration} styles={styles.month} />
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
    height: hp('75'),
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
    paddingHorizontal: wp('4'),
    paddingVertical: hp('3'),

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
    fontSize: hp('1.8'),
  },
  bed: {
    color: 'white',
    marginLeft: wp('1'),
    fontSize: hp('1.8'),
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.5'),
    marginLeft: wp('4'),
    width: wp('80'),
  },
  locationText: {
    color: 'white',
    marginLeft: wp('3'),
    fontSize: hp('1.9'),
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('4'),
    justifyContent: 'space-between',
  },
  forRent: {
    color: 'white',
    fontWeight: '600',
    fontSize: hp('2.9'),
  },
  price: {
    color: 'white',
    fontWeight: '500',
    fontSize: hp('2.9'),
  },
  month: {
    color: 'white',
    fontWeight: '400',
    fontSize: hp('2'),
  },
});
