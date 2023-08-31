import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Platform, Dimensions, StyleSheet} from 'react-native';
import * as Screens from '../Screens/index';
import {Colors} from '../Theme/Variables';
import {hp, wp} from '../Config/responsive';
import Svg, {Path} from 'react-native-svg';

globalStyles = {};

// Get the screen dimensions
export const {width, height} = Dimensions.get('window');

// Usage example
console.log(Platform.OS, 'Screen Width:', width);
console.log('Screen Height:', height);
const isIOS = Boolean(Platform.OS == 'ios');
const tabarComponent = (iconName, title, last) => {
  return {
    tabBarIcon: ({focused, color, size}) => (
      <View style={styles.tabarView(focused, last)}>
        <Ionicons
          name={focused ? iconName : `${iconName}-outline`}
          color={Colors.white}
          size={hp('3')}
        />
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
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarAllowFontScaling: true,
        tabBarItemStyle: {
          width: 'auto',
        },
        tabBarStyle: {
          height: height < 852 ? hp('6.5') : hp('7.5'),
          borderTopWidth: 0,
          width: wp('95'),
          alignSelf: 'center',
          backgroundColor: 'transparent',
          backfaceVisibility: 'hidden',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => {
          return (
            <Svg
              width={
                height <= 667
                  ? wp(isIOS ? '90' : '100')
                  : wp(isIOS ? '90' : '100')
              }
              height={hp('10')}
              viewBox="0 0 374 74"
              fill="none"
              style={styles.barSvg}
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M374 10V64C374 69.5 369.5 74 364 74H10C4.5 74 0 69.5 0 64V10C0 4.5 4.5 0 10 0L141.1 20C145.8 20 149.9 23.2 150.8 27.8C154.4 44.5 169.3 57 187 57C204.7 57 219.6 44.5 223.2 27.8C224.2 23.2 228.3 20 232.9 20L364 0C369.5 0 374 4.5 374 10Z"
                fill="#0BB4FF"
              />
            </Svg>
          );
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={tabarComponent('home', 'Home')}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name="FavourateScreen"
        options={tabarComponent('heart', 'Favourite', 0)}
        component={Screens.FavourateScreen}
      />
      <Tab.Screen
        name="SomeComponent"
        options={{
          tabBarIcon: () => {
            return (
              <Svg
                width={wp('50')}
                height={isIOS ? hp('6') : hp('7.5')}
                viewBox="0 0 54 54"
                style={styles.circleSvg}
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54Z"
                  fill="#0BB4FF"
                />
                <Path
                  d="M21 27H33"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M27 33V21"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            );
          },
          title: '',
        }}
        component={Screens.AddPostScreen}
      />
      <Tab.Screen
        name="ChatScreen"
        options={tabarComponent('chatbox-ellipses', 'Message', 1)}
        component={Screens.ChatScreen}
      />
      <Tab.Screen
        name="AccountScreen"
        options={tabarComponent('person', 'Profile')}
        component={Screens.AccountScreen}
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
    width: 'auto',
    backgroundColor: 'transparent',
    bottom: height <= 667 ? hp('1.5') : hp('-0.5'),
  }),
  circleSvg: {
    position: 'absolute',
    zIndex: 1,
    // bottom: isIOS ? hp('-0.6') : hp('2'),
    bottom:
      height <= 667 ? (isIOS ? hp('2') : hp('2')) : isIOS ? hp('-0.4') : hp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  barSvg: {
    position: 'absolute',
    bottom: isIOS ? hp('1') : hp('0.5'),
    zIndex: 1,
    alignSelf: 'center',
  },
});
