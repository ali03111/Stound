import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';

const FilterAddButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  style,
  textStyle,
  leftImgStyle,
  rightImgStyle,
}) => {
  return (
    // <ShadowButton>
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      style={[styles.button, {...style}]}>
      {iconLeft && (
        <Image source={iconLeft} style={[styles.image, {...leftImgStyle}]} />
      )}
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
      {iconRight && (
        <Image source={iconRight} style={[styles.image, {...rightImgStyle}]} />
      )}
    </Touchable>
    // </ShadowButton>
  );
};

export default FilterAddButton;

const styles = StyleSheet.create({
  button: {
    height: hp('5'),
    // width: wp('25'),
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
  },
  image: {
    // resizeMode: 'contain',
  },
  text: {
    color: Colors.black,
    textAlign: 'center',
  },
});
