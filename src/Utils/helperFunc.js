import {create} from 'apisauce';
// import {store} from '@/store/store';
import {logOutUser, updateAuth} from '@/store/actions/auth-action';
import {baseURL} from './Urls';
import {store} from '../Redux/Reducers';
import {loadingFalse, loadingTrue} from '../Redux/Action/isloadingAction';

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
  console.log('aurth', Auth.token);
  config.headers = {
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdAZ21haWwuY29tIiwiaWF0IjoxNjgzODA1MTEwLCJleHAiOjE2ODM4OTE1MTB9.uiL1mpZlu4Q-wwUvK8jENDG-Lp5TO79hLloXIeccUjs`,
    Authorization: `Bearer ${Auth.token}`,
  };
  return config;
});

API.addResponseTransform(response => {
  setTimeout(() => store.dispatch(loadingFalse()), 500);
  if (response?.originalError?.message == 'Request failed with status code 401')
    // store.dispatch(logOutUser());

    return response;
});

const {get} = API;

//^ altering the get()
API.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    return response;
  }
};

export default API;
