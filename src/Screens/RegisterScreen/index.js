import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import {
  appleIcon,
  arrowback,
  facebookIcon,
  googleIcon,
  lock,
  phoneIcon,
  sms,
  user,
} from '../../Assests';
import {InputComponent} from '../../Components/InputComponent';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import ShareButton from '../../Components/ShareButton';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
import {hp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';
import {styles} from './styles';
import useRegister from './useRegisterScreen';

const RegisterScreen = ({navigation}) => {
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
    registerWithEmail,
    goBack,
  } = useRegister(navigation);
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
          text={'Sign Up to your Account'}
          styles={styles.topHeading}
        />

        <InputComponent
          {...{
            name: 'name',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'User Name',
            viewStyle: styles.loginInput,
            isImage: user,
            defaultValue: 'user',
          }}
        />
        <InputComponent
          {...{
            name: 'email',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Email',
            viewStyle: styles.loginInput,
            isImage: sms,
            defaultValue: 'user100@gmail.com',
          }}
        />
        <InputComponent
          {...{
            name: 'number',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Phone Number',
            viewStyle: styles.loginInput,
            isImage: phoneIcon,
            defaultValue: '8623489263',
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
            defaultValue: 'Test@123',
          }}
        />
        <InputComponent
          {...{
            name: 'confirm_password',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Confirm Password',
            isSecure: true,
            isImage: lock,
            defaultValue: 'Test@123',
          }}
        />

        <ShareButton
          // onPress={loginWithEmail}
          onPress={handleSubmit(registerWithEmail)}
          title={'Sign Up'}
          style={styles.getStart}
        />

        <View style={styles.appHeadingView}>
          <TextComponent
            text={'Already have an account?'}
            styles={styles.account}
          />
          <TextComponent
            onPress={register}
            text={'Log In'}
            styles={{color: Colors.primaryColor}}
          />
        </View>
      </KeyBoardWrapper>
    </View>
  );
};

export default memo(RegisterScreen);
