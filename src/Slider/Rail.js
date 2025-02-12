import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {hp} from '../Config/responsive';

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: hp('1'),
    borderRadius: 5,
    backgroundColor: 'rgba(11, 180, 255, 1)',
  },
});
