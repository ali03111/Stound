import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'white',
    width: wp('100'),
  },
  firstImage: length => ({
    width: length == 1 ? wp('90') : wp('68'),
    height: hp('32'),
    borderRadius: 10,
    marginVertical: hp('0.5'),
    overflow: 'hidden',
  }),
  secondImage: index => ({
    width: wp('20'),
    height: hp('10'),
    borderRadius: 10,
    backgroundColor: index == 4 && Colors.red,
    overflow: 'hidden',
    marginLeft: wp('2'),
    marginVertical: hp('0.5'),
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
    width: wp('90'),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    paddingHorizontal: wp('4'),
    flex: 1,
  },
  detailTitle: {
    flexDirection: 'row',
    paddingHorizontal: wp('1'),
    marginTop: hp('1.4'),
    alignItems: 'center',
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.5'),
    marginBottom: hp('1.5'),
  },
  locationText: {
    color: 'gray',
    marginLeft: wp('2'),
    fontSize: hp('1.8'),
    width: wp('83'),
  },

  title: {
    flex: 0.8,
    fontSize: hp('2.7'),
    color: Colors.primaryTextColor,
  },
  forRent: {
    flex: 0.3,
    fontWeight: 'bold',
    fontSize: hp('1.8'),
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
    // overflow: 'hidden',
    aspectRatio: 1,
  },
  priceMain: {
    flexDirection: 'row',
    paddingVertical: hp('3'),
    alignItems: 'center',
  },
  priceLeft: {
    flex: 1,
  },
  sendBtnStyle: {
    padding: 10,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: wp('5'),
    height: hp('6'),
  },
  sendTextStyle: {
    color: 'white',
    marginLeft: wp('1.5'),
  },
  price: {
    color: Colors.primaryColor,
    fontSize: hp('2.5'),
    fontWeight: '600',
  },
  priceText: {
    color: 'black',
    fontSize: hp('1.5'),
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
    backgroundColor: 'rgb(248, 248, 248)',
  },
  pTitle: {
    fontSize: hp('1.7'),
    // fontWeight: '600',
    color: Colors.primaryTextColor,
  
    marginBottom: hp('1'),
  },
  desText: {
    color: '#222',
    // marginLeft: wp('2'),
    fontSize: hp('1.9'),
    textAlign: 'left',
    marginBottom: hp('1.5'),
    marginTop: hp('1'),
    marginLeft: wp('3'),
    marginRight: wp('2'),
  },
});

