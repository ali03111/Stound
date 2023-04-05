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
  },
  filterHeader: {
    marginTop: hp('2'),
    marginBottom: hp('5'),
  },
  filterBtn: {
    // width: wp('35'),
    height: hp('6'),
    paddingHorizontal: wp('4'),
    marginHorizontal: wp('2'),
  },
});
