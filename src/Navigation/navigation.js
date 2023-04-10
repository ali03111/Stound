import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screens from '../Screens/index';
import useReduxStore from '../Hooks/UseReduxStore';
import MybottomTabs from './bottomNavigation';

const Stack = createNativeStackNavigator();

const StackNavigatior = () => {
  const {getState} = useReduxStore();
  const {onboarding} = getState('onboarding');
  const {token} = getState('Auth');
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: null,
        headerShown: false,
      }}>
      {!onboarding && (
        <Stack.Screen name="OnboardScreen" component={Screens.OnboardScreen} />
      )}
      <Stack.Screen
        name="SocialLoginScreen"
        component={Screens.SocialLoginScreen}
      />
      {/* <Stack.Screen name="MybottomTabs" component={MybottomTabs} /> */}

      {/* <Stack.Screen name="GeneralScreen" component={Screens.GeneralScreen} /> */}
      <Stack.Screen name="AccountScreen" component={Screens.AccountScreen} />
      <Stack.Screen name="FilterScreen" component={Screens.FilterScreen} />
      {/* <Stack.Screen
        name="NotificationScreen"
        component={Screens.NotificationScreen}
      /> */}
      <Stack.Screen name="MybottomTabs" component={MybottomTabs} />

      <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={Screens.RegisterScreen} />
      <Stack.Screen name="SomeComponent" component={Screens.SomeComponent} />
      <Stack.Screen
        name="NotificationScreen"
        component={Screens.NotificationScreen}
      />

      {token == '' && <></>}
    </Stack.Navigator>
  );
};
// const Navigation = () => {
//   const {getState} = useReduxStore();
//   const {onboarding} = getState('onboarding');
//   const {token} = getState('Auth');
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTransparent: true,
//         headerTitle: null,
//         // animation: 'slide_from_left',
//         headerShown: false,
//       }}>
//       {!onboarding && (
//         <Stack.Screen
//         name="OnboardingScreen"
//         component={Screens.OnboardingScreen}
//         />
//         )}
//       {token == '' && (
//           <>
//           <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
//           <Stack.Screen
//             name="RegisterScreen"
//             component={Screens.RegisterScreen}
//           />
//           <Stack.Screen name="OtpScreen" component={Screens.OtpScreen} />
//         </>
//       )}
//       {token != '' && (
//         <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
//       )}
//     </Stack.Navigator>
//   );
// };

export default StackNavigatior;
