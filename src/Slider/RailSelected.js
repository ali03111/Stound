import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {hp} from '../Config/responsive';

export const RailSelected = memo(() => {
  return <View style={styles.root} />;
});

const styles = StyleSheet.create({
  root: {
    height: hp('1'),
    backgroundColor: 'white',
    borderRadius: 2,
    borderColor: 'rgba(11, 180, 255, 0.5)',
    borderWidth: 1,
  },
});
