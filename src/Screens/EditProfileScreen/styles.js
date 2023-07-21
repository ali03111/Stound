import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  editProfileContainer: {
    paddingHorizontal: wp('4'),
    paddingTop: hp('5'),
  },
  porfileInfo: {
    alignItems: 'center',
    marginBottom: hp('5'),
  },
  userName: {
    fontSize: hp('2.2'),
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: hp('1.7'),
    color: Colors.gray2,
  },
  ProfileImageShadow: {
    marginTop: hp('-3'),
    zIndex: -9,
  },
  ProfileImage: {
    borderRadius: 7,
    // width: wp('20'),
    height: hp('20'),
    aspectRatio: 1,
  },
  porfileTopImages: {
    // position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UploadProfile: {
    paddingHorizontal: wp('1.6'),
    paddingVertical: hp('.8'),
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'absolute',
    bottom: 25,
    right: 0,
  },
  UploadProfileIcon: {
    width: wp('5'),
    height: hp('2.5'),
  },
  saveBtnMain: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: wp('4'),
    paddingBottom: hp('5'),
  },
  saveBtn: {
    justifyContent: 'center',
  },
  loginInput: {
    backgroundColor: 'white',
    // marginBottom: hp('1.5'),
    fontSize: hp('2.2'),
    marginTop: hp('1'),
  },
  calendar: {
    marginBottom: hp('4'),
  },
  datePickerBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    height: hp('7'),
    borderRadius: 15,
    flexDirection: 'row',
    borderColor: Colors.lightblue,
    alignItems: 'center',
    marginVertical: hp('1'),
  },
  datePickerBtnInner: {
    width: wp('100'),
    color: 'white',
  },
  calenderImg: {
    marginLeft: wp('4'),
    marginRight: wp('2.5'),
    resizeMode: 'contain',
  },
  date: {
    fontSize: hp('2'),
    fontWeight: 'bold',
    color: 'black',
  },
});
