import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { TextComponent } from './TextComponent';
import { hp, wp } from '../Config/responsive';
import { Colors } from '../Theme/Variables';
import moment from 'moment';
import BlurImage from './BlurImage';

const NotificationComp = ({ image, name, description, time, onPress }) => {
  const givenTime = new Date(time).getTime();
  const currentTime = new Date().getTime();
  const timeDifferenceMs = currentTime - givenTime;

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;

  const days = Math.floor(timeDifferenceMs / millisecondsPerDay);
  const hours = Math.floor((timeDifferenceMs % millisecondsPerDay) / millisecondsPerHour);
  const minutes = Math.floor((timeDifferenceMs % millisecondsPerHour) / millisecondsPerMinute);

  // Function to format the time string
  const formatTime = () => {
    if (timeDifferenceMs < 60 * 1000) {
      return 'Just now';
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.notificationMian}>
      <View style={styles.mainBannerImg}>
        <BlurImage styles={styles.profileImg} radius={50} uri={image} />
      </View>
      <View style={styles.nameDescriptionMain}>
        <Text style={styles.nameDescription}>
          <TextComponent text={name} styles={styles.username} />
          <TextComponent
            text={` ${description ?? ' interested'} your property and want to talk.`}
            styles={styles.description}
          />
        </Text>
      </View>
      <View style={styles.mainTiming}>
        <TextComponent text={formatTime()} styles={styles.timing} />
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
