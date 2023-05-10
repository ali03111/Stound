import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  ImageBackground,
  StatusBar,
  LogBox,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import StackNavigatior from './src/Navigation/navigation';
import {SplashScreen} from './src/Assests';
import {Settings} from 'react-native-fbsdk-next';
import useReduxStore from './src/Hooks/UseReduxStore';
import Overlay from './src/Components/Overlay';
import {logOutFirebase} from './src/Services/AuthServices';

function App({navigation}) {
  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const {getState} = useReduxStore();
  const {isloading} = getState('isloading');
  const time = () => {
    return 5000;
  };

  useEffect(() => {
    /**
     * Initialize the sdk
     */
    (function initializeSDK() {
      Settings.initializeSDK();
    })();

    /**
     * Set app id
     */

    Settings.setAppID('889975852090973');
  }, []);

  useEffect(async () => {
    (async () => {
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
        'ViewPropTypes will be removed from React Native',
        'Settings is not yet supported on Android',
        'ViewPropTypes will be removed',
        "exported from 'deprecated-react-native-prop-types'.",
        'Sending...',
        'Non-serializable values were found in the navigation state',
      ]);
      LogBox.ignoreAllLogs(true);
    })();
    // await logOutFirebase();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);

  let Splash_Screen = (
    <ImageBackground
      source={SplashScreen}
      style={styles.SplashScreen_RootView}></ImageBackground>
  );
  return (
    <>
      {isloading && <Overlay />}
      <StatusBar hidden={isVisible} barStyle={'dark-content'} />
      {isVisible === true ? (
        Splash_Screen
      ) : (
        <NavigationContainer>
          <StackNavigatior />
        </NavigationContainer>
      )}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
