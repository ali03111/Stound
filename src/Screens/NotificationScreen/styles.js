import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  notification: {
    // paddingHorizontal: wp('4'),
    // paddingVertical: hp('1'),
  },
  notificationMain: {
    // paddingHorizontal: wp('4'),
    paddingTop: hp('1'),
  },
  topHeader: {
    paddingBottom: hp('10'),
    backgroundColor: 'red',
  },
});
