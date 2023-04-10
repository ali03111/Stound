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

const AccountScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Header headerTitle={'Account'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('6')}}>
        <View style={styles.accountMain}>
          <ProfileArea
            ProfileImage={accountprofile}
            ProfileName={'Jhon Doe'}
            UserEmail={'jhondoe@gmail.com'}
            EditProfile={EditProfile}
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
          />
          <ProfileButton
            title={'Log Out'}
            iconLeft={logout}
            style={styles.button}
            textStyle={styles.logOutText}
            leftImgStyle={styles.logOutIcon}
          />
          <ProfileButton
            title={'Deactivate Account'}
            iconLeft={profileremove}
            style={styles.button}
            textStyle={styles.deActivateAccText}
            leftImgStyle={styles.deActivateAccIcon}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(AccountScreen);
