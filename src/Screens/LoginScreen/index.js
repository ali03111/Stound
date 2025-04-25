import React, {memo, useCallback} from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {
  appleIcon,
  appleIconWhite,
  arrowback,
  facebookIcon,
  facebookIconWhite,
  googleIcon,
  googleIconWhite,
  lock,
  sms,
} from '../../Assets';
import {InputComponent} from '../../Components/InputComponent';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import ShareButton from '../../Components/ShareButton';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
import {hp} from '../../Config/responsive';
import {Colors, FontFamily, FontSize} from '../../Theme/Variables';
import {styles} from './styles';
import useLogin from './useLoginScreen';

const LoginScreen = ({navigation}) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    facebookLoginFunc,
    googleLoginFunc,
    PhoneNumberLoginFuc,
    register,
    loginWithEmail,
    goBack,
    appleIdAuth,
    navigationForgetScreen,
  } = useLogin(navigation);

  return (
    <View style={styles.mainView}>
      <KeyBoardWrapper>
        <Touchable style={styles.backMain} onPress={goBack}>
          <Image
            source={arrowback}
            style={{
              resizeMode: 'contain',
              style: styles.arrowBack,
            }}
          />
          <TextComponent text={'Back'} styles={styles.backBtn} />
        </Touchable>
        <TextComponent
          text={'Log In to your Account'}
          styles={styles.topHeading}
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
            defaultValue: __DEV__ ? 'l1@mailinator.com' : '',
          }}
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
            isSecure: true,
            isImage: lock,
            defaultValue: __DEV__ ? 'Test@123' : '',
          }}
        />
        <TextComponent
          onPress={navigationForgetScreen}
          text={'Forgot Password?'}
          styles={styles.forgetPass}
        />
        <ShareButton
          onPress={handleSubmit(loginWithEmail)}
          title={'Log In'}
          style={styles.getStart}
        />

        <View style={styles.appHeadingView}>
          <TextComponent
            text={'Don’t have an account?'}
            styles={styles.account}
          />
          <TextComponent
            onPress={register}
            text={'Sign Up'}
            styles={{
              color: Colors.primaryColor,
              fontFamily: FontFamily.semiBold,
              fontSize: FontSize.scale16,
              textDecorationLine: 'underline',
            }}
          />
        </View>
        <TextComponent text={'Or'} styles={styles.or} />
        <View style={styles.signUpWith}>
          <TextComponent styles={styles.signUpBorder} />
          <TextComponent text={'sign up with'} styles={styles.signUpText} />
          <TextComponent styles={styles.signUpBorder} />
        </View>
        {Platform.OS === 'ios' && (
          <ShareButton
            title={'Continue with Apple'}
            image={appleIconWhite}
            onPress={appleIdAuth}
            style={{...styles.socialBtn, backgroundColor: Colors.black}}
          />
        )}
        <ShareButton
          title={'Continue with Google'}
          image={googleIconWhite}
          onPress={googleLoginFunc}
          style={{...styles.socialBtn, backgroundColor: Colors.redfaded}}
        />
        <ShareButton
          title={'Continue with Facebook'}
          image={facebookIconWhite}
          onPress={facebookLoginFunc}
          style={{...styles.socialBtn, backgroundColor: Colors.blue}}
        />
        {/* <View style={styles.mainSocialIcon}>
          <Touchable onPress={facebookLoginFunc}>
            <Image source={facebookIcon} style={styles.socialIcon} />
          </Touchable>
          {Platform.OS === 'ios' ? (
            <Touchable onPress={appleIdAuth}>
              <Image source={appleIcon} style={styles.socialIcon} />
            </Touchable>
          ) : null}
          <Touchable onPress={googleLoginFunc}>
            <Image source={googleIcon} style={styles.socialIcon} />
          </Touchable>
        </View> */}
      </KeyBoardWrapper>
    </View>
  );
};

export default memo(LoginScreen);
