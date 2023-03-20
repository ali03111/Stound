import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp} from '../Config/responsive';

const ThemeButtonComp = ({title, onPress, hide, style, textStyle}) => {
  return (
    // <ShadowButton>
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      style={[
        styles.button,
        {justifyContent: hide ? 'center' : 'space-between', ...style},
      ]}>
      {/* {!hide && <Image source={share} style={styles.image} />} */}
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
    </Touchable>
    // </ShadowButton>
  );
};

export default ThemeButtonComp;

const styles = StyleSheet.create({
  button: {
    height: hp('6.5'),
    width: '100%',
    borderRadius: 30,
    // marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: '22.5%',
    justifyContent: 'center',
    backgroundColor: Colors.red,
  },
  image: {
    width: 20,
    height: 20,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    fontSize: hp('2.5'),
    color: Colors.white,
    textAlign: 'center',
    // fontFamily: FontFamily.regular,
  },
});
