import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hp, wp} from '../Config/responsive';
const DividerLine = ({style}) => {
  return (
    <View
      style={[
        {
          ...style,
          borderBottomColor: '#A1ACBB26',
          borderBottomWidth: 5,
          marginBottom: hp('1.5'),
        },
      ]}
    />
  );
};

export default DividerLine;
