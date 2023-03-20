import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import ShareButton from '../../Components/ShareButton';
import {hp} from '../../Config/responsive';
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
// import {logo} from '../../Assests';

const SocialLoginScreen = ({navigation}) => {
  const {contWithEmail} = useSocialLoginScreen(navigation);
  return (
    <View style={styles.socialBtnMain}>
      <Image source={logo} style={styles.logo} />
      <ShareButton
        title={'Continue with Google'}
        image={googleIconWhite}
        style={{...styles.socialBtn, backgroundColor: Colors.redfaded}}
        onPress={''}
      />
      <ShareButton
        title={'Continue with Apple'}
        image={appleIconWhite}
        style={{...styles.socialBtn, backgroundColor: Colors.black}}
        onPress={''}
      />
      <ShareButton
        title={'Continue with Facebook'}
        image={facebookIconWhite}
        style={{...styles.socialBtn, backgroundColor: Colors.blue}}
        onPress={''}
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
