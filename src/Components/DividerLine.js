import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hp, wp} from '../Config/responsive';
const DividerLine = ({style}) => {
  return (
    <View
      style={[
        {
          borderBottomColor: '#A1ACBB26',
          borderBottomWidth: 5,
          marginBottom: hp('1.5'),
        },
        style, // Ensuring custom styles override defaults
      ]}
    />
  );
};

export default DividerLine;
