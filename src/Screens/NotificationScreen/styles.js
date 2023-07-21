import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  notification: {},
  notificationMain: {
    flex: 1,
    paddingTop: hp('1'),
    paddingBottom: hp('15'),
  },
  topHeader: {
    paddingBottom: hp('1'),
  },
});
