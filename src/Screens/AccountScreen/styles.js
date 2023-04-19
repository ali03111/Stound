import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  topHeader: {
    paddingTop: hp('1.5'),
  },
  accountMain: {
    paddingHorizontal: wp('4'),
  },
  button: {
    height: hp('7'),
    marginBottom: hp('1.2'),
  },
  buttonText: {
    flex: 2,
    textAlign: 'left',
  },
  iconLeft: {
    flex: 0.4,
    resizeMode: 'contain',
  },
  iconRight: {
    flex: 0.3,
    resizeMode: 'contain',
  },
  logOutText: {
    flex: 2.3,
    textAlign: 'left',
  },
  logOutIcon: {
    flex: 0.4,
    resizeMode: 'contain',
  },
  deActivateAccText: {
    flex: 2.3,
    textAlign: 'left',
  },
  deActivateAccIcon: {
    flex: 0.4,
    resizeMode: 'contain',
  },
  porfileContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    marginBottom: hp('3'),
  },
  porfileImg: {
    borderRadius: 7,
    width: wp('14.5'),
    height: hp('7.2'),
  },
  porfileInfo: {
    flex: 0.9,
    paddingHorizontal: wp('3'),
    justifyContent: 'center',
  },
  editPorfile: {
    flex: 0.1,
    paddingLeft: wp('3'),
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  userName: {
    fontSize: hp('2.2'),
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: hp('1.7'),
    color: Colors.gray2,
  },
  coinText: {
    flex: 0.4,
    justifyContent: 'center',
  },
  coinInnerText: {
    fontSize: hp('1.8'),
  },
  cBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1.5'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  BtnText: {
    color: 'white',
    fontSize: hp('1.7'),
  },
  coinIcon: {
    justifyContent: 'center',
    resizeMode: 'contain',
    paddingRight: wp('3'),
  },
  coinsBtn: {
    flex: 1,
    alignItems: 'flex-end',
    display: 'flex',
  },
  modalTitle: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: hp('2.5'),
  },
  modalMsg: {
    color: Colors.gray,
    fontSize: hp('1.8'),
    marginBottom: hp('3'),
  },
  cancelBtnMain: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: wp('1'),
    width: wp('30'),
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: hp('3'),
  },
  confirmBtnMain: {
    backgroundColor: '#FF4949',
    width: wp('30'),
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: hp('3'),
  },
  modalCancelBtnText: {
    fontSize: hp('1.8'),
    color: '#212759',
  },
  modalcConfirmBtnText: {
    fontSize: hp('1.8'),
  },
});
