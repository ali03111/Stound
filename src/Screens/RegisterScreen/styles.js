import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  topHeading: {
    color: Colors.primaryColor,
    fontSize: hp('3.5'),
    fontWeight: '500',
    marginTop: hp('7'),
    marginBottom: hp('3'),
  },
  mainView: {
    paddingHorizontal: hp('3'),
  },
  loginInput: {
    fontWeight: '600',
    color: 'red',
  },
  forgetPass: {
    color: Colors.primaryColor,
    textAlign: 'right',
    marginTop: hp('1'),
    marginBottom: hp('5'),
  },
  getStart: {
    justifyContent: 'center',
    marginTop: hp('3.5'),
  },

  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp('6'),
  },
  arrowBack: {},
  backBtn: {
    marginLeft: wp('3'),
    color: Colors.gray2,
  },
  appHeadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('2'),
  },
  account: {
    marginRight: wp('3.5'),
  },
});
