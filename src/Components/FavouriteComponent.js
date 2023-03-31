import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {share} from '@/Assets/Images';
import {hp, wp} from '../Config/responsive';
import {overlay, profile, bed, bathtub, location, scaleIcon} from '../Assests';
import {TextComponent} from './TextComponent';
import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import DetailButton from './detailButton';
// import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const FavouriteComp = ({
  backgroundImage,
  title,
  price,
  beds,
  baths,
  size,
  locationText,
  duration,
}) => {
  return (
    // <ShadowButton>
    <View style={styles.HomeCardMain}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <ImageBackground
          source={overlay}
          resizeMode="cover"
          style={styles.overlay}>
          <View style={styles.cardMain}>
            <View style={styles.cardTopbar}>
              <View style={styles.cardTopLeft}>
                <Text style={styles.userName}>{title}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={styles.price}>{price}/</Text>
                <Text style={styles.month}>{duration}</Text>
              </View>
            </View>
            <View style={styles.locationMain}>
              <Image source={location} />
              <Text style={styles.locationText}>{locationText}</Text>
            </View>
            <View style={styles.cardFooter}>
              {/* <Text style={styles.forRent}>{forRent}</Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // alignItems: 'baseline',
                  // justifyContent: 'space-between',
                }}>
                <View style={styles.cardTopRight}>
                  <Image source={bathtub} />
                  <Text style={styles.bath}>{baths}</Text>
                  <Image source={bed} />
                  <Text style={styles.bed}>{beds}</Text>
                  <Image source={scaleIcon} />
                  <Text style={styles.bed}>{size}</Text>
                </View>
                <View style={styles.detail}>
                  <DetailButton title={'Details'} />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
    // </ShadowButton>
  );
};

export default FavouriteComp;

const styles = StyleSheet.create({
  HomeCardMain: {
    width: wp('100'),
    height: hp('40'),
    paddingHorizontal: wp('3'),
    // paddingVertical: hp('3'),
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: hp('1.8'),
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
    paddingHorizontal: wp('2.3'),
    paddingVertical: hp('1.3'),
  },
  cardTopbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    width: wp('24'),
  },
  cardTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('57'),
  },
  cardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('65'),
  },

  userName: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: '500',
  },
  bath: {
    color: 'white',
    marginLeft: wp('1'),
    marginRight: wp('1.5'),
  },
  bed: {
    color: 'white',
    marginLeft: wp('1'),
    marginRight: wp('1.5'),
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
  },
  locationText: {
    color: 'white',
    marginLeft: wp('3'),
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.8'),
    justifyContent: 'space-between',
  },
  forRent: {
    color: 'white',
    fontWeight: '600',
    fontSize: 22,
  },
  price: {
    color: 'white',
    fontWeight: '500',
    fontSize: 22,
  },
  month: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
});
