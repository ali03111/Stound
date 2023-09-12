import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  favMain: {
    paddingTop: hp('1.5'),
  },
  topHeader: {
    paddingTop: hp('1.5'),
  },
  filterMain: {
    paddingHorizontal: wp('1'),
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: hp('10'),
  },
  filterHeader: {
    // marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  filterBtn: (v, item) => ({
    // width: wp('35'),
    height: hp('6'),
    paddingHorizontal: wp('4'),
    marginHorizontal: wp('2'),
    marginBottom: hp('2'),
    backgroundColor: v.includes(item) ? Colors.primaryColor : Colors.white,
  }),
  save: {
    color: Colors.primaryColor2,
  },
  innerText: (v, item) => ({
    color: v.includes(item) ? Colors.white : Colors.black,
  }),
});
