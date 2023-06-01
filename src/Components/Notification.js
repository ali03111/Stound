import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Touchable, TouchableOpacity } from 'react-native';
import { TextComponent } from './TextComponent';
import { hp, wp } from '../Config/responsive';
import { Colors } from '../Theme/Variables';

const NotificationComp = ({ image, name, description, time, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.notificationMian}>
      <View style={styles.mainBannerImg}>
        <Image style={styles.bannerImg} resizeMode="contain" source={{ uri: image }} />
      </View>
      <View style={styles.nameDescriptionMain}>
        <Text style={styles.nameDescription}>
          <TextComponent text={name} styles={styles.username} />
          <TextComponent text={' Interested IN'} />
          <TextComponent text={' your property and want to talk. '} styles={styles.description} />
        </Text>
      </View>
      <View style={styles.mainTiming}>
        <TextComponent text={time} styles={styles.timing} />
      </View>
      {/* <TextComponent text={item?.description} styles={styles.centerDes} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBannerImg: {
    width: wp('16'),
    alignItems: 'center',
    resizeMode: 'contain'

  },
  notificationMian: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    paddingVertical: hp('1.5'),
    alignItems: 'center',
  },
  bannerImg: {
    borderRadius: 50,
    height: hp('6'),
    aspectRatio: 1,
    backgroundColor: 'gray'
  },
  nameDescriptionMain: {
    width: wp('55'),
  },
  nameDescription: {
    flexDirection: 'row',
    width: wp('55'),
  },
  username: {
    fontWeight: 'bold',
    fontSize: hp('2'),
  },
  description: {
    fontSize: hp('1.8'),
  },
  mainTiming: {
    width: wp('23'),
  },
  timing: {
    fontSize: hp('1.5'),
    textAlign: 'right',
    color: 'rgba(41, 45, 50, 0.5)',
  },
});

export default NotificationComp;
