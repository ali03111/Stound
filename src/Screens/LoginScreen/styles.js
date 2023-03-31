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
  },

  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp('6'),
  },

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
  or: {
    textAlign: 'center',
    color: Colors.gray2,
    marginVertical: hp('3'),
  },
  signUpWith: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    paddingHorizontal: wp('3'),
    color: Colors.grayborder,
  },
  signUpBorder: {
    width: wp('20'),
    backgroundColor: Colors.gray2,
    height: hp('.3'),
    justifyContent: 'center',
  },
  mainSocialIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  socialIcon: {
    width: wp('12'),
    height: hp('7'),
    resizeMode: 'contain',
    marginHorizontal: wp('4.5'),
    marginVertical: hp('2'),
  },
});
