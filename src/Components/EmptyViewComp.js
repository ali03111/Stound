import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextComponent} from './TextComponent';
import {Touchable} from './Touchable';
import ThemeButtonComp from './ThemeButtonComp';

export const EmptyViewComp = ({onRefresh}) => {
  return (
    <View
      style={{
        width: wp('100'),
        height: hp('30'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
      }}>
      <Image
        source={require('../Assests/Icons/dataNotFound2.png')}
        resizeMode="contain"
        style={styles.dataNotFound}
      />
      <Image
        source={require('../Assests/Icons/clipboard-close.png')}
        resizeMode="contain"
        style={styles.noDataIcon}
      />
      <TextComponent
        text={'Data Not Found'}
        styles={{color: Colors.primaryColor, fontSIze: hp('3')}}
      />
      <TextComponent
        text={'No data, please try again later'}
        styles={styles.text}
      />
      <Image
        source={require('../Assests/Icons/dataNotFound1.png')}
        resizeMode="contain"
        style={styles.dataNotFoundTwo}
      />
      <ThemeButtonComp
        style={{
          backgroundColor: Colors.primaryColor,
          marginTop: hp('3'),
          width: wp('30'),
          height: hp('5'),
          borderRadius: 10,
        }}
        hide={true}
        title={'Refresh'}
        onPress={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dataNotFound: {
    width: wp('90'),
    height: hp('20'),
    alignSelf: 'flex-start',
  },
  dataNotFoundTwo: {
    width: wp('90'),
    alignSelf: 'flex-end',

    height: hp('20'),
    marginTop: hp('-5'),
  },
  noDataIcon: {
    alignSelf: 'center',
    width: wp('30'),
    height: hp('15'),
    marginTop: hp('-3'),
  },
  heading: {
    fontSize: hp('2'),
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginTop: hp('1'),
  },
  text: {
    fontSize: hp('1.8'),
    color: 'gray',
    textAlign: 'center',
    marginTop: hp('1'),
  },
  btnSt: {
    backgroundColor: Colors.primaryColor,
    marginTop: hp('5'),
    width: wp('50'),
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: hp('-5'),
  },
});
