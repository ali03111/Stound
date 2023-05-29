import {create} from 'apisauce';
// import {store} from '@/store/store';
import {baseURL, createAdsUrl} from './Urls';
import {store} from '../Redux/Reducers';
import {loadingFalse, loadingTrue} from '../Redux/Action/isloadingAction';
import {Platform} from 'react-native';
import {logOutUser} from '../Redux/Action/AuthAction';

const API = create({
  baseURL,
  timeout: 15000,
  //   timeoutErrorMessage: 'Please try Again...',
});

const hideLoaderAPIs = [
  '/playcount',
  '/playlist',
  '/count-streak',
  '/favorite',
  '/goals',
  '/get-all-achievements',
];
// const hideLoaderAPIs = ['/playcount', '/playlist', '/home-content'];

API.addRequestTransform(config => {
  store.dispatch(loadingTrue());
  const {Auth} = store.getState();
  config.headers = {
    Authorization: `Bearer ${Auth.token}`,
  };
  return config;
});

API.addResponseTransform(response => {
  setTimeout(() => store.dispatch(loadingFalse()), 500);
  const {Auth} = store.getState();
  console.log('response?.originalError?.message', response?.originalError);
  if (
    response?.originalError?.message == 'Request failed with status code 401' &&
    Auth.token != ''
  )
    store.dispatch(logOutUser());

  return response;
});

const {get} = API;

//^ altering the get()
API.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  // if (response.ok) {
  return response;
  // }
};

const formDataFunc = (url, body) => {
  const {Auth} = store.getState();

  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${Auth.token}`);
  myHeaders.append('Content-Type', 'multipart/form-data');

  const formData = new FormData();
  Object.entries(body).forEach(([key, val]) => {
    if (key === 'photos' && Array.isArray(val)) {
      val.forEach((res, index) => {
        formData.append(`photos`, {
          name: res?.fileName,
          type: res?.type,
          uri:
            Platform.OS == 'ios' ? res?.uri.replace('file://', '') : res?.uri,
        });
      });
    } else {
      formData.append(key, val);
    }
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  return fetch(url, requestOptions)
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
};

export {formDataFunc};

export default API;
