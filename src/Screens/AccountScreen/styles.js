import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  topHeader: {
    paddingTop: hp('1.5'),
  },
  accountHeader: {
    marginTop: hp('2'),
    marginBottom: hp('1'),
  },
  accountMain: {
    paddingHorizontal: wp('4'),
  },
  button: {
    height: hp('7'),
    marginBottom: hp('1.2'),
  },
  buttonText: {
    flex: 2,
    textAlign: 'left',
  },
  iconLeft: {
    flex: 0.4,
  },
  iconRight: {
    flex: 0.3,
  },
  logOutText: {
    flex: 2.3,
    textAlign: 'left',
  },
  logOutIcon: {
    flex: 0.4,
  },
  deActivateAccText: {
    flex: 2.3,
    textAlign: 'left',
  },
  deActivateAccIcon: {
    flex: 0.4,
  },
});
