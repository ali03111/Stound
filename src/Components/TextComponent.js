import React from 'react';
import {Text} from 'react-native';
import {hp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';

export const TextComponent = ({text, styles, onPress, numberOfLines}) => {
  return (
    <Text
      numberOfLines={numberOfLines ?? 1}
      onPress={onPress}
      style={{color: Colors.black, fontSize: hp('2'), ...styles}}>
      {text}
    </Text>
  );
};
