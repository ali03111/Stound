import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  searchBarMain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: wp('6'),
    paddingVertical: hp('1.5'),
  },
  searchMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: hp('7'),
    borderRadius: 10,
    borderColor: Colors.lightblue,
    flex: 1,
    paddingHorizontal: wp('3.5'),

    overflow: 'hidden',
  },
  searchinput: {
    paddingHorizontal: wp('2.5'),
    width: wp('46'),
    fontSize: 15,
  },
  searchIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    borderWidth: 1,
    height: hp('7'),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: Colors.lightblue,
    width: wp('14'),
    marginLeft: 5,
  },
});
