import React, {memo, useCallback, useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import useEditProfileScreen from './useRatingScreen';
import {styles} from './styles';
import Header from '../../Components/Header';
import {
  arrowback,
  calendar,
  editProfile,
  editProfileShadow,
  phoneIcon,
  user,
  UploadProfileImage,
  arrowbackwhite,
  logo,
  logowhite,
  stars,
} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import {TextComponent} from '../../Components/TextComponent';
import {InputComponent} from '../../Components/InputComponent';
import ShareButton from '../../Components/ShareButton';
import {goBack} from '../../Utils';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Touchable} from '../../Components/Touchable';
const RatingScreen = () => {
  return (
    <View style={styles.ratingMain}>
      <Header
        arrowBackIcon={arrowbackwhite}
        backText={'Back'}
        // style={styles.filterHeader}
        saveResetStyle={styles.save}
        backTextStyle={{color: 'white'}}
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
