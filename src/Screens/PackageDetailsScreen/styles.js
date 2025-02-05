import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors, FontFamily, scaleFont} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'white',
    width: wp('100'),
  },
  firstImage: length => ({
    width: length == 1 ? wp('91') : wp('72'),
    height: hp('29'),
    borderRadius: 10,
    marginVertical: hp('0.5'),
    overflow: 'hidden',
    borderWidth: 0.5,

    borderColor: '#A1ACBB26',
  }),
  propertyText: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.semiBold,
    color: Colors.primaryTextColor,
    marginBottom: hp('1.5'),
  },
  secondImage: index => ({
    width: wp('19'),
    height: hp('6.5'),
    borderRadius: 10,
    // backgroundColor: index == 4 && Colors.red,
    overflow: 'hidden',
    marginLeft: wp('2'),
    marginVertical: hp('0.5'),
    borderWidth: 0.5,
    borderColor: '#A1ACBB26',
  }),
  overlayView: {
    flex: 1,
    backgroundColor: Colors.blurBlack,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: Colors.white,
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  imageHeaderView: {
    flexDirection: 'row',
    width: wp('93'),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    flex: 1,
  },
  detailTitle: {
    flexDirection: 'row',
    marginTop: hp('1.4'),
    alignItems: 'center',
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.5'),
    marginBottom: hp('2'),
  },
  locationText: {
    color: 'gray',
    marginLeft: wp('2'),
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(16),
    width: wp('83'),
  },

  title: {
    flex: 0.8,
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(25),
    color: Colors.primaryTextColor,
  },
  forRent: {
    flex: 0.3,
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(16),
    textAlign: 'right',
    color: Colors.primaryColor,
  },
  btn: {
    paddingHorizontal: wp('2.5'),
    marginRight: wp('2'),
    marginBottom: hp('1'),
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  mainToggle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(11, 180, 255, 0.5)',
  },
  toggleHead: {
    flexDirection: 'row',
    paddingVertical: hp('1.5'),
    alignItems: 'center',
  },
  headTitle: {
    flex: 1,
    fontSize: hp('2.1'),
    fontWeight: '500',
    color: 'black',
  },
  propertyDetails: {
    borderWidth: 0.5,
    borderColor: 'rgba(11, 180, 255, 0.5)',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('2'),
    borderRadius: 10,
    // flex: 1,
  },
  detailsHeading: {
    fontSize: hp('2.2'),
    fontWeight: '600',
    color: 'black',
    marginBottom: hp('2'),
  },
  descriptionHeading: {
    fontSize: hp('2.2'),
    fontWeight: '600',
    color: 'black',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2'),
  },
  accProfile: {
    // flex: 0.3,
  },
  profileData: {
    flex: 1,
    marginLeft: wp('1'),
  },
  accChat: {
    flex: 0.1,
  },
  pEmail: {
    fontSize: hp('1.8 '),
    // fontWeight: '600',
    color: 'gray',
    marginBottom: hp('.5'),
  },
  accProfileImg: {
    width: wp('15'),
    height: hp('7.2'),
    borderRadius: 7,
    aspectRatio: 1,
  },
  priceMain: {
    flexDirection: 'row',
    paddingVertical: hp('3'),
    paddingHorizontal: wp('6'),
    alignItems: 'center',
  },
  priceLeft: {
    flex: 1,
  },
  sendBtnStyle: {
    padding: 10,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: wp('10'),
    height: hp('6'),
  },
  sendTextStyle: {
    color: 'white',
    marginLeft: wp('1.5'),
    fontFamily: FontFamily.semiBold,
    fontSize: scaleFont(16),
  },
  price: {
    color: Colors.primaryColor,
    fontSize: hp('2.5'),
    fontFamily: FontFamily.bold,
    fontSize: scaleFont(25),
  },
  priceText: {
    color: Colors.primaryTextColor,
    fontSize: scaleFont(14),
    fontFamily: FontFamily.regular,
  },
  descriptionHeading: {
    fontSize: hp('2.2'),
    fontWeight: '600',
    color: 'black',
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgba(11, 180, 255, 0.03)',
  },

  desText: {
    color: '#222',
    // marginLeft: wp('2'),
    fontSize: scaleFont(16),
    FontFamily: FontFamily.regular,
    textAlign: 'left',
    marginBottom: hp('1.5'),
    marginTop: hp('1'),
    marginLeft: wp('3'),
    marginRight: wp('2'),
  },
  grayAreaOfModal: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'ios' ? hp('4') : null,
  },
  mainBodyOfModal: {
    alignItems: 'center',
  },
  checkView: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: 10,
  },

  list: {
    flexDirection: 'row',
    gap: 10,
  },
  detailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgba(11, 180, 255, 0.03)',
  },
  text: {
    fontSize: scaleFont(14),
    FontFamily: FontFamily.regular,
    color: '#1D1D1D',
  },
});
