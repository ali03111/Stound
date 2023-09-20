import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors, FontSize} from '../../Theme/Variables';
import {height} from '../../Navigation/bottomNavigation';

export const styles = StyleSheet.create({
  favMain: {
    paddingTop: hp('1.5'),
  },
  itemHeading1: {
    fontWeight: '600',
    fontSize: FontSize.scale16,
    color: Colors.primaryTextColor,
  },

  cancelImage: {
    position: 'absolute',
    zIndex: 1,
    right: wp('2'),
    top: hp('1'),
  },
  topHeader: {
    paddingTop: hp('1.5'),
  },
  filterMain: {
    paddingHorizontal: wp('3'),
    paddingTop: hp('2'),
    paddingBottom: hp('4'),
  },
  flatListMain: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  switcher: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primaryColor,
    // marginTop: hp('1.5'),
    marginBottom: hp('1.5'),
    marginTop: hp('1.5'),
  },
  filterHeader: {
    marginTop: hp('2'),
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: wp('3'),
    paddingVertical: hp('0.2'),
  },
  pickerStyle1: {
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: wp('3'),
  },
  pick: {
    width: height > 667 ? wp('84') : wp('80'),
    color: Colors.primaryTextColor,
  },
  itemHeading: {
    marginTop: hp('3'),
    marginBottom: hp('1.5'),
    // fontWeight: '500',
    fontWeight: '600',
    fontSize: FontSize.scale16,
    color: Colors.primaryTextColor,
  },
  room: {
    marginTop: hp('3'),
    marginBottom: hp('1.5'),
    fontWeight: '500',
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: wp('2'),
    padding: 10,
    // flexDirection: 'row',
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
    width: wp('88'),
    backgroundColor: 'white',
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
  rangeSlider: {
    // height: 40,
    // paddingBottom: wp('6'),
    paddingHorizontal: hp('0'),
    marginHorizontal: hp('0'),
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
  titleMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: hp('7'),
    borderRadius: 10,
    borderColor: Colors.lightblue,
    marginVertical: hp('3'),
    backgroundColor: 'white',
    paddingHorizontal: wp('3'),
  },
  inputTitle: {
    paddingHorizontal: wp('2.5'),
    width: wp('46'),
    fontSize: hp('2'),
  },
  inputTitle: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    fontWeight: '400',
  },
  inputText: {
    fontWeight: '400',
    paddingLeft: wp('2'),
  },
  inputIcon: {
    marginLeft: wp('3'),
  },
  inputDesc: {
    height: hp('15'),
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'auto',
  },
  msgIcon: {
    marginLeft: wp('3'),
    alignSelf: 'baseline',
    marginTop: hp('2'),
  },
  inputTextarea: {
    fontWeight: '400',
    paddingLeft: wp('2'),
    textAlignVertical: 'top',
    paddingTop: hp('2'),
  },
  galleryHd: {
    flexDirection: 'row',
    marginTop: hp('3'),
    marginBottom: hp('1.5'),
    alignItems: 'center',
  },
  addImage: {
    marginRight: wp('2'),
  },
  tags: {
    // height: hp('6'),
    paddingHorizontal: wp('2'),
    marginHorizontal: wp('1'),
  },
  imagesStyle: {
    width: wp('45'),
    height: hp('11'),
    borderRadius: 10,
    marginVertical: hp('0.5'),
    marginHorizontal: wp('1'),
  },
  Modal: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: 'center',
    padding: 10,
  },
  modalText: {
    fontSize: hp('2.5'),
    color: Colors.primaryTextColor,
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  titleContainer: {
    padding: 15,
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  iosPick: {
    marginLeft: wp('0.5'),
    padding: hp('1.5'),
    flex: 1,
    fontSize: FontSize.scale16,
    color: Colors.primaryTextColor,
    fontWeight: 400,
  },
  dropDown: {
    marginRight: wp('4'),
  },
  //FOR picker style
  dropDownView: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderWidth: 1,
  },
  dropdown: {
    height: 50,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    marginTop: hp('1'),
    color: Colors.primaryTextColor,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Colors.primaryTextColor,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.primaryTextColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.primaryTextColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.primaryTextColor,
  },
  rightView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'white',

    paddingHorizontal: wp('5'),
  },
});
