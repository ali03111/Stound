import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  searchBar: {},
  searchMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: hp('6'),
    borderRadius: 10,
    borderColor: Colors.lightblue,
    paddingHorizontal: wp('3.5'),
    marginHorizontal: wp('4'),
    marginVertical: hp('2'),
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  searchinput: {
    paddingHorizontal: wp('2.5'),
    width: wp('46'),
    fontSize: 15,
  },
});
