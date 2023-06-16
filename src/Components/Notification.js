import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TextComponent} from './TextComponent';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import moment from 'moment';
import BlurImage from './BlurImage';

const NotificationComp = ({image, name, description, time, onPress}) => {
  // const givenTime = time;
  // const currentTime = moment();
  // const diffInMinutes = currentTime.diff(moment(givenTime), 'minutes');

  const givenTime = time;
  const currentTime = moment();
  const diff = moment.duration(currentTime.diff(moment(givenTime)));

  const minutes = diff.minutes();
  const hours = diff.hours();
  const days = diff.days();
  return (
    <TouchableOpacity onPress={onPress} style={styles.notificationMian}>
      <View style={styles.mainBannerImg}>
        {/* <Image style={styles.bannerImg} resizeMode="contain" source={{ uri: image }} /> */}
        <BlurImage styles={styles.profileImg} radius={50} uri={image} />
      </View>
      <View style={styles.nameDescriptionMain}>
        <Text style={styles.nameDescription}>
          <TextComponent text={name} styles={styles.username} />
          {/* <TextComponent text={` ${ans}`} /> */}
          <TextComponent
            text={` ${
              description ?? ' interested'
            } your property and want to talk.`}
            styles={styles.description}
          />
        </Text>
      </View>
      <View style={styles.mainTiming}>
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

        {/* <TextComponent text=
           {days > 0 && <Text>{days} day(s) ago</Text>}
           {hours > 0 && <Text>{hours} hour(s) ago</Text>}
           {minutes > 0 && <Text>{minutes} minute(s) ago</Text>}
        styles={styles.timing} /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBannerImg: {
    width: wp('16'),
    alignItems: 'center',
    resizeMode: 'contain',
  },
  notificationMian: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    paddingVertical: hp('1.5'),
    alignItems: 'center',
  },
  profileImg: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
  },
  nameDescriptionMain: {
    width: wp('55'),
  },
  nameDescription: {
    flexDirection: 'row',
    width: wp('55'),
    marginLeft: wp('1.5'),
  },
  username: {
    fontWeight: 'bold',
    fontSize: hp('2'),
    marginLeft: wp('2.5'),
  },
  description: {
    fontSize: hp('1.8'),
    marginLeft: wp('1.5'),
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
