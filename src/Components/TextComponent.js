import React from 'react';
import {Text} from 'react-native';
import {hp} from '../Config/responsive';
import {Colors, FontFamily, scaleFont} from '../Theme/Variables';

export const TextComponent = ({
  text,
  adjustsFontSizeToFit,
  styles,
  onPress,
  numberOfLines,
}) => {
  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit ?? true}
      numberOfLines={numberOfLines ?? 1}
      onPress={onPress}
      style={{
        color: Colors.black,
        fontSize: scaleFont(16),

        fontFamily: FontFamily.regular,

        ...styles,
      }}>
      {text}
    </Text>
  );
};
