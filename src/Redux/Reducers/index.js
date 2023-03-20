import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from './AuthReducer';
import loadingReducer from './loadingReducer';
import onboardingReducer from './onboardingReducer';

const onBoardPersistConfig = {
  key: 'onboarding',
  storage: AsyncStorage,
  whitelist: 'onboarding',
};

const AuthPersistConfig = {
  key: 'Auth',
  storage: AsyncStorage,
  whitelist: ['userData', 'token'],
};

export const store = configureStore({
  reducer: {
    onboarding: persistReducer(onBoardPersistConfig, onboardingReducer),
    Auth: persistReducer(AuthPersistConfig, AuthReducer),
    isloading: loadingReducer,
  },
});
export const persistor = persistStore(store);
