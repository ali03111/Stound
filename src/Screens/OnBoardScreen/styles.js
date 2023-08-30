import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  appHeadingView: {
    flexDirection: 'row',
    width: wp('55'),
    justifyContent: 'space-between',
  },
  redColorText: {color: Colors.red, fontSize: hp('4'), fontWeight: 'bold'},
  dotList: {
    flexDirection: 'row',
    width: wp('18'),
    height: hp('3'),
    justifyContent: 'space-between',

    // marginTop: hp('/2'),
  },
  getStarted: {
    textAlign:'center',
    width: wp('90'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6.5'),
    // borderRadius: 60,
    marginTop: hp('3'),
    alignSelf: 'center',
    marginBottom: hp('5'),
    margin:10
  },
  getStart: {
    textAlign:'center',
    width: wp('45'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6.5'),
    // borderRadius: 60,
    marginTop: hp('3'),
    alignSelf: 'center',
    marginBottom: hp('5'),
    margin:10
  },
  centerMainView: {
    width: wp('100'),
    // backgroundColor: 'red',
    // justifyContent: 'flex-end',
    // height: hp('100'),
    alignItems: 'center',
  },
  centerHeading: {
    fontSize: hp('3'),
    fontWeight: 'bold',
    marginVertical: hp('1.5'),
    marginBottom: hp('2'),
    width: wp('90'),
    textAlign: 'center',
    color: Colors.primaryColor,
  },
  centerDes: {
    fontSize: hp('2'),
    color: Colors.gray,
    width: wp('93'),
    textAlign: 'center',
  },
  dot: (currentIndex, index) => ({
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    height: Dimensions.get('window').width * 0.03,
    width:
      currentIndex == index
        ? Dimensions.get('window').width * 0.06
        : Dimensions.get('window').width * 0.03,
    backgroundColor: currentIndex == index ? '#212759' : Colors.white,
    borderWidth: currentIndex == index ? 0 : 1,
  }),
  bannerImg: {
    height: hp('70'),
    width: wp('100'),
  },
});
