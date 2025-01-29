import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {StyleSheet} from 'react-native';
import {Colors, FontFamily, scaleFont} from '../Theme/Variables';
import {hp, wp} from '../Config/responsive';

export const AlertDesign = ({
  isVisible,
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
  cancel,
  buttonColor,
}) => {
  return (
    <AwesomeAlert
      show={isVisible}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText={cancel ? cancel : 'Cancel'}
      confirmText={confirmText}
      confirmButtonColor={'#FF4949'}
      titleStyle={styles.modalTitle}
      messageStyle={styles.modalMsg}
      cancelButtonStyle={styles.cancelBtnMain}
      confirmButtonStyle={{
        ...styles.confirmBtnMain,
        backgroundColor: buttonColor ? Colors.primaryColor : '#FF4949',
      }}
      cancelButtonTextStyle={styles.modalCancelBtnText}
      confirmButtonTextStyle={styles.modalcConfirmBtnText}
      onCancelPressed={onCancel}
      onConfirmPressed={onConfirm}
    />
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    color: Colors.black,
    fontSize: scaleFont(25),
    fontFamily: FontFamily.semiBold,
  },
  modalMsg: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.regular,
    color: Colors.bubbleText,
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
    fontWeight: '600',
  },
});
