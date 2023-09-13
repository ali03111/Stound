import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  pick: {
    // alignSelf: 'center',
    width: wp('83'),
    color: Colors.primaryTextColor,
  },
  favMain: {
    paddingTop: hp('1.5'),
  },
  topHeader: {
    paddingTop: hp('1.5'),
  },
  filterMain: {
    paddingHorizontal: wp('3'),
    // paddingBottom: hp('2'),
  },
  switcher: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primaryColor,
    marginTop: hp('1.5'),
  },
  filterHeader: {
    marginTop: hp('2'),
  },
  pickerStyle: {
    // borderWidth: 1,
    // borderColor: 'rgba(11, 180, 255, 0.3)',
    // borderRadius: 10,
    // backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: wp('3'),
  },
  pickerStyle1: {
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: wp('3'),
  },
  itemHeading: {
    marginTop: hp('3'),
    marginBottom: hp('1.5'),
    fontWeight: '500',
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: wp('3'),
    paddingVertical: hp('1'),
  },
  filterButton: {
    width: wp('20'),
  },
  locationBtn: {
    borderColor: Colors.grayBackground,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderRadius: 0,
    justifyContent: 'flex-start',
    width: wp('85'),
  },
  locationBtnText: {
    fontSize: hp('2'),
    color: Colors.grayBackground,
    width: wp('80'),
    textAlign: 'left',
  },
  locationBtnImg: {
    width: 22,
    height: 22,
  },
  pRange: {
    fontWeight: '600',
    marginTop: hp('3'),
    fontSize: hp('2.5'),

    marginBottom: hp('1.5'),
  },
  applyFilter: {
    height: hp('6.5'),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    marginBottom: hp('4'),
    marginTop: hp('4'),
  },
  filterText: {
    fontSize: hp('2'),
  },
  thumbImage: {
    width: 50,
    height: 80,
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
  },
  rangeSlider: {
    // paddingBottom: wp('6'),
    paddingHorizontal: hp('0'),
    marginHorizontal: hp('0'),
  },
  rangeSlider: {
    width: '100%',
    paddingHorizontal: hp('0'),
    marginHorizontal: hp('0'),
    // alignSelf: 'center',
  },
  androidSlider: {
    marginBottom: hp('1.5'),

    // borderRadius: 8,
  },
  iosSlider: {
    marginBottom: hp('1.5'),

    // No additional styles needed for iOS in this example
  },
  rangeTextMain: {
    flexDirection: 'row',
  },
  rangeTextLeft: {
    flex: 1,
    color: Colors.gray2,
  },
  rangeTextRight: {
    flex: 1,
    textAlign: 'right',
    color: Colors.gray2,
  },
  max: {
    backgroundColor: 'red',
  },
  flatListMain: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tags: {
    paddingHorizontal: wp('2'),
    marginHorizontal: wp('1'),
    marginBottom: hp('1'),
  },
  priceRange: {
    color: 'black',
    // backgroundColor: 'transparent', // This works
  },

  root: {
    alignItems: 'stretch',
    padding: 12,
    flex: 1,
    backgroundColor: '#555',
  },
  slider: {},
  button: {},
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    width: 50,
    color: 'white',
    fontSize: 20,
  },
});
