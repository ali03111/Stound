import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors, FontSize} from '../../Theme/Variables';

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
  itemHeading1: {
    fontWeight: '600',
    fontSize: FontSize.scale16,

    color: Colors.primaryTextColor,
  },
  itemHeading: {
    marginTop: hp('3'),
    marginBottom: hp('1.5'),
    fontWeight: '600',
    fontSize: FontSize.scale16,

    color: Colors.primaryTextColor,
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
    marginTop: hp('3'),
    fontWeight: '700',
    fontSize: FontSize.scale16,
    color: Colors.primaryTextColor,

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
    justifyContent:'space-between'
  },
  rangeTextLeft: {
    flex: 1,  
    color: Colors.gray2,
  },
  rangeTextRight: {
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
  rangeSliderContainer: {
    marginTop: hp('1.5'),
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
    borderWidth:1,

  },
  dropdown: {
    height: 50,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    marginTop:hp('1'),
    color:Colors.primaryTextColor,

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
    color:Colors.primaryTextColor,

  },
  placeholderStyle: {
    fontSize: 16,
    color:Colors.primaryTextColor,

  },
  selectedTextStyle: {
    fontSize: 16,
    color:Colors.primaryTextColor,

  },
  iconStyle: {
    width: 20,
    height: 20,

  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:Colors.primaryTextColor,


  },
  rightView:{
    borderWidth:1,borderRadius:10,
      borderColor: 'rgba(11, 180, 255, 0.3)',
      justifyContent:'flex-end',padding:10,
      backgroundColor:'white',

      paddingHorizontal:wp('5')
              
              
  }
});
