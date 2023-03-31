import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';

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

export default DetailButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    // marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('4'),
    paddingVertical: hp('.8'),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  text: {
    fontSize: hp('2'),
    color: Colors.white,
    textAlign: 'center',
    // fontFamily: FontFamily.regular,
  },
});
