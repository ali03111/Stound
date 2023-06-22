import {create} from 'apisauce';
import {baseURL, notifyUserUrl} from './Urls';
import {store} from '../Redux/Reducers';
import {loadingFalse, loadingTrue} from '../Redux/Action/isloadingAction';
import {Platform} from 'react-native';
import {logOutUser} from '../Redux/Action/AuthAction';
import {types} from '../Redux/types';

const API = create({
  baseURL,
  timeout: 15000,
  //   timeoutErrorMessage: 'Please try Again...',
});

const hideLoaderAPIs = [notifyUserUrl];
// const hideLoaderAPIs = ['/playcount', '/playlist', '/home-content'];

API.addRequestTransform(config => {
  if (!hideLoaderAPIs.includes(config.url)) store.dispatch(loadingTrue());
  const {Auth} = store.getState();
  config.headers = {
    Authorization: `Bearer ${Auth.token}`,
  };
  return config;
});

API.addResponseTransform(response => {
  setTimeout(() => store.dispatch(loadingFalse()), 500);
  const {Auth} = store.getState();
  console.log(Platform.OS + 'token111', Auth.token);
  if (
    response?.originalError?.message == 'Request failed with status code 401' &&
    Auth.token != ''
  )
    store.dispatch({type: types.LogoutType});

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

const formDataFunc = (url, body, imageKey, isArray) => {
  const {Auth} = store.getState();
  console.log('bjdv dv hj hj dhjs dshj bdh∫√ dhjksbvsdhj', body);
  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${Auth.token}`);
  myHeaders.append('Content-Type', 'multipart/form-data');

  const formData = new FormData();
  Object.entries(body).forEach(([key, val]) => {
    if (key == imageKey) {
      isArray
        ? val.forEach((res, index) => {
            formData.append(imageKey, {
              name: res?.fileName,
              type: res?.type,
              uri:
                Platform.OS == 'ios'
                  ? res?.uri.replace('file://', '')
                  : res?.uri,
            });
          })
        : formData.append(imageKey, {
            name: body[imageKey]?.fileName,
            type: body[imageKey]?.type,
            uri:
              Platform.OS == 'ios'
                ? body[imageKey]?.uri.replace('file://', '')
                : body[imageKey]?.uri,
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
  let newUrl = baseURL + url;
  return fetch(newUrl, requestOptions)
    .then(res => res.json())
    .then(res => {
      return {data: res, ok: true};
    })
    .catch(err => {
      return {data: err, ok: false};
    });
};

export {formDataFunc};

export default API;
