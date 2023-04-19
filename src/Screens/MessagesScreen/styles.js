import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  searchBar: {},
  searchMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: hp('7'),
    borderRadius: 10,
    borderColor: Colors.lightblue,
    paddingHorizontal: wp('3'),
    marginHorizontal: wp('4'),
    marginVertical: hp('2'),
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  searchinput: {
    // paddingHorizontal: wp(''),
    paddingRight: wp('3'),
    width: wp('65'),
    fontSize: 15,
  },
  sendBtnStyle: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: wp('3'),
  },
  sendTextStyle: {
    color: 'white',
    marginLeft: wp('1.5'),
  },
});
