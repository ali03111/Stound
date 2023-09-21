import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    paddingBottom: hp('5'),
    paddingTop: hp('5'),
  },
  centerCustomStyles: {
    alignItems: 'center',
  },
  dayStyle: {
    paddingTop: hp('6'),
    color: Colors.primaryTextColor,
    fontSize: hp('2.5'),
  },
  dayBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5'),
  },
  midContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CoinImage: {
    aspectRatio: 1,
    width: wp('14'),
  },

  midContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  midTextContainer: {
    marginLeft: wp('2'),
    justifyContent: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 8,
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    width: wp('90'),
    marginTop: hp('3'),
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  coinText: {
    fontSize: hp('2'),
    color: Colors.primaryTextColor,
    fontWeight: '500',
  },
  coinDesText: {
    fontSize: hp('1.6'),
    color: Colors.gray,
  },
  lastTextContainer: {
    width: wp('23'),
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('0.5'),
  },
  last1Text: {
    fontSize: hp('3'),
    color: Colors.white,
    fontWeight: '500',
  },
  last2Text: {
    fontSize: hp('2'),
    color: Colors.white,
    fontWeight: '500',
  },
});
