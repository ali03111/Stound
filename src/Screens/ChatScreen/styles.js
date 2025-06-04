import {Platform, StyleSheet} from 'react-native';
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
    paddingBottom: hp('1 '),
    // backgroundColor: 'red',
  },
  searchMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: hp('6'),
    borderRadius: 10,
    borderColor: Colors.lightblue,
    // flex: 1,
    paddingHorizontal: wp('3.5'),
    marginHorizontal: wp('4'),
    marginVertical: hp('2'),
    overflow: 'hidden',
  },
  searchinput: {
    // paddingHorizontal: wp('2.5'),
    width: wp('50'),
    fontSize: 15,
    color: 'black',
    padding: 10,
  },
  centerHeading: {
    marginRight: wp('3'),
  },
  search: {
    resizeMode: 'contain',
    height: hp('5'),
    width: wp('7'),
  },
  backRightBtnRight: {
    backgroundColor: '#EA4335',
    // flexGrow: 1,
    height: Platform.OS == 'ios' ? hp('8.9') : hp('9.9'),
    // borderTopRightRadius: 15,
    // borderBottomRightRadius: 15,
    alignItems: 'flex-end',
    // paddingTop: hp('2'),
    paddingRight: wp('3'),
    borderRadius: 15,
    marginVertical: hp('0.5'),
    // marginHorizontal: wp('3.5'),
    justifyContent: 'center',
  },
  trashIcon: {
    width: wp('6'),
    height: hp('6'),
  },
  listMain: {
    flex: 1,
    alignSelf: 'center',
  },
});
