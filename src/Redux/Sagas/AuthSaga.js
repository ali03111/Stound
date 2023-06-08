import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {
  appleIdlogin,
  emailLogin,
  emailSignUp,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';
import API from '../../Utils/helperFunc';
import {
  logOutAuth,
  logOutUser,
  loginUser,
  updateAuth,
  updateUser,
} from '../Action/AuthAction';
import {loadingFalse, loadingTrue} from '../Action/isloadingAction';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {loginUrl} from '../../Utils/Urls';
import {
  AgoraLogout,
  AgoraServerToken,
  createAgoraUser,
  fcmRegService,
  getAllAgoraUser,
  getFbResult,
  logOutFirebase,
  loginService,
  loginWithAgora,
  logoutService,
  randomService,
  registerService,
  updateProfileServices,
} from '../../Services/AuthServices';
import uuid from 'react-native-uuid';
import {useState} from 'react';

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: datas => emailLogin(datas),
  appleID: () => appleIdlogin(),
};

/* `const loginSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It
takes an action object as an argument, destructures its `payload` property to get `datas` and `type`
properties, and then performs a series of asynchronous operations using the `yield` keyword. */
const loginSaga = function* ({payload: {datas, type}}) {
  const agoraId = uuid.v4().split('-').join('');
  console.log(agoraId, 'asldkajldkjalskj');
  yield put(loadingTrue());

  try {
    const getLoginData = loginObject[type];
    const result = yield call(getLoginData, datas);
    const {socialData, ok} = {socialData: result, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        const {data, ok} = yield call(loginService, {
          token: jwtToken,
          data: {...socialData, agoraId},
        });
        console.log(data, ok, 'yeyeyeyeyeye');

        if (ok) {
          const {token} = yield call(AgoraServerToken, {});
          console.log(token, 'ueueueueu');
          const {ok, res} = yield call(getAllAgoraUser, token.appToken);
          if (ok) {
            console.log(res, '12312312312');
            if (res.entities.length >= 1) {
              const checkAgoraUser = res.entities.filter(item => {
                return item.username == data.user.agoraId;
              })[0];
              console.log('bcejbcejbcejbcbecjbe', checkAgoraUser, data);
              if (checkAgoraUser?.uuid) {
                const {token} = yield call(AgoraServerToken, {
                  uid: data.user.agoraId,
                });
                const statusdata = yield call(loginWithAgora, {
                  username: data.user.agoraId,
                  password: token.userToken,
                });
                console.log(statusdata, 'aljklfjlskdj');
                if (!statusdata) {
                  yield put(updateAuth(data));
                } else {
                  console.log('statuscodeeeeee', statusdata);
                }
              } else if (!checkAgoraUser) {
                //Create Agora User
                const {ok, agorData} = yield call(createAgoraUser, {
                  username: data.user.agoraId,
                  password: 'Test@123',
                  nickname: data.user.email,
                });
                console.log(ok, agorData, 'ok1111');

                if (ok) {
                  const {ok, token} = yield call(AgoraServerToken, {
                    uid: data.user.agoraId,
                  });
                  const statusdata = yield call(loginWithAgora, {
                    username: data.user.agoraId,
                    password: token.userToken,
                  });
                  console.log(statusdata, 'aljklfjlskdj');
                  if (!statusdata) {
                    yield put(updateAuth(data));
                  }
                  console.log(statusdata, 'Status11111');
                }
              }
            } else {
              //Create Agora User
              const {ok, agorData} = yield call(createAgoraUser, {
                username: data.user.agoraId,
                password: 'Test@123',
                nickname: data.user.email,
              });
              console.log(ok, agorData, 'ok1111');

              if (ok) {
                const {ok, token} = yield call(AgoraServerToken, {
                  uid: data.user.agoraId,
                });
                const statusdata = yield call(loginWithAgora, {
                  username: data.user.agoraId,
                  password: token.userToken,
                });
                console.log(statusdata, 'aljklfjlskdj');
                if (!statusdata) {
                  yield put(updateAuth(data));
                }
                console.log(statusdata, 'Status11111');
              }
            }
          }
        }
      }
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
    console.log('err', error);
  } finally {
    yield put(loadingFalse());
  }
};

/* `registerSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It takes
an action object as an argument, destructures its `payload` property to get `datas`, and then
performs a series of asynchronous operations using the `yield` keyword. */
function* registerSaga({payload: {datas}}) {
  const agoraId = uuid.v4().split('-').join('');
  yield put(loadingTrue());
  try {
    const result = yield call(emailSignUp, datas);

    const {data, ok} = {data: result, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        const {data, ok} = yield call(registerService, {
          token: jwtToken,
          data: {...datas, agoraId},
        });

        if (ok) {
          //Create Agora User
          const {ok, agorData} = yield call(createAgoraUser, {
            username: data.user.agoraId,
            password: datas.password,
            nickname: datas.email,
          });
          console.log(ok, agorData, 'ok1111');

          if (ok) {
            const {ok, token} = yield call(AgoraServerToken, {
              uid: data.user.agoraId,
            });
            const statusdata = yield call(loginWithAgora, {
              username: data.user.agoraId,
              password: token.userToken,
            });
            console.log(statusdata, 'aljklfjlskdj');
            if (!statusdata) {
              yield call(emailLogin, datas);
              yield put(updateAuth(data));
            }
            console.log(statusdata, 'Status11111');
          }
        }
      }
    }
  } catch (error) {
    console.log(error, 'Error');
    errorMessage(error.message.split(' ').slice(1).join(' ') ?? error);
  } finally {
    yield put(loadingFalse());
  }
}

/* `logOutSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It takes an
action object as an argument, but it is not used in the function. The function performs a series of
asynchronous operations using the `yield` keyword. */
function* logOutSaga(action) {
  try {
    yield put({type: types.CleanRecentLocation});
    yield call(logoutService);
    yield call(logOutFirebase);
    yield call(AgoraLogout);

    yield put({type: types.LogoutType});
    console.log('okokok');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}
/* The `updateProfileSaga` function is a generator function that is used as a saga in a Redux-Saga
middleware. It takes an action object as an argument, destructures its `payload` property to get
`profileData`, and then performs a series of asynchronous operations using the `yield` keyword. */

function* updateProfileSaga({payload: profileData}) {
  yield put(loadingTrue());
  try {
    // console.log('dbnjdf', profileData);
    const {ok, data, originalError} = yield call(
      updateProfileServices,
      profileData,
    );
    console.log('user', originalError, data);
    if (ok) {
      yield put({type: types.UpdateProfile, payload: data.data});
      successMessage('Your profile has been updated');
    }
  } catch (error) {
    console.log('error ', error);
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

/* This function is used to add the fcm token to the database. */
function* fcmTokenSaga(action) {
  yield call(fcmRegService, action.payload);
}

function* authSaga() {
  yield takeLatest(types.LoginType, loginSaga);
  yield takeLatest(types.LogoutFirebaseType, logOutSaga);
  yield takeLatest(types.RegisterUser, registerSaga);
  yield takeLatest(types.UpdateUser, updateProfileSaga);
  yield takeLatest(types.fcmRegType, fcmTokenSaga);
}

export default authSaga;
