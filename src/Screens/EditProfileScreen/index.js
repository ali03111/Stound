import React, {memo, useCallback, useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import useEditProfileScreen from './useEditProfileScreen';
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
} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import ProfileButton from '../../Components/ProfileButton';
import {TextComponent} from '../../Components/TextComponent';
import {InputComponent} from '../../Components/InputComponent';
import ShareButton from '../../Components/ShareButton';
import {goBack} from '../../Utils';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Touchable} from '../../Components/Touchable';
const EditProfileScreen = () => {
  const {handleSubmit, errors, reset, control, getValues} =
    useEditProfileScreen();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  return (
    <View style={{flex: 1}}>
      <Header
        headerTitle={'Edit Profile'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        // style={styles.filterHeader}
        saveResetStyle={styles.save}
      />
      <View style={styles.editProfileContainer}>
        <KeyBoardWrapper>
          <View style={styles.porfileInfo}>
            <View style={styles.porfileTopImages}>
              <Image source={editProfile} style={styles.ProfileImage} />
              <Image
                source={editProfileShadow}
                style={styles.ProfileImageShadow}
              />
              <View style={styles.UploadProfile}>
                <Image
                  source={UploadProfileImage}
                  style={styles.UploadProfileIcon}
                />
              </View>
            </View>
            <TextComponent text={'Nabeel Naeem'} styles={styles.userName} />
            <TextComponent
              text={'nabeelnaeem@mail.com'}
              styles={styles.userEmail}
            />
          </View>

          <InputComponent
            {...{
              name: 'name',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              viewStyle: styles.loginInput,
              isImage: user,
              defaultValue: 'Nabeel Naeem',
            }}
          />
          <View>
            <View style={styles.datePickerBtn}>
              <Image source={calendar} style={styles.calenderImg} />
              <Touchable
                title="20 - 07 - 1995"
                onPress={showDatePicker}
                style={styles.datePickerBtnInner}>
                <Text style={styles.date}>20 - 07 - 1995</Text>
              </Touchable>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <InputComponent
            {...{
              name: 'number',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              viewStyle: styles.loginInput,
              isImage: phoneIcon,
              defaultValue: '800-716-9002',
            }}
          />
        </KeyBoardWrapper>
      </View>
      <View style={styles.saveBtnMain}>
        <ShareButton title={'Save'} style={styles.saveBtn} onPress={goBack} />
      </View>
    </View>
  );
};
export default memo(EditProfileScreen);
