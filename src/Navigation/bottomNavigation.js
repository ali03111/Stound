import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Platform, Dimensions, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Screens from '../Screens/index';
import {Colors, FontFamily} from '../Theme/Variables';
import {hp, wp} from '../Config/responsive';
import {TextComponent} from '../Components/TextComponent';

globalStyles = {};

const colorFocused = focused => {
  return focused ? Colors.primaryColor : Colors.white;
};

const tabarComponent = (iconName, title, last) => {
  return {
    tabBarIcon: ({focused, color, size}) => (
      <View style={styles.tabarView(focused, last)}>
        <Ionicons
          name={focused ? iconName : `${iconName}-outline`}
          color={colorFocused(focused)}
          size={hp('2')}
        />
        {focused && (
          <TextComponent
            text={title}
            styles={{
              color: Colors.primaryColor,
              fontSize: hp('1.5'),
              // fontFamily: FontFamily.light,
            }}
          />
        )}
      </View>
    ),
    title: '',
    tabBarLabelStyle: styles.tabarTitle,
  };
};

const Tab = createBottomTabNavigator();
function MybottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: 'transparent',
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.primaryColor,
        tabBarInactiveBackgroundColor: Colors.primaryColor,
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarAllowFontScaling: true,
        tabBarItemStyle: {
          width: 'auto',
        },
        tabBarStyle: {
          height: hp('6'),
          paddingBottom: hp('0'),
          bottom: Platform.OS == 'ios' ? hp('4') : hp('2'),
          width: wp('95'),
          alignSelf: 'center',
          borderRadius: Platform.OS == 'android' ? 10 : 10,
          overflow: 'hidden',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={tabarComponent('home', 'Home')}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name="FavourateScreen"
        options={tabarComponent('heart', 'Favourite')}
        component={Screens.FavourateScreen}
      />
      <Tab.Screen
        name="MessageScreen"
        options={tabarComponent('chatbox-ellipses', 'Message')}
        component={Screens.MessageScreen}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={tabarComponent('person', 'Profile', true)}
        component={Screens.ProfileScreen}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;

const styles = StyleSheet.create({
  cartCircle: {
    backgroundColor: Colors.textSecondaryColor,
    position: 'absolute',
    bottom: hp('-2'),
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.18,
    height: Dimensions.get('screen').width * 0.18,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cartInsideCircle: {
    backgroundColor: Colors.textSecondaryColor,
    position: 'absolute',
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.15,
    height: Dimensions.get('screen').width * 0.15,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp('1.5'),
    backgroundColor: Colors.badgeColor,
  },
  tabarTitle: {
    display: 'none',
  },
  tabarView: (focused, last) => ({
    width: focused ? wp('22') : 'auto',
    backgroundColor: focused ? Colors.white : 'transparent',
    height: focused ? hp('4') : 'auto',
    borderRadius: focused ? 10 : 0,
    marginLeft: focused && !last ? wp('2') : 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2'),
    justifyContent: 'center',
  }),
});
