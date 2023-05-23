import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import useAccountScreen from './useAccountScreen';
import {styles} from './styles';
import {AccountProfile} from '../../Assests';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
import {imageUrl} from '../../Utils/Urls';
import BlurImage from '../../Components/BlurImage';
const ProfileArea = ({
  ProfileImage,
  ProfileName,
  UserEmail,
  EditProfile,
  onPress,
  userData,
}) => {
  return (
    <View style={styles.porfileContainer}>
      <BlurImage
        styles={styles.porfileImg}
        uri={
          imageUrl(userData.profilePicture) ||
          'https://res.cloudinary.com/dd6tdswt5/image/upload/v1684830799/UserImages/mhysa2zj0sbmvnw69b35.jpg'
        }
      />
      {/* <Image
        source={{
          uri:
            imageUrl(userData.profilePicture) ||
            'https://res.cloudinary.com/dd6tdswt5/image/upload/v1684830799/UserImages/mhysa2zj0sbmvnw69b35.jpg',
        }}
        style={styles.porfileImg}
      /> */}
      <View style={styles.porfileInfo}>
        <TextComponent text={ProfileName} styles={styles.userName} />
        <TextComponent text={UserEmail} styles={styles.userEmail} />
      </View>
      <Touchable onPress={onPress} style={styles.editPorfile}>
        <Image source={EditProfile} style={styles.editPorfileImage} />
      </Touchable>
    </View>
  );
};

export default ProfileArea;
