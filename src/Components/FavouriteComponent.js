import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {Colors, FontFamily, FontSize} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {share} from '@/Assets/Images';
import {hp, wp} from '../Config/responsive';
import {
  overlay,
  profile,
  bed,
  bathtub,
  location,
  scaleIcon,
  fav,
} from '../Assests';
import {TextComponent} from './TextComponent';
import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import DetailButton from './detailButton';
import BlurBackground from './BlurBackground';
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
  onPress,
  onFav,
}) => {
  return (
    // <ShadowButton>
    <View style={styles.HomeCardMain}>
      <BlurBackground
        uri={backgroundImage}
        resizeMode="cover"
        styles={styles.image}>
        <ImageBackground
          source={overlay}
          resizeMode="cover"
          style={styles.overlay}>
          <View style={styles.favMain}>
            <Touchable onPress={onFav} style={styles.fav}>
              <Image source={fav} />
            </Touchable>
          </View>
          <View style={styles.cardMain}>
            <View style={styles.cardTopbar}>
              <TextComponent text={title} styles={styles.userName} />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  text={price?.toLocaleString()}
                  styles={styles.price}
                />
                <TextComponent text={duration} styles={styles.month} />
              </View>
            </View>
            <View style={styles.locationMain}>
              <Image source={location} style={styles.locationSt} />
              <TextComponent
                numberOfLines={3}
                text={locationText}
                styles={styles.locationText}
              />
            </View>
            <View style={styles.cardFooter}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.cardTopRight}>
                  <Image source={bathtub} />
                  <TextComponent text={baths} styles={styles.bath} />

                  <Image source={bed} />
                  <TextComponent text={beds} styles={styles.bed} />

                  {/* <Image source={scaleIcon} />
                  <TextComponent text={size} styles={styles.bed} /> */}
                </View>
                <View style={styles.detail}>
                  <DetailButton title={'Details'} onPress={onPress} />
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

export default FavouriteComp;

const styles = StyleSheet.create({
  favMain: {
    alignItems: 'flex-end',
    paddingHorizontal: wp('2.3'),
    paddingVertical: hp('1.3'),
  },
  fav: {
    backgroundColor: 'white',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('2'),
    borderRadius: 10,
    width: wp('13'),
    alignItems: 'center',
  },
  HomeCardMain: {
    width: wp('100'),
    height: hp('40'),
    paddingHorizontal: wp('3'),
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: hp('1.5'),
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
    height: hp('40'),
    width: wp('95'),
  },
  cardMain: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingHorizontal: wp('2.3'),
    paddingVertical: hp('1.0'),
  },
  cardTopbar: {
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: FontSize.scale20,
    fontWeight: '500',
  },
  bath: {
    color: 'white',
    marginLeft: wp('1'),
    marginRight: wp('1.5'),
    fontSize: hp('1.7'),
  },
  bed: {
    color: 'white',
    marginLeft: wp('1'),
    fontSize: hp('1.7'),
    marginRight: wp('1.5'),
  },
  locationMain: {
    flexDirection: 'row',
  },
  locationText: {
    color: 'white',
    marginLeft: wp('3'),
    fontSize: FontSize.scale16,
    width: wp('80'),
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forRent: {
    color: 'white',
    fontWeight: '600',
    fontSize: FontSize.scale20,
  },
  price: {
    color: 'white',
    fontWeight: '500',
    fontSize: FontSize.scale20,
    marginRight: wp('2'),
    top: hp('1.3'),
  },
  month: {
    color: 'white',
    fontWeight: '400',
    fontSize: FontSize.scale16,
  },
  locationSt: {
    aspectRatio: 1,
    width: wp('5'),
  },
});
