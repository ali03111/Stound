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

function App({navigation}) {
  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const time = () => {
    return 5000;
  };

  useEffect(async () => {
    (async () => {
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
        'ViewPropTypes will be removed from React Native',
      ]);
      LogBox.ignoreAllLogs(true);
    })();
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
      <StatusBar hidden={isVisible} />
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
