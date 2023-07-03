import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Text, ScrollView, SafeAreaView} from 'react-native';
import useFavourateScreen from './useAccountScreen';
import {styles} from './styles';
import Header from '../../Components/Header';
import {
  AccountProfile,
  EditProfile,
  accountprofile,
  arrowRight,
  information,
  lock,
  logout,
  profileremove,
  receiptsearch,
  star,
  tasksquare,
} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import ProfileButton from '../../Components/ProfileButton';
import ProfileArea from './ProfileComponent';
import CoinsComponent from './CoinsComponent';
import {hp} from '../../Config/responsive';
import useAccountScreen from './useAccountScreen';

import {AlertDesign} from '../../Components/AlertDesign';
import {imageUrl} from '../../Utils/Urls';
const AccountScreen = ({navigation}) => {
  const {dynamicNav, deactivate, logOut, onCancel, onConfirm, userData} =
    useAccountScreen(navigation);
  return (
    <View style={{flex: 1}}>
      <Header headerTitle={'Account'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('6')}}>
        <View style={styles.accountMain}>
          <ProfileArea
            ProfileImage={imageUrl(userData?.profilePicture)}
            // ProfileImage={images?.uri || imageUrl(userData.profilePicture)}
            ProfileName={userData?.name ?? 'Jhon Doe'}
            UserEmail={userData?.email}
            EditProfile={EditProfile}
            onPress={() => dynamicNav('EditProfileScreen')}
            userData={userData}
          />
          <CoinsComponent RemainingCoins={'25'} />
          <ProfileButton
            title={'My Profile'}
            iconLeft={AccountProfile}
            iconRight={arrowRight}
            style={styles.button}
            textStyle={styles.buttonText}
            leftImgStyle={styles.iconLeft}
            rightImgStyle={styles.iconRight}
          />
          <ProfileButton
            title={'Change Password'}
            iconLeft={lock}
            iconRight={arrowRight}
            style={styles.button}
            textStyle={styles.buttonText}
            leftImgStyle={styles.iconLeft}
            rightImgStyle={styles.iconRight}
            onPress={() => dynamicNav('ResetPasswordScreen')}
          />
          <ProfileButton
            title={'About Stound'}
            iconLeft={information}
            iconRight={arrowRight}
            style={styles.button}
            textStyle={styles.buttonText}
            leftImgStyle={styles.iconLeft}
            rightImgStyle={styles.iconRight}
          />
          <ProfileButton
            title={'Privacy Policy'}
            iconLeft={receiptsearch}
            iconRight={arrowRight}
            style={styles.button}
            textStyle={styles.buttonText}
            leftImgStyle={styles.iconLeft}
            rightImgStyle={styles.iconRight}
          />
          <ProfileButton
            title={'Terms and Conditions'}
            iconLeft={tasksquare}
            iconRight={arrowRight}
            style={styles.button}
            textStyle={styles.buttonText}
            leftImgStyle={styles.iconLeft}
            rightImgStyle={styles.iconRight}
          />
          <ProfileButton
            title={'Rate Us'}
            iconLeft={star}
            iconRight={arrowRight}
            style={styles.button}
            textStyle={styles.buttonText}
            leftImgStyle={styles.iconLeft}
            rightImgStyle={styles.iconRight}
            onPress={() => dynamicNav('RatingScreen')}
          />
          <ProfileButton
            title={'Log Out'}
            iconLeft={logout}
            style={styles.button}
            textStyle={styles.logOutText}
            leftImgStyle={styles.logOutIcon}
            onPress={() => onCancel(logOut, 'logOut')}
          />
          <ProfileButton
            title={'Delete Account'}
            iconLeft={profileremove}
            style={styles.button}
            textStyle={styles.deActivateAccText}
            leftImgStyle={styles.deActivateAccIcon}
            onPress={() => onCancel(deactivate, 'deactivate')}
          />

          <AlertDesign
            isVisible={logOut}
            title="Log Out?"
            message="Are you sure, you want to log out ?"
            confirmText="Log Out"
            onCancel={() => onCancel(logOut, 'logOut')}
            onConfirm={() => onConfirm(logOut)}
          />
          <AlertDesign
            isVisible={deactivate}
            title="Delete Account?"
            message="You’ll permanently lose all your data."
            confirmText="Deactivate"
            onCancel={() => onCancel(deactivate, 'deactivate')}
            onConfirm={() => onConfirm(deactivate)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(AccountScreen);
