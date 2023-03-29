import React, {useState} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {TextComponent} from './TextComponent';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';

const NotificationComp = ({image, name, description, time}) => {
  const [selectedId, setSelectedId] = useState();

  return (
    <View style={styles.notificationMian}>
      <View style={styles.mainBannerImg}>
        <Image style={styles.bannerImg} resizeMode="contain" source={image} />
      </View>
      <View style={styles.nameDescriptionMain}>
        <Text style={styles.nameDescription}>
          <TextComponent text={name} styles={styles.username} />
          <TextComponent text={' '} />
          <TextComponent text={description} styles={styles.description} />
        </Text>
      </View>
      <View style={styles.mainTiming}>
        <TextComponent text={time} styles={styles.timing} />
      </View>
      {/* <TextComponent text={item?.description} styles={styles.centerDes} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBannerImg: {
    width: wp('13'),
  },
  notificationMian: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    paddingVertical: hp('2.7'),
    alignItems: 'center',
  },
  bannerImg: {
    borderRadius: 50,
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
  },
  mainTiming: {
    width: wp('24'),
  },
  timing: {
    fontSize: hp('1.7'),
    textAlign: 'right',
    color: 'rgba(41, 45, 50, 0.5)',
  },
});

export default NotificationComp;
