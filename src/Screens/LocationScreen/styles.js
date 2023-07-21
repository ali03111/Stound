import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  recentLocationContainer: {
    borderColor: '#0BB4FF',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    height: hp('7'),
    width: wp('90'),
    alignSelf: 'center',
    borderWidth: 0.2,
    flexDirection: 'row', // Added to align icon and input
    alignItems: 'center',
    position: 'absolute',
    top: hp('10'),
    zIndex: -1,
    overflow: 'hidden',
  },
  image: {
    width: wp('6'),
    aspectRatio: 1,
  },
  text: {
    fontSize: hp('1.8'),
    color: Colors.primaryTextColor,
  },
  recentContainer: {
    position: 'absolute',
    marginLeft: wp('5'),
    top: hp('20'),
  },
  recentLocationtext: {
    color: '#212759',
    fontWeight: '500',
  },
  recentConatainer: {
    top: hp('20'),
    position: 'absolute',
    marginLeft: wp('4'),
    zIndex: -1,
  },
  innerRecentContainer: {
    borderColor: Colors.primaryTextColor,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: wp('90'),
    alignSelf: 'center',
    borderWidth: 0.2,

    zIndex: 0,
    marginLeft: wp('1'),
    marginTop: hp('1'),
  },
  recentText: {
    fontSize: hp('1.8'),
    color: 'rgba(41, 45, 50, 0.5);',
  },
  getStart: {
    justifyContent: 'center',
  },
  chooseLocationButton: {
    width: wp('90'),
    alignSelf: 'center',
    marginBottom: hp('5'),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    justifyContent: 'center',
  },
});
