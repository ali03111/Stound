import auth from '@react-native-firebase/auth';
import {loginUrl, logoutUrl, registerUrl, updateUserUrl} from '../Utils/Urls';
import API from '../Utils/helperFunc';
import {Platform} from 'react-native';

const getFbResult = () => auth().currentUser.getIdTokenResult();

const loginService = param => API.post(loginUrl, param);

const registerService = param => API.post(registerUrl, param);

const logoutService = async () => await API.get(logoutUrl);

const randomService = async ({url, params}) =>
  await API.post(url, {answer: params});

const updateProfileServices = async params => {
  console.log('params ========>>>>', params);
  const formData = new FormData();
  Object.entries(params.profileData).forEach(([key, val]) => {
    if (key == 'image' && val?.type)
      formData.append(key, {
        name: val?.fileName || val?.name || 'image',
        type: val?.type,
        uri: Platform.OS == 'ios' ? val?.uri.replace('file://', '') : val?.uri,
      });
    else formData.append(key, val);
  });
  return await API.post(updateUserUrl, formData, {
    maxBodyLength: 'infinite',
  });
};
const logOutFirebase = () => auth().signOut();

export {
  getFbResult,
  loginService,
  logOutFirebase,
  registerService,
  logoutService,
  updateProfileServices,
  randomService,
};
