import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors, FontSize} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  SocialBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  descriptionHeading: {
    fontSize: hp('2.2'),
    fontWeight: '600',
    color: 'black',
  },

  input: {
    height:120,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'gray',
    borderWidth: 1,

    color:'black'
  },

  descriptionScrollContainer: {
    // flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgb(248, 248, 248)',
  },
  // desText: {
  //   color: 'gray',
  //   // marginLeft: wp('2'),
  //   fontSize: hp('1.9'),
  //   width: wp('95'),
  //   textAlign: 'left',
  //   marginBottom: hp('1.5'),
  //   marginTop: hp('0.5'),
  // },
  // desText: {
  //   color: '#222',
  //   // marginLeft: wp('2'),
  //   fontSize: hp('1.9'),
  //   textAlign: 'left',
  //   marginBottom: hp('1.5'),
  //   marginTop: hp('1'),
  //   marginLeft: wp('3'),
  //   marginRight: wp('2'),
  // },
  // button: {
  //   // height: hp('5'),
  //   // width: wp('25'),
  //   borderRadius: 10,
  //   // alignItems: 'center',
  //   flexDirection: 'row',
  //   // justifyContent: 'center',
  //   borderWidth: 1,
  //   borderColor: 'rgba(11, 180, 255, 0.3)',
  //   borderRadius: 10,
  //   backgroundColor: 'rgb(248, 248, 248)',
  // },
  socialbox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: wp('4'),
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    // width: wp('28'),
    backgroundColor: 'rgba(11, 180, 255, 0.03)',
    marginRight: wp('3'),
    // flexWrap: 'wrap',
  },
  imageTextStyle: {
    fontSize: hp('1.5'),
    marginLeft: wp('2'),
  },
  imageStyle: {
    tintColor: Colors.primaryColor,
    width: wp('5'),
    resizeMode: 'contain',
    height: hp('5'),
  },
  topContainer: {
    marginTop: hp('2'),
    marginLeft:wp('3'),
    marginRight:wp('2.5'),

    paddingBottom: hp('5'),
  },
  headingStyle: {
    fontSize: hp('2.2'),
    marginBottom: hp('1'),
  },
  firstImage: length => ({
    width: length == 1 ? wp('90') : wp('68'),
    // width: length > 0 ? wp('67') : wp('90'),
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
    // marginLeft:wp('2'),
    // padding:10,
    flex: 1,
  },
  detailTitle: {
    flexDirection: 'row',
    marginTop: hp('1.4'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationMain: {
    flexDirection: 'row',

    marginVertical:hp('2')
    // paddingHorizontal: wp('1'),
  },
  locationText: {
    color: 'gray',
    marginLeft: wp('1.5'),
    fontSize: hp('1.9'),
    width: wp('80'),
  },
  loctStyle: {
    aspectRatio: 1,
    width: wp('8'),
    height: hp('5'),
    resizeMode: 'contain',
  },
  title: {
    flex: 0.8,
    fontWeight: '600',
    fontSize: FontSize.scale24,
    color:Colors.primaryTextColor
  },
  forRent: {
    flex: 0.3,
    fontWeight: 'bold',
    fontSize: hp('1.8'),
    textAlign: 'left',
    marginLeft: wp('1'),
    marginTop: hp('0.5'),
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
  pTitle: {
    fontSize: hp('2'),
    fontWeight: '600',
    color: 'black',
    marginBottom: hp('.5'),
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
    paddingVertical: hp('2'),
    alignItems: 'center',
  },
  priceLeft: {
    flex: 1,
  },
  sendBtnStyle: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: wp('10'),

    height: hp('7'),
  },
  sendTextStyle: {
    color: 'white',
    marginLeft: wp('1.5'),
  },
  price: {
    color: Colors.primaryColor,
    fontSize: hp('3'),
    fontWeight: '600',
  },
  priceText: {
    color: 'black',
    fontSize: hp('1.5'),
  },
  button: {
    padding:10,
    height:hp('12'),
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgb(248, 248, 248)',
    color:'black'
  },
  // pTitle: {
  //   fontSize: hp('1.7'),
  //   // fontWeight: '600',
  //   color: Colors.primaryTextColor,
  
  //   marginBottom: hp('1'),
  // },
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
