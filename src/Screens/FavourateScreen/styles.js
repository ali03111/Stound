import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  womenLottie: {width: wp('40'), height: hp('35'), marginVertical: hp('3')},
  appHeadingView: {
    flexDirection: 'row',
    width: wp('55'),
    justifyContent: 'space-between',
  },
  redColorText: {color: Colors.red, fontSize: hp('4'), fontWeight: 'bold'},
  dotList: {
    flexDirection: 'row',
    width: wp('25'),
    justifyContent: 'space-between',
    marginTop: hp('3'),
  },
  getStart: {
    width: wp('90'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6.5'),
    // borderRadius: 60,
    marginTop: hp('4'),
  },
  centerMainView: {
    width: wp('100'),
    justifyContent: 'flex-end',
    height: hp('30'),
    alignItems: 'center',
  },
  centerHeading: {
    fontSize: hp('3.5'),
    fontWeight: 'bold',
    marginVertical: hp('3'),
    width: wp('90'),
    textAlign: 'center',
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
    height: Dimensions.get('window').width * 0.04,
    width:
      currentIndex == index
        ? Dimensions.get('window').width * 0.08
        : Dimensions.get('window').width * 0.04,
    backgroundColor: currentIndex == index ? Colors.red : Colors.gray,
  }),
});
