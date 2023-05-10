import auth from '@react-native-firebase/auth';
import {loginUrl, logoutUrl, registerUrl} from '../Utils/Urls';
import API from '../Utils/helperFunc';

const getFbResult = () => auth().currentUser.getIdTokenResult();

const loginService = param => API.post(loginUrl, param);

const registerService = param => API.post(registerUrl, param);

const logoutService = () => API.get(logoutUrl);

const logOutFirebase = () => auth().signOut();

export {
  getFbResult,
  loginService,
  logOutFirebase,
  registerService,
  logoutService,
};
