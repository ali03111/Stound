import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import useAccountScreen from './useAccountScreen';
import {styles} from './styles';
import {AccountProfile} from '../../Assests';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
const ProfileArea = ({
  ProfileImage,
  ProfileName,
  UserEmail,
  EditProfile,
  onPress,
}) => {
  return (
    <View style={styles.porfileContainer}>
      <Image source={ProfileImage} style={styles.porfileImg} />
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
