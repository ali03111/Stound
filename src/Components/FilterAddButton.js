import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';
import {TextComponent} from './TextComponent';

const FilterAddButton = ({
  title,
  onPress,
  image,
  style,
  textStyle,
  imgStyle,
  disabledValue,
  tintColor,
  required,
}) => {
  return (
    // <ShadowButton>
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      disabled={disabledValue}
      style={[
        styles.button,
        {justifyContent: image ? 'center' : 'space-between', ...style},
      ]}>
      {image && (
        <Image
          tintColor={tintColor}
          source={required ? {uri: image} : image}
          style={[styles.image, {...imgStyle}]}
        />
      )}
      <TextComponent styles={{...styles.text, ...textStyle}} text={title} />
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
    width: 20,
    height: 20,
    // marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    // fontSize: heightPercentageToDP('2'),
    color: Colors.black,
    textAlign: 'center',
    marginLeft: wp('2'),
    // fontFamily: FontFamily.regular,
  },
});
