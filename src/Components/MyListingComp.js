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
import {bathtub, bed, locationIcon, scaleIcon, square_foot} from '../Assets';
import {Touchable} from './Touchable';
import {imageUrl} from '../Utils/Urls';

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
  squareFeet,
  onPressInquires,
  onPressEdit,
  image,
  mainViewStyles,
  onPressView,
  onPressDelete,
}) => {
  return (
    <>
      <ImageBackground
        style={{
          borderRadius: 10,
          width: wp('93'),
          overflow: 'hidden',
          ...mainViewStyles,
          // opacity: 0.5,
        }}
        source={{uri: imageUrl(image)}}
        blurRadius={1}>
        <View
          style={{
            backgroundColor: Colors.placeholderText,
            paddingVertical: hp('3'),
            paddingHorizontal: wp('3'),
          }}>
          <View>
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
                marginTop: hp('2'),
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
            {onPressView && (
              <View style={styles.inquires}>
                <DetailButton title={'View'} onPress={onPressView} />
              </View>
            )}
            <View style={styles.cardFooter}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.cardTopRight}>
                  <Image source={bathtub} style={styles.icon} />
                  <TextComponent
                    text={bathrooms + ' Bath'}
                    styles={styles.bath}
                  />

                  <Image source={bed} style={styles.icon} />
                  <TextComponent text={rooms + ' Bed'} styles={styles.bath} />

                  <Image
                    source={square_foot}
                    style={{
                      width: wp('2.6'),
                      tintColor: Colors.white,
                      resizeMode: 'contain',
                      height: hp('1.3'),
                      marginLeft: wp('2'),
                      marginRight: wp('1.0'),
                    }}
                  />
                  <TextComponent
                    text={squareFeet + ' Sqft'}
                    styles={styles.bath}
                  />
                </View>
              </View>
            </View>
          </View>
          {onPressInquires && (
            <View style={styles.delete}>
              <DetailButton title={'Inquiries'} onPress={onPressInquires} />
            </View>
          )}
          {onPressDelete && (
            <View style={styles.inquires}>
              <DetailButton title={'Delete'} onPress={onPressDelete} />
            </View>
          )}
          {onPressEdit && (
            <View style={styles.edit}>
              <DetailButton title={'Edit'} onPress={onPressEdit} />
            </View>
          )}
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
  delete: {
    alignSelf: 'flex-end',
    bottom: hp(isIOS ? '13.5' : '13'),
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
    fontFamily: FontFamily.regular,
    fontSize: FontSize.scale12,
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
    width: wp('55'),
  },
  loc: {
    width: wp('4.5'),
    tintColor: Colors.white,
    marginRight: wp('1'),
    // aspectRatio: 1,
    fontFamily: 'Nunito_Medium',
    alignSelf: 'flex-start',
  },
  icon: {
    width: wp('4'),
    tintColor: Colors.white,
    resizeMode: 'contain',
    height: hp('2'),
    marginLeft: wp('1.5'),
    marginRight: wp('1.0'),
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2'),
  },
});
