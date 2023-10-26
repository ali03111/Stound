/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import {persistor, store} from './src/Redux/Reducers';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging'
import { setNotificationLength } from './src/Redux/Action/recentNotification';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { navigate, navigationRef } from './RootNavigation';

const Stound = () => (

    <GestureHandlerRootView style={{flex:1}}>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
      <FlashMessage position="top" />
    </PersistGate>
  </Provider>
    </GestureHandlerRootView>
);

// Register background handlere
export const backgroundNotificationFunction =()=>{

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    store.dispatch(setNotificationLength(remoteMessage));
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      console.log('if navigationRef');
      navigationRef.navigate('NotificationScreen');
    } else {
      console.log('else navigationRef');
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  });
}
// // Register Terminate handler
//   messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage,
//         );
//         if (navigationRef.isReady()) {
//           // Perform navigation if the react navigation is ready to handle actions
//           console.log('if navigationRef');
//           navigationRef.navigate('NotificationScreen');
//         } else {
//           console.log('else navigationRef');
//           // You can decide what to do if react navigation is not ready
//           // You can ignore this, or add these actions to a queue you can call later
//         }

//   // store.dispatch(setNotificationLength(remoteMessage));    

//       });

AppRegistry.registerComponent(appName, () => Stound);
