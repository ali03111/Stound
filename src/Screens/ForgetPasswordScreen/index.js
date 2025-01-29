import React, {memo} from 'react';
import {View, Text, Image, ImageBackground, StatusBar} from 'react-native';
import {
  appleIcon,
  arrowback,
  arrowbackwhite,
  facebookIcon,
  forgotimage,
  googleIcon,
  lock,
  sms,
} from '../../Assets';
import {InputComponent} from '../../Components/InputComponent';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import ShareButton from '../../Components/ShareButton';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
import {Colors, FontFamily, FontSize, scaleFont} from '../../Theme/Variables';
import {styles} from './styles';
import useForgetPassword from './useForgetPassword';
import Header from '../../Components/Header';
import {hp, wp} from '../../Config/responsive';

const ForgetPasswordScreen = ({navigation}) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    goBack,
    forgetFunction,
    getValues,
  } = useForgetPassword(navigation);
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.mainView}>
        <ImageBackground style={styles.imageBackground} source={forgotimage}>
          <Header
            backText={'Back'}
            backTextStyle={{
              color: 'white',
              fontSize: scaleFont(20),
              fontFamily: FontFamily.semiBold,
            }}
            arrowBackIcon={arrowbackwhite}
            tintColor={'white'}
            goBack={goBack}
          />
        </ImageBackground>

        <KeyBoardWrapper>
          <View style={{marginHorizontal: wp('6')}}>
            <TextComponent
              text={'Forget Password'}
              styles={styles.topHeading}
            />
            <TextComponent
              numberOfLines={3}
              text={
                'Don’t worry! It happens, please enter the email associated with your account.'
              }
              styles={styles.passwordText}
            />
            <InputComponent
              {...{
                name: 'email',
                handleSubmit,
                errors,
                reset,
                control,
                getValues,
                placeholder: 'example@example.com',
                viewStyle: styles.loginInput,
                isImage: sms,
                // defaultValue: 'testing@gmail.com',
              }}
            />
            {/* <InputComponent
                {...{
                    name: 'password',
                    handleSubmit,
                    errors,
                    reset,
                    control,
                    getValues,
                    placeholder: 'Password',
                    isSecure: true,
                    isImage: lock,
                    // defaultValue: 'i53rdgen@',
                }}
            /> */}
            <ShareButton
              onPress={handleSubmit(forgetFunction)}
              title={'Send Link'}
              style={styles.getStart}
            />
          </View>
        </KeyBoardWrapper>
      </View>
    </>
  );
};

export default ForgetPasswordScreen;
