import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextComponent} from './TextComponent';
import {
  Colors,
  FontFamily,
  FontSize,
  isIOS,
  scaleFont,
} from '../Theme/Variables';
import {hp, wp} from '../Config/responsive';
import {bathtub, bed, locationIcon, scaleIcon} from '../Assets';
import {Touchable} from './Touchable';

const DetailButton = ({title, onPress, hide, style, textStyle}) => {
  return (
    // <ShadowButton>
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      style={[styles.button, {...style}]}>
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
    </Touchable>
    // </ShadowButton>
  );
};

const MyListingComp = ({
  price,
  location,
  title,
  bathrooms,
  rooms,
  onPressInquires,
  onPressEdit,
}) => {
  return (
    <>
      <ImageBackground
        style={{
          borderRadius: 10,
          width: wp('93'),
          overflow: 'hidden',
          paddingVertical: hp('1'),
          paddingHorizontal: wp('1'),
        }}
        source={require('../Assets/Images/property1.png')}
        //   blurRadius={1} for blur
      >
        <View style={{padding: 10}}>
          <Text style={styles.price}>
            ${price}/
            <TextComponent
              text={`month`}
              styles={{
                fontFamily: FontFamily.semiBold,
                fontSize: scaleFont(12),
                color: Colors.white,
              }}
            />
          </Text>
          <TextComponent text={`${title}`} styles={styles.apartitle} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('3'),
              width: wp('60'),
            }}>
            <Image
              resizeMode="contain"
              style={styles.loc}
              source={locationIcon}
            />
            {/* {location && ( */}
            <TextComponent
              numberOfLines={2}
              // text={locationName}
              text={location}
              styles={styles.userlocation}
            />
            {/* )} */}
          </View>
          <View style={styles.cardFooter}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.cardTopRight}>
                <Image source={bathtub} />
                <TextComponent
                  text={bathrooms + ' Bath'}
                  styles={styles.bath}
                />

                <Image source={bed} />
                <TextComponent text={rooms + ' Bed'} styles={styles.bed} />

                {/* <Image source={scaleIcon} />
                <TextComponent text={'2' + ' sqft'} styles={styles.bed} /> */}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.inquires}>
          <DetailButton title={'Inquiries'} onPress={onPressInquires} />
        </View>
        <View style={styles.edit}>
          <DetailButton title={'Edit'} onPress={onPressEdit} />
        </View>
      </ImageBackground>
    </>
  );
};

export default MyListingComp;

const styles = StyleSheet.create({
  button: {
    width: wp('25'),
    borderRadius: 5,
    paddingVertical: hp('1'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: Colors.white,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  text: {
    fontSize: hp('2'),
    color: Colors.white,
    textAlign: 'center',
    // fontFamily: FontFamily.regular,
  },
  price: {
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(20),
    color: Colors.white,
  },
  inquires: {
    alignSelf: 'flex-end',
    bottom: hp(isIOS ? '7' : '7.5'),
    right: wp('1'),
    overflow: 'hidden',
    position: 'absolute',
  },
  edit: {
    bottom: hp('2'),
    right: wp('1'),
    backgroundColor: 'rgba(0, 0, 0, 0.65)',

    position: 'absolute',
  },
  bath: {
    color: 'white',
    marginLeft: wp('1'),
    marginRight: wp('1.5'),
    fontSize: FontSize.scale12,
  },
  bed: {
    color: 'white',
    marginLeft: wp('1'),
    fontSize: FontSize.scale12,
    marginRight: wp('1.5'),
  },
  cardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('65'),
  },
  apartitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(20),
    color: Colors.white,
    marginTop: hp('2'),
  },
  userlocation: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(15),
    color: Colors.white,
  },
  loc: {
    width: wp('4.5'),
    tintColor: Colors.white,
    marginRight: wp('1'),
    aspectRatio: 1,
    fontFamily: 'Nunito_Medium',
    alignSelf: 'flex-start',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2'),
  },
});
