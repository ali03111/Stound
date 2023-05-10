import auth from '@react-native-firebase/auth';
import {loginUrl} from '../Utils/Urls';
import API from '../Utils/helperFunc';

const getFbResult = () => auth().currentUser.getIdTokenResult();

const loginService = param => API.post(loginUrl, param);

const logOutFirebase = () => auth().signOut();

export {getFbResult, loginService, logOutFirebase};
