import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: wp('6'),
    width: wp('100'),
  },
  headerBackText: {
    flex: 3,
  },
  centerText: {
    flex: 7,
  },
  topHeading: {
    color: Colors.black,
    fontSize: hp('3.5'),
    fontWeight: '500',
    marginTop: hp('7'),
    marginBottom: hp('1'),
  },
  passwordText: {
    marginBottom: hp('3'),
  },
  mainView: {
    paddingHorizontal: wp('4'),
  },
  resetPass: {
    fontWeight: '400',
    color: 'red',
  },
  passwordStyle: {
    fontWeight: '300',
  },
  forgetPass: {
    color: Colors.primaryColor,
    textAlign: 'right',
    marginTop: hp('1'),
    marginBottom: hp('5'),
  },
  getStart: {
    justifyContent: 'center',
    marginTop: hp('6'),
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
});
