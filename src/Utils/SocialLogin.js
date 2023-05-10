import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {sha256} from 'react-native-sha256';
import {Platform} from 'react-native';

export const faceBookLogin = async () => {
  // if (Platform.OS === 'android') {
  //   LoginManager.setLoginBehavior('web_only');
  // }

  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  console.log('result', result);
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
};

export const appleIdlogin = async () => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const {
    identityToken,
    nonce,
    fullName: {givenName, familyName},
  } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );
  await auth().signInWithCredential(appleCredential.token);
  console.log({
    identityToken,
    appleCredential,
    name: `${givenName || ''} ${familyName || ''}`,
  });
  return {
    ...identityToken,
    ...appleCredential,
    name: `${givenName || ''} ${familyName || ''}`,
  };

  // Sign the user in with the credential
};

// export const googleLogin = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     await GoogleSignin.configure({
//       // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//       // webClientId:
//       //   '925607838451-78r5q593erniv0rian0v8f7l1dkd3s6q.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//       androidClientId:
//         '925607838451-78r5q593erniv0rian0v8f7l1dkd3s6q.apps.googleusercontent.com',
//       iosClientId:
//         '925607838451-2cbsfsq0oenaj93jdivbnm7k8qhv4emu.apps.googleusercontent.com',
//       // webClientId:
//       //   '925607838451-k42tnhp3cbqod17u38g4j49hv00atu9b.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//       offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//       hostedDomain: '', // specifies a hosted domain restriction
//       forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//       accountName: '', // [Android] specifies an account name on the device that should be used
//       // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//       googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//       openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//       profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
//     });
//     await GoogleSignin.signOut();
//     const {user, idToken} = await GoogleSignin.signIn();
//     console.log(user, idToken);
//   } catch (error) {
//     console.log('error.code', error);
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (e.g. sign in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//     } else {
//       // some other error happened
//     }
//   }
// };

export const googleLogin = async () => {
  GoogleSignin.configure({
    androidClientId:
      '925607838451-2i4fd6777bbpn30i228rjsjnsupkodn6.apps.googleusercontent.com',
    iosClientId:
      '925607838451-2cbsfsq0oenaj93jdivbnm7k8qhv4emu.apps.googleusercontent.com',
    webClientId:
      '925607838451-78r5q593erniv0rian0v8f7l1dkd3s6q.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return {...idToken, ...googleCredential};
  // Sign-in the user with the credential
  // return auth().signInWithCredential(googleCredential);
};

export const PhoneNumberLogin = async phoneNumber => {
  // Handle the button press
  try {
    const {confirm} = await auth().signInWithPhoneNumber(phoneNumber);
    return confirm;
  } catch (error) {
    console.log('eror', error);
  }
};

export const verifyCode = async ({confirm, code}) => {
  try {
    await confirm(code);
  } catch (error) {
    console.log('Invalid code.');
  }
};

export const emailSignUp = async (email, password) => {
  const data = await auth().createUserWithEmailAndPassword(email, password);
  return data;
};

export const emailLogin = async (email, password) => {
  const data = await auth().signInWithEmailAndPassword(email, password);
  return data;
};
