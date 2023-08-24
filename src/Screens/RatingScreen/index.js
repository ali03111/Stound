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
import { imageUrl } from '../../Utils/Urls';
import BlurImage from '../../Components/BlurImage';

const RatingScreen = ({navigation}) => {
  const {goBack,openStore,userData} = useRatingScreen(navigation);
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
              numberOfLines={3}
              styles={styles.userEmail}
            />
             <View style={styles.profileTopImages}>
              <BlurImage
                blurhash={'L6PZfSi_.AyE_3t7t7R**0o#DgR4'}
                styles={styles.ProfileImage}
                uri={imageUrl(userData?.profilePicture)}
              />
              </View>
            <Image
              source={editProfileShadow}
              style={styles.ProfileImageShadow}
            />
          </View>
          <TextComponent text={userData?.name} styles={styles.userName} />
          {/* <Image source={stars} /> */}
        </View>
      </View>
      <View style={styles.saveBtnMain}>
        <ShareButton
          title={'Rate Us'}
          style={styles.saveBtn}
          onPress={openStore}
          textStyle={styles.rateBtnText}
        />
      </View>
    </View>
  );
};
export default memo(RatingScreen);
