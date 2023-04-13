import React, {useState} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {TextComponent} from './TextComponent';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';

const ChatComponent = ({image, name, description, time, messages}) => {
  return (
    <View style={styles.notificationMian}>
      <View style={styles.mainBannerImg}>
        <Image style={styles.bannerImg} resizeMode="contain" source={image} />
      </View>
      <View style={styles.nameDescriptionMain}>
        <TextComponent text={name} styles={styles.username} />
        <TextComponent text={description} styles={styles.description} />
      </View>
      <View style={styles.mainTime}>
        <TextComponent text={time} styles={styles.timing} />
        <TextComponent text={messages} styles={styles.messages(messages)} />
      </View>
      {/* <TextComponent text={item?.description} styles={styles.centerDes} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBannerImg: {
    // width: wp('18'),
    flex: 1,
  },
  nameDescriptionMain: {
    // width: wp('55'),
    flex: 3.5,
    marginLeft: hp('1'),
  },
  mainTime: {
    // width: wp('18'),
    flex: 1,
  },
  notificationMian: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#rgba(11, 180, 255, 0.1)',
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('3'),
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  bannerImg: {
    borderRadius: 50,
    width: wp('15'),
    height: hp('7.5'),
  },

  username: {
    fontWeight: 'bold',
    fontSize: hp('2'),
  },
  description: {
    fontSize: hp('1.8'),
  },

  timing: {
    fontSize: hp('1.5'),
    textAlign: 'right',
    color: 'rgba(41, 45, 50, 0.5)',
  },
  messages: messages => ({
    color: 'white',
    textAlign: 'center',
    backgroundColor: messages ? Colors.primaryColor : 'transparent',
    width: wp('5'),
    height: hp('2.5'),
    borderRadius: 10,
    fontSize: hp('1.5'),
    alignSelf: 'flex-end',
    marginTop: hp('1'),
  }),
  messageData: {},
});

export default ChatComponent;
