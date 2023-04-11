import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import {
  appleIcon,
  arrowback,
  facebookIcon,
  googleIcon,
  lock,
  sms,
} from '../../Assests';
import {InputComponent} from '../../Components/InputComponent';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import ShareButton from '../../Components/ShareButton';
import {TextComponent} from '../../Components/TextComponent';
import Header from '../../Components/Header';
import {Touchable} from '../../Components/Touchable';
import {hp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';
import {styles} from './styles';
import useResetPasswordScreen from './useResetPasswordScreen';

const ResetPasswordScreen = () => {
  const {handleSubmit, errors, reset, control, getValues} =
    useResetPasswordScreen();
  return (
    <View style={{flex: 1}}>
      <Header
        headerTitle={'Change Password'}
        backText={'Back'}
        style={styles.Header}
        arrowBackIcon={arrowback}
        backTextStyle={styles.headerBackText}
        centerTextStyle={styles.centerText}
      />
      <View style={styles.mainView}>
        <KeyBoardWrapper>
          <TextComponent
            text={'Create New Password'}
            styles={styles.topHeading}
          />
          <TextComponent
            text={
              'Your new password must be different from previous used passwords.'
            }
            styles={styles.passwordText}
          />
          <InputComponent
            {...{
              name: 'password',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Password',
              viewStyle: styles.resetPass,
              isSecure: true,
              isImage: lock,
              forPasswordStyle: styles.passwordStyle,
            }}
          />
          <InputComponent
            {...{
              name: 'new_password',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Confirm Password',
              isSecure: true,
              isImage: lock,
              viewStyle: styles.resetPass,
              forPasswordStyle: styles.passwordStyle,
            }}
          />
          <ShareButton title={'Reset Password'} style={styles.getStart} />
        </KeyBoardWrapper>
      </View>
    </View>
  );
};

export default memo(ResetPasswordScreen);
