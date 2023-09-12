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

        // <svg width="414" height="85" viewBox="0 0 414 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        // <path d="M418.915 11.6217V73.1294C418.915 79.394 418.915 75.3485 418.915 84.5197H-7.08228C-7.08229 74.6516 -7.08227 79.394 -7.08227 73.1294V11.6217C-7.08227 5.35708 -1.95664 0.231445 4.30803 0.231445L153.635 23.012C158.988 23.012 163.658 26.6569 164.683 31.8965C168.784 50.9183 185.755 65.1562 205.916 65.1562C226.077 65.1562 243.049 50.9183 247.149 31.8965C248.288 26.6569 252.958 23.012 258.198 23.012L407.525 0.231445C413.789 0.231445 418.915 5.35708 418.915 11.6217Z" fill="#0BB4FF"/>
        // </svg>

        tabBarBackground: () => {
          return (
            <Svg
              width={wp('100')}
              // width={
              //   height <= 667
              //     ? wp(isIOS ? '100' : '100')
              //     : wp(isIOS ? '100' : '100')
              // }
              height={hp(isIOS ? '10' : '10')}
              viewBox={isIOS ? '0 0 394 78' : '0 0 414 85'}
              style={styles.barSvg}
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              {isIOS ? (
                <Path
                  d="M394 10.5562V87.4439C394 93.2381 389.259 97.9787 383.465 97.9787H10.5348C4.74064 97.9787 0 93.2381 0 87.4439V10.5562C0 4.76213 4.74064 0.0214844 10.5348 0.0214844L148.645 21.091C153.597 21.091 157.916 24.4621 158.864 29.3081C162.657 46.9012 178.353 60.0696 197 60.0696C215.647 60.0696 231.343 46.9012 235.136 29.3081C236.189 24.4621 240.509 21.091 245.355 21.091L383.465 0.0214844C389.259 0.0214844 394 4.76213 394 10.5562Z"
                  fill="#0BB4FF"
                />
              ) : (
                <Path
                  d="M418.915 11.6217V73.1294C418.915 79.394 418.915 75.3485 418.915 84.5197H-7.08228C-7.08229 74.6516 -7.08227 79.394 -7.08227 73.1294V11.6217C-7.08227 5.35708 -1.95664 0.231445 4.30803 0.231445L153.635 23.012C158.988 23.012 163.658 26.6569 164.683 31.8965C168.784 50.9183 185.755 65.1562 205.916 65.1562C226.077 65.1562 243.049 50.9183 247.149 31.8965C248.288 26.6569 252.958 23.012 258.198 23.012L407.525 0.231445C413.789 0.231445 418.915 5.35708 418.915 11.6217Z"
                  fill="#0BB4FF"
                />
              )}
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
                width={wp('15')}
                height={isIOS ? hp('6.2') : hp('6.2')}
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
    bottom: height <= 667 ? hp('1.5') : isIOS ? hp('-0.5') : hp('0.5 '),
  }),
  circleSvg: {
    position: 'absolute',
    zIndex: 1,
    bottom:
      height <= 667 ? (isIOS ? hp('2') : hp('2')) : isIOS ? hp('-1') : hp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  barSvg: {
    position: 'absolute',
    bottom: isIOS ? hp('0') : hp('-0.5'),
    zIndex: 1,
    alignSelf: 'center',
  },
});
