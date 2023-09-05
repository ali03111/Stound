import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screens from '../Screens/index';
import useReduxStore from '../Hooks/UseReduxStore';
import MybottomTabs from './bottomNavigation';

import {withIAPContext} from 'react-native-iap';

const Stack = createNativeStackNavigator();
export const screens = [
  {
    name: 'Subscriptions',
    title: 'Subscriptions',
    component: withIAPContext(Screens.Subscriptions),
    section: 'Context',
    color: '#cebf38',
  },
  // {
  //   name: 'BuyCoinScreen',
  //   // title: 'BuyCoinScreen',
  //   component: withIAPContext(Screens.BuyCoinScreen),
  //   section: 'Context',
  //   color: '#cebf38',
  // },
  {
    name: 'Home',
    component: Screens.Home,
    section: 'Context',
    color: '#cebf38',
  },
];
const StackNavigatior = () => {
  const {getState} = useReduxStore();
  const {onboarding} = getState('onboarding');
  const {isLogin} = getState('Auth');
  // console.log('AIUth token', token);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: null,
        headerShown: false,
        orientation: 'portrait',
      }}>
      {!onboarding && (
        <Stack.Screen name="OnboardScreen" component={Screens.OnboardScreen} />
      )}
      {!isLogin && (
        <>
          <Stack.Screen
            name="SocialLoginScreen"
            component={Screens.SocialLoginScreen}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={Screens.RegisterScreen}
          />
          <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
          <Stack.Screen
            name="ForgetPasswordScreen"
            component={Screens.ForgetPasswordScreen}
          />
        </>
      )}
      {isLogin && (
        <>
          <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
          <Stack.Screen name="ChatScreen" component={Screens.ChatScreen} />
          <Stack.Screen
            name="MessagesScreen"
            component={Screens.MessagesScreen}
          />
          <Stack.Screen name="RatingScreen" component={Screens.RatingScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={Screens.ResetPasswordScreen}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={Screens.EditProfileScreen}
          />
          <Stack.Screen
            name="AccountScreen"
            component={Screens.AccountScreen}
          />
          <Stack.Screen name="FilterScreen" component={Screens.FilterScreen} />
          <Stack.Screen
            name="LocationScreen"
            component={Screens.LocationScreen}
          />

          <Stack.Screen
            name="GeneralScreen"
            component={Screens.GeneralScreen}
          />
          <Stack.Screen
            name="SomeComponent"
            component={Screens.SomeComponent}
          />
          <Stack.Screen
            options={{
              animation: 'fade_from_bottom',
              animationTypeForReplace: 'pop',
            }}
            name="PackageDetailsScreen"
            component={Screens.PackageDetailsScreen}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={Screens.NotificationScreen}
          />
          <Stack.Screen
            name="BuyCoinScreen"
            component={withIAPContext(Screens.BuyCoinScreen)}
          />
          <Stack.Screen
            name="HeaderDetailScreen"
            component={Screens.HeaderDetailScreen}
          />
          <Stack.Screen
            name="FilterPackageScreen"
            component={Screens.FilterPackageScreen}
          />
          <Stack.Screen
            name="SubscriptionsScreen"
            component={Screens.Subscriptions}
          />
          {screens.map(({name, component, title}) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              //hide the header on these screens
              options={{
                title: title,
                headerShown:
                  name === 'Home' || name === 'Subscriptions' ? false : true,
              }}
            />
          ))}
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigatior;
