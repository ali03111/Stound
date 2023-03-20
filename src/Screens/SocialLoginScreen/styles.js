import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  socialBtnMain: {
    paddingVertical: hp('5'),
    paddingHorizontal: wp('5'),
  },
  logo: {
    width: wp('33'),
    height: hp('20'),
    justifyContent: 'center',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: hp('7'),
    marginBottom: hp('5'),
  },
  socialBtn: {
    justifyContent: 'center',
    marginTop: hp('2.5'),
  },
  emailBtn: {
    justifyContent: 'center',
  },
  barMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barText: {
    paddingHorizontal: wp('3'),
    color: Colors.grayborder,
  },
  barBorder: {
    width: wp('38'),
    backgroundColor: Colors.gray2,
    height: hp('.2'),
    justifyContent: 'center',
    marginVertical: hp('7'),
  },
});
