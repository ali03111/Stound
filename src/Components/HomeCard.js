import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {share} from '@/Assets/Images';
import {hp, wp} from '../Config/responsive';
import {cardOverlay, profile, bed, bathtub, location} from '../Assests';
import {TextComponent} from './TextComponent';
import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
// import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

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
      <ImageBackground
        source={{uri: image}}
        resizeMode="cover"
        style={styles.image}>
        <ImageBackground
          source={cardOverlay}
          resizeMode="cover"
          style={styles.overlay}>
          <View style={styles.cardMain}>
            <View style={styles.cardTopbar}>
              <View style={styles.cardTopLeft}>
                <Image style={styles.profileImg} source={profile} />
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
              <TextComponent text={locationText} styles={styles.locationText} />
            </View>
            <View style={styles.cardFooter}>
              <TextComponent text={forRent} styles={styles.forRent} />
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <TextComponent text={price + '/'} styles={styles.price} />
                <TextComponent text={duration} styles={styles.month} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
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
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardMain: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingHorizontal: wp('6'),
    paddingVertical: hp('3'),
  },
  cardTopbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('43'),
  },
  cardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: wp('12'),
    height: hp('6'),
    borderRadius: 60,
    marginRight: wp('2'),
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    width: wp('25'),
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
