import {Dimensions, Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  favMain: {
    flex: 1,
  },
  topHeader: {
    paddingTop: Platform.OS == 'ios' ? hp('100') : hp('1.5'),
  },
});
