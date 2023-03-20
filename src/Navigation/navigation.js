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

      <Stack.Screen name="RegisterScreen" component={Screens.RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
      <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
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
