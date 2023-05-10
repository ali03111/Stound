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
import {Touchable} from '../../Components/Touchable';
import {hp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';
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
            defaultValue: 'testing@gmail.com',
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
            defaultValue: 'i53rdgen@',
          }}
        />
        <TextComponent text={'Forget Password?'} styles={styles.forgetPass} />
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
            styles={{color: Colors.primaryColor}}
          />
        </View>
        <TextComponent text={'Or'} styles={styles.or} />
        <View style={styles.signUpWith}>
          <TextComponent styles={styles.signUpBorder} />
          <TextComponent text={'sign up with'} styles={styles.signUpText} />
          <TextComponent styles={styles.signUpBorder} />
        </View>

        <View style={styles.mainSocialIcon}>
          <Touchable>
            <Image source={facebookIcon} style={styles.socialIcon} />
          </Touchable>
          <Touchable>
            <Image source={appleIcon} style={styles.socialIcon} />
          </Touchable>
          <Touchable>
            <Image source={googleIcon} style={styles.socialIcon} />
          </Touchable>
        </View>
      </KeyBoardWrapper>
    </View>
  );
};

export default memo(LoginScreen);
