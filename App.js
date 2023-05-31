import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  ImageBackground,
  StatusBar,
  LogBox,
  View,
  Image,
  AppState,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import StackNavigatior from './src/Navigation/navigation';
import {SplashScreen, radioEmtpy, radioFill} from './src/Assests';
import {Settings} from 'react-native-fbsdk-next';
import useReduxStore from './src/Hooks/UseReduxStore';
import Overlay from './src/Components/Overlay';
import {logOutFirebase} from './src/Services/AuthServices';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {hp, wp} from './src/Config/responsive';
import {RadioButtons} from './src/Utils/localDB';
import {Touchable} from './src/Components/Touchable';
import {TextComponent} from './src/Components/TextComponent';
import {
  questionFalse,
  setAnswer,
} from './src/Redux/Action/isQuestionAction copy';
import {Colors} from './src/Theme/Variables';
import {fcmService} from './src/Services/Notifications';
import {fcmRegister} from './src/Redux/Action/AuthAction';

function App({navigation}) {
  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const {getState, dispatch} = useReduxStore();
  const {isloading} = getState('isloading');
  const {isQuestion} = getState('isQuestion');
  const {isLogin} = getState('Auth');
  const appState = useRef(AppState.currentState);
  const time = () => {
    return 5000;
  };
  const [selectedId, setSelectedId] = useState(RadioButtons[0]);
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
    GoogleSignin.configure({
      webClientId:
        '925607838451-7o04nlji1tt0v5k15fr8oo6bgdqqgc91.apps.googleusercontent.com',
    });

    // await logOutFirebase();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);

  useEffect(() => {
    /* It's a function that registers the device to receive push notifications. */
    if (isLogin)
      setTimeout(() => {
        fcmService.register(onRegister, onOpenNotification, appState.current);
      }, 5000);
    return () => {
      /* It's a function that unregisters the device from receiving push notifications. */
      if (isLogin) fcmService.unRegister();
    };
  }, [isLogin]);
  const onRegister = fcm_token => {
    console.log(Platform.OS, fcm_token);
    dispatch(fcmRegister(fcm_token));
  };

  const onOpenNotification = notify => {
    console.log('notify', notify);
  };

  let Splash_Screen = (
    <ImageBackground
      source={SplashScreen}
      style={styles.SplashScreen_RootView}></ImageBackground>
  );
  return (
    <>
      {isloading && <Overlay />}
      {isQuestion && (
        <Overlay
          childern={
            <View style={styles.actionViewStyle}>
              <TextComponent text={'Are You!'} styles={styles.headingStyle} />
              {RadioButtons.map(res => {
                return (
                  <Touchable
                    style={styles.radioView}
                    onPress={() => setSelectedId(res)}>
                    <TextComponent
                      styles={styles.radioLabel}
                      text={res.label}
                    />
                    <Image
                      source={selectedId?.id == res.id ? radioFill : radioEmtpy}
                    />
                  </Touchable>
                );
              })}
              <Touchable
                onPress={() => dispatch(setAnswer(selectedId))}
                style={styles.confirmButtonStyle}
                children={
                  <TextComponent
                    text={'Confirm'}
                    styles={{color: Colors.white}}
                  />
                }
              />
            </View>
          }
        />
      )}
      <StatusBar
        hidden={isVisible}
        // backgroundColor={Platform.OS == 'ios' ? 'white' : 'transparent'}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
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
  alertTitle: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  actionViewStyle: {
    width: wp('80'),
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('2'),
  },
  radioView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
    paddingVertical: hp('1.5'),
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.primaryColor,
    borderWidth: 0.2,
    paddingHorizontal: wp('2'),
    alignItems: 'center',
  },
  radioLabel: {
    fontWeight: 'normal',
    fontSize: hp('1.8'),
  },
  cancelButtonStyle: {
    width: wp('35'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: hp('5'),
    borderColor: Colors.primaryColor,
    borderWidth: 0.2,
  },
  confirmButtonStyle: {
    width: wp('35'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    height: hp('5'),
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: hp('1'),
  },
  headingStyle: {
    textAlign: 'center',
  },
});
