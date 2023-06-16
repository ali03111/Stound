import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import {
    appleIcon,
    arrowback,
    facebookIcon,
    googleIcon,
    lock,
    sms,
} from '../../Assests';
import { InputComponent } from '../../Components/InputComponent';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import ShareButton from '../../Components/ShareButton';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { Colors } from '../../Theme/Variables';
import { styles } from './styles';
import useForgetPassword from './useForgetPassword';
import Header from '../../Components/Header';
import { wp } from '../../Config/responsive';

const ForgetPasswordScreen = ({ navigation }) => {
    const { handleSubmit,
        errors,
        reset,
        control,
        goBack,
        forgetFunction,
        getValues,
    } = useForgetPassword(navigation);
    return (

        <View style={styles.mainView}>
            <KeyBoardWrapper>
                <Header
                    headerTitle={'Forget Password'}
                    backText={'Back'}
                    arrowBackIcon={arrowback}
                    centerTextStyle={styles.centerText}
                    goBack={goBack}
                />
                <View style={{ marginHorizontal: wp('8') }}>

                    <TextComponent
                        text={'Forget Password'}
                        styles={styles.topHeading}
                    />
                    <TextComponent
                        numberOfLines={3}
                        text={
                            "Provide your account's email for which you want to reset your password."
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

                    {/* <View style={styles.appHeadingView}>
                <TextComponent
                    text={'Don’t have an account?'}
                    styles={styles.account}
                />
                <TextComponent
                    onPress={register}
                    text={'Sign Up'}
                    styles={{ color: Colors.primaryColor }}
                />
            </View>
            <TextComponent text={'Or'} styles={styles.or} />
            <View style={styles.signUpWith}>
                <TextComponent styles={styles.signUpBorder} />
                <TextComponent text={'sign up with'} styles={styles.signUpText} />
                <TextComponent styles={styles.signUpBorder} />
            </View>

            <View style={styles.mainSocialIcon}>
                <Touchable onPress={facebookLoginFunc}>
                    <Image source={facebookIcon} style={styles.socialIcon} />
                </Touchable>
                <Touchable onPress={appleIdAuth}>
                    <Image source={appleIcon} style={styles.socialIcon} />
                </Touchable>
                <Touchable onPress={googleLoginFunc}>
                    <Image source={googleIcon} style={styles.socialIcon} />
                </Touchable>
            </View> */}
                </View>

            </KeyBoardWrapper >
        </View >
    )

}

export default ForgetPasswordScreen
