import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {TextComponent} from './TextComponent';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import {CircleImageComp} from './CircleImageComp';
import {Touchable} from './Touchable';
import BlurImage from './BlurImage';
import moment from 'moment';
const ChatComponent = ({image, name, description, time, messages, onPress}) => {
  const givenTime = time;
  const currentTime = moment();
  const diff = moment.duration(currentTime.diff(moment(givenTime)));

  const minutes = diff.minutes();
  const hours = diff.hours();
  const days = diff.days();
  return (
    <Touchable style={styles.notificationMian} onPress={onPress}>
      <View style={styles.mainBannerImg}>
        {/* <CircleImageComp image={image} /> */}
        <BlurImage styles={styles.profileImg} radius={50} uri={image} />
        {/* <CircleImageComp styles={styles.bannerImg}  image={image} /> */}
      </View>
      <View style={styles.nameDescriptionMain}>
        <TextComponent text={name} styles={styles.username} />
        <TextComponent text={description} styles={styles.description} />
      </View>
      <View style={styles.mainTime}>
        {/* <TextComponent text={time} styles={styles.timing} /> */}
        <TextComponent
          text={
            days > 0 ? (
              <Text>{days} day ago</Text>
            ) : hours > 0 ? (
              <Text>{hours} hour ago</Text>
            ) : (
              <Text>{minutes} min ago</Text>
            )
          }
          styles={styles.timing}
        />
        <View style={styles.messageView(messages)}>
          <TextComponent text={messages} styles={styles.messages} />
        </View>
      </View>
      {/* <TextComponent text={item?.description} styles={styles.centerDes} /> */}
    </Touchable>
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
    fontSize: Platform.OS == 'ios' ? hp('1.5') : hp('1.8'),
  },

  timing: {
    fontSize: hp('1.5'),
    textAlign: 'right',
    color: 'rgba(41, 45, 50, 0.5)',
  },
  messageView: messages => ({
    color: 'white',
    textAlign: 'center',
    backgroundColor: messages ? Colors.primaryColor : 'transparent',
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('screen').width * 0.05,
    height: Dimensions.get('screen').width * 0.05,
    fontSize: hp('1.5'),
    alignSelf: 'flex-end',
    marginTop: hp('1'),
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVerticaly: 'center',
  }),
  messages: {
    fontSize: hp('1.5'),
    color: 'white',
  },
  profileImg: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
  },
});

export default ChatComponent;
