/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import {persistor, store} from './src/Redux/Reducers';
import FlashMessage from 'react-native-flash-message';

const Stound = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
      <FlashMessage position="top" />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Stound);
