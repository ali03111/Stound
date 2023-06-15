import auth from '@react-native-firebase/auth';
import {
  deviceIdUrl,
  getAgoraTokenUrl,
  loginUrl,
  logoutUrl,
  registerUrl,
  updateUserUrl,
} from '../Utils/Urls';
import API from '../Utils/helperFunc';
import {Platform} from 'react-native';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
} from 'react-native-agora-chat';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {store} from '../Redux/Reducers';
//Create Agora User For ChatApp

const AgoraServerToken = async params => {
  const {ok, data, originalError} = await API.post(getAgoraTokenUrl, params);
  return {ok, token: data};
};

const getAllAgoraUser = async token => {
  try {
    const response = await fetch(
      'https://a61.chat.agora.io/61979408/1143303/users',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    return {ok: true, res: data};
  } catch (e) {
    return {ok: false, res: e};
  }
};
const AgoraLogout = async () => await ChatClient.getInstance().logout();
const createAgoraUser = async params => {
  const {token} = await AgoraServerToken({});
  const headers = {
    Authorization: `Bearer ${token.appToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(
    'https://a61.chat.agora.io/61979408/1143303/users',
    {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    },
  );
  const res = await response.json();

  return {agorData: res, ok: true};
};

const loginWithAgora = async ({username, password}) => {
  const appKey = '61979408#1143303';

  const init = () => {
    const chatClient = ChatClient.getInstance();
    let o = new ChatOptions({
      autoLogin: true,
      appKey: appKey,
    });
    chatClient.removeAllConnectionListener();
    chatClient
      .init(o)
      .then(() => {
        console.log('init success');
        this.isInitialized = true;
        let listener = {
          onTokenWillExpire() {
            console.log('token expire.');
          },
          onTokenDidExpire() {
            console.log('token did expire');
          },
          onConnected() {
            console.log('onConnected');
            // setMessageListener();
          },
          onDisconnected(errorCode) {
            console.log('onDisconnected:' + errorCode);
          },
        };
        chatClient.addConnectionListener(listener);
      })
      .catch(error => {
        console.log(
          'init fail: ' +
            (error instanceof Object ? JSON.stringify(error) : error),
        );
      });
  };
  init();
  const t = ChatClient.getInstance().loginWithAgoraToken(username, password);

  // const t = ChatClient.getInstance().loginWithAgoraToken(username, password);
  // const chatClient = ChatClient.getInstance();
  // let o = new ChatOptions({
  //   autoLogin: false,
  //   appKey: appKey,
  // });
  // chatClient.removeAllConnectionListener();
  // let listener = {
  //   onTokenWillExpire(res) {
  //     console.log('token expire.');
  //   },
  //   onTokenDidExpire() {
  //     console.log('token did expire');
  //   },
  //   onConnected() {
  //     console.log('onConnected');
  //     // setMessageListener();
  //   },
  //   onDisconnected(errorCode) {
  //     console.log('onDisconnected:' + errorCode);
  //   },
  // };
  // const init = await chatClient.init(o);
  // chatClient.addConnectionListener(listener);
  // console.log('init the connection', t);
  // return;
  return t;
};

const getFbResult = () => auth().currentUser.getIdTokenResult();

const loginService = param => API.post(loginUrl, param);

const registerService = param => API.post(registerUrl, param);

const logoutService = async () => await API.get(logoutUrl);

const fcmRegService = async params => await API.put(deviceIdUrl + params);

const randomService = async ({url, params}) =>
  await API.post(url, {answer: params});

//updateProfile in Firebase
const updateProfileFirebase = params => {
  const {Auth} = store.getState();
  firestore().collection('users').doc(Auth.userData.agoraId).update(params);
};

const updateProfileServices = async params => {
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
  return await API.post(
    updateUserUrl,
    formData,
    {
      maxBodyLength: 'infinite',
    },
    {
      Headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
        'Access-Control-Allow-Headers':
          'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};

const createUserFirestore = ({datas, data}) => {
  firestore()
    .collection('users')
    .doc(data?.user.agoraId)
    .set({
      ...datas,
      userId: data?.user.agoraId,
      profilePicture: data?.user.profilePicture,
    });
  console.log('User added!');
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
  fcmRegService,
  createAgoraUser,
  loginWithAgora,
  AgoraServerToken,
  AgoraLogout,
  getAllAgoraUser,
  createUserFirestore,
  updateProfileFirebase,
};
