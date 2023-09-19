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

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  store.dispatch(setNotificationLength(remoteMessage));    
});
// Register Terminate handler
  messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
  // store.dispatch(setNotificationLength(remoteMessage));    

      });

AppRegistry.registerComponent(appName, () => Stound);
