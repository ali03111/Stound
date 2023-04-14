import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  firstImage: length => ({
    width: length == 1 ? wp('90') : wp('67'),
    // width: length > 0 ? wp('67') : wp('90'),
    height: hp('33'),
    borderRadius: 10,
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
});
