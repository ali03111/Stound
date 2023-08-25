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
});
