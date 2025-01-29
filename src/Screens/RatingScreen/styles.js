import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors, FontFamily, FontSize, scaleFont} from '../../Theme/Variables';

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
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(20),
    marginTop: hp('-1.5'),
    color: 'white',
    marginBottom: hp('2'),
  },
  userEmail: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(16),
    color: Colors.gray2,
  },
  ProfileImageShadow: {
    marginTop: hp('-3'),
    zIndex: -9,
  },

  porfileTopImages: {
    // position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UploadProfile: {
    paddingHorizontal: wp('1.6'),
    paddingVertical: hp('2.8'),
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'absolute',
    bottom: 25,
    right: 0,
  },

  saveBtnMain: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: wp('4'),
    paddingBottom: hp('6.5'),
  },
  saveBtn: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rateBtnText: {
    color: Colors.primaryColor,
    fontWeight: '600',
  },
  userEmail: {
    color: 'white',
    fontSize: hp('1.8'),
    paddingHorizontal: wp('8'),
    textAlign: 'center',
    lineHeight: 20,
    marginTop: hp('1'),
    marginBottom: hp('4'),
  },
  rateHd: {
    color: 'white',
    marginTop: hp('8'),
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(25),
  },
  profileTopImages: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileImage: {
    borderRadius: 25,
    height: hp('15'),
    aspectRatio: 1,
  },
});
