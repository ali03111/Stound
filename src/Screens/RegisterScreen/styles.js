import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors, FontFamily, FontSize} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  topHeading: {
    color: Colors.primaryColor,
    fontWeight: '500',
    marginTop: hp('7'),
    marginBottom: hp('3'),
    fontSize: FontSize.scale26,
    fontFamily: FontFamily.semiBold,
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
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
    alignItems: 'center',

    marginTop: hp('2'),
  },
  account: {
    fontSize: FontSize.scale16,
    fontFamily: FontFamily.regular,
    marginRight: wp('1.5'),
  },
});
