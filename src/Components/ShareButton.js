import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {share} from '@/Assets/Images';
import {hp, wp} from '../Config/responsive';

const ShareButton = ({title, onPress, image, style, textStyle}) => {
  return (
    // <ShadowButton>
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      style={[
        styles.button,
        {justifyContent: image ? 'center' : 'space-between', ...style},
      ]}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
    </Touchable>
    // </ShadowButton>
  );
};

export default ShareButton;

const styles = StyleSheet.create({
  button: {
    height: hp('6.5'),
    width: '100%',
    borderRadius: 10,
    // marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: '22.5%',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  image: {
    width: 20,
    height: 20,
    // marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    fontSize: hp('1.5'),
    color: Colors.white,
    textAlign: 'center',
    // marginLeft: wp('3'),
    // fontFamily: FontFamily.regular,
  },
});
