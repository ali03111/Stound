import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import Header from '../../Components/Header';
import {
  editProfile,
  editProfileShadow,
  arrowbackwhite,
  logowhite,
  stars,
} from '../../Assests';
import {TextComponent} from '../../Components/TextComponent';
import ShareButton from '../../Components/ShareButton';
import useRatingScreen from './useRatingScreen';

const RatingScreen = ({navigation}) => {
  const {goBack} = useRatingScreen(navigation);
  return (
    <View style={styles.ratingMain}>
      <Header
        arrowBackIcon={arrowbackwhite}
        backText={'Back'}
        saveResetStyle={styles.save}
        backTextStyle={{color: 'white'}}
        goBack={goBack}
      />
      <View style={styles.editProfileContainer}>
        <View style={styles.porfileInfo}>
          <View style={styles.porfileTopImages}>
            <Image source={logowhite} style={styles.logo} />
            <TextComponent
              text={'Rate Your Experience'}
              styles={styles.rateHd}
            />
            <TextComponent
              text={
                'We work super hard to serve you best and would love to know how would you rate our app?'
              }
              styles={styles.userEmail}
            />
            <Image source={editProfile} style={styles.ProfileImage} />
            <Image
              source={editProfileShadow}
              style={styles.ProfileImageShadow}
            />
          </View>
          <TextComponent text={'Nabeel Naeem'} styles={styles.userName} />
          <Image source={stars} />
        </View>
      </View>
      <View style={styles.saveBtnMain}>
        <ShareButton
          title={'Rate Us'}
          style={styles.saveBtn}
          onPress={goBack}
          textStyle={styles.rateBtnText}
        />
      </View>
    </View>
  );
};
export default memo(RatingScreen);
