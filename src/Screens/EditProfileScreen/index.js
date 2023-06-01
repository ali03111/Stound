import React, { memo } from 'react';
import { View, Text, Image, Button } from 'react-native';
import useEditProfileScreen from './useEditProfileScreen';
import { styles } from './styles';
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
import { TextComponent } from '../../Components/TextComponent';
import { InputComponent } from '../../Components/InputComponent';
import ShareButton from '../../Components/ShareButton';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Touchable } from '../../Components/Touchable';
import BlurImage from '../../Components/BlurImage';
import { imageUrl } from '../../Utils/Urls';

const EditProfileScreen = ({ navigation }) => {
  const {
    control,
    errors,
    isDatePickerVisible,
    goBack,
    userData,
    images,
    updateProfile,
    uploadFromGalary,
    reset,
    handleSubmit,
    getValues,
    hideDatePicker,
    showDatePicker,
    handleConfirm,
  } = useEditProfileScreen(navigation);

  return (
    <View style={{ flex: 1 }}>
      <Header
        headerTitle={'Edit Profile'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        goBack={goBack}
        // style={styles.filterHeader}
        saveResetStyle={styles.save}
      />
      <View style={styles.editProfileContainer}>
        <KeyBoardWrapper>
          <View style={styles.porfileInfo}>
            <View style={styles.porfileTopImages}>
              <BlurImage
                styles={styles.ProfileImage}
                uri={
                  imageUrl(userData.profilePicture) ||
                  images?.uri ||
                  "https://res.cloudinary.com/dd6tdswt5/image/upload/v1684830799/UserImages/mhysa2zj0sbmvnw69b35.jpg"
                }
              />
              <Image
                source={editProfileShadow}
                style={styles.ProfileImageShadow}
              />
              <Touchable
                onPress={uploadFromGalary}
                style={styles.UploadProfile}>
                <Image
                  source={UploadProfileImage}
                  style={styles.UploadProfileIcon}
                />
              </Touchable>
            </View>
            <TextComponent
              text={userData?.name ?? 'Nabeel Naeem'}
              styles={styles.userName}
            />
            <TextComponent text={userData?.email} styles={styles.userEmail} />
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
              defaultValue: userData?.name ?? 'Nabeel Naeem',
            }}
          />
          {/* <View>
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
          </View> */}
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
              defaultValue: userData?.number ?? '800-716-9002',
            }}
          />
        </KeyBoardWrapper>
      </View>
      <View style={styles.saveBtnMain}>
        <ShareButton
          title={'Save'}
          style={styles.saveBtn}
          onPress={handleSubmit(updateProfile)}
        />
      </View>
    </View>
  );
};
export default memo(EditProfileScreen);
