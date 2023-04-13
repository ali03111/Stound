import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  ratingMain: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
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
    marginTop: hp('-1.5'),
    color: 'white',
    marginBottom: hp('2'),
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
    backgroundColor: 'white',
  },
  rateBtnText: {
    color: Colors.primaryColor,
    fontWeight: '600',
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
  userEmail: {
    color: 'white',
    fontSize: hp('1.8'),
    paddingHorizontal: wp('8'),
    textAlign: 'center',
    lineHeight: 20,
    marginTop: hp('1'),
    marginBottom: hp('8'),
  },
  rateHd: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: 'bold',
    marginTop: hp('8'),
  },
});
