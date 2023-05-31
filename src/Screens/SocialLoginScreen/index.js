import React, {memo} from 'react';
import {View, Image} from 'react-native';
import ShareButton from '../../Components/ShareButton';
import {Colors} from '../../Theme/Variables';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import {
  appleIconWhite,
  facebookIconWhite,
  googleIconWhite,
  smsWhite,
  logo,
} from '../../Assests';
import useSocialLoginScreen from './useSocialLoginScreen';

const SocialLoginScreen = ({navigation}) => {
  const {contWithEmail, appleIdAuth, googleAuth, facebookAuth} =
    useSocialLoginScreen(navigation);
  return (
    <View style={styles.socialBtnMain}>
      <Image source={logo} style={styles.logo} />
      <ShareButton
        title={'Continue with Google'}
        image={googleIconWhite}
        onPress={googleAuth}
        style={{...styles.socialBtn, backgroundColor: Colors.redfaded}}
      />
      <ShareButton
        title={'Continue with Apple'}
        image={appleIconWhite}
        onPress={appleIdAuth}
        style={{...styles.socialBtn, backgroundColor: Colors.black}}
      />
      <ShareButton
        title={'Continue with Facebook'}
        image={facebookIconWhite}
        onPress={facebookAuth}
        style={{...styles.socialBtn, backgroundColor: Colors.blue}}
      />
      <View style={styles.barMain}>
        <TextComponent styles={styles.barBorder} />
        <TextComponent text={'or'} styles={styles.barText} />
        <TextComponent styles={styles.barBorder} />
      </View>
      <ShareButton
        title={'Sign up with email'}
        image={smsWhite}
        style={{...styles.emailBtn, backgroundColor: Colors.primaryColor}}
        onPress={contWithEmail}
      />
    </View>
  );
};

export default memo(SocialLoginScreen);
