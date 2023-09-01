import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  searchBarMain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: wp('3'),
    paddingVertical: hp('1'),
    paddingTop: hp('3.5'),
  },
  searchMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: hp('6'),
    borderRadius: 10,
    borderColor: Colors.lightblue,
    flex: 1,
    paddingHorizontal: wp('3.5'),

    overflow: 'hidden',
  },
  searchinput: {
    padding: 10,
    // paddingHorizontal: wp('2.5'),
    width: wp('46'),
    fontSize: 15,
  },
  searchIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    borderWidth: 1,
    height: hp('6'),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: Colors.lightblue,
    width: wp('14'),
    marginLeft: 5,
  },
  homeCard: {
    backgroundColor: 'red',
    height: hp('2'),
  },
  card: {
    // flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: hp('10'),
  },
  cardMainView: {
    flex: 1,
    width: wp('100'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('-10'),
    height: hp('21'),
  },
  alertTitle: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  actionViewStyle: {
    width: wp('75'),
    justifyContent: 'center',
  },
  radioView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
    paddingVertical: hp('1.5'),
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.primaryColor,
    borderWidth: 0.2,
    paddingHorizontal: wp('2'),
    alignItems: 'center',
  },
  radioLabel: {
    fontWeight: 'normal',
    fontSize: hp('1.8'),
  },
  cancelButtonStyle: {
    width: wp('35'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: hp('5'),
    borderColor: Colors.primaryColor,
    borderWidth: 0.2,
  },
  confirmButtonStyle: {
    width: wp('35'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    height: hp('5'),
  },
  search: {
    aspectRatio: 1,
    height: hp('10'),
  },
  setting: {
    resizeMode: 'contain',
    height: hp('5'),
    width: wp('7'),
  },
});
