import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {
  appleIdlogin,
  emailLogin,
  emailSignUp,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';
import {
  logOutAuth,
  logOutUser,
  loginUser,
  updateAuth,
  updateUser,
} from '../Action/AuthAction';
import {loadingFalse, loadingTrue} from '../Action/isloadingAction';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {
  AgoraLogout,
  AgoraServerToken,
  createAgoraUser,
  createUserFirestore,
  fcmRegService,
  getAllAgoraUser,
  getFbResult,
  logOutFirebase,
  loginService,
  loginWithAgora,
  logoutService,
  randomService,
  registerService,
  updateProfileFirebase,
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

        if (ok) {
          const {token} = yield call(AgoraServerToken, {});
          const {ok, res} = yield call(getAllAgoraUser, token.appToken);
          if (ok) {
            if (res.entities.length >= 1) {
              const checkAgoraUser = res.entities.filter(item => {
                return item.username == data.user.agoraId;
              })[0];
              if (checkAgoraUser?.uuid) {
                const {token} = yield call(AgoraServerToken, {
                  uid: data.user.agoraId,
                });
                // const statusdata = yield call(loginWithAgora, {
                //   username: data.user.agoraId,
                //   password: token.userToken,
                // });
                // if (!statusdata) {
                yield put(updateAuth(data));
                // } else {

                // }
              } else if (!checkAgoraUser) {
                //Create Agora User
                const {ok, agorData} = yield call(createAgoraUser, {
                  username: data.user.agoraId,
                  password: 'Test@123',
                  nickname: data.user.email,
                });

                if (ok) {
                  const {ok, token} = yield call(AgoraServerToken, {
                    uid: data.user.agoraId,
                  });
                  // const statusdata = yield call(loginWithAgora, {
                  //   username: data.user.agoraId,
                  //   password: token.userToken,
                  // });
                  // if (!statusdata) {
                  yield put(updateAuth(data));
                  // }
                }
              }
            } else {
              //Create Agora User
              const {ok, agorData} = yield call(createAgoraUser, {
                username: data.user.agoraId,
                password: 'Test@123',
                nickname: data.user.email,
              });

              if (ok) {
                const {ok, token} = yield call(AgoraServerToken, {
                  uid: data.user.agoraId,
                });
                // const statusdata = yield call(loginWithAgora, {
                //   username: data.user.agoraId,
                //   password: token.userToken,
                // });
                // if (!statusdata) {
                yield put(updateAuth(data));
                // }
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
  // const agoraId = uuid.v4().split('-').join('');
  const agoraId = uuid.v4();
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
        console.log(data, 'DAATATAA');
        console.log(datas, 'DASTASSASA');
        //Add new user to firestore
        yield call(createUserFirestore, {datas, data});

        console.log(data, ok, 'regesterServices');

        if (ok) {
          console.log('OKSERVICESSS');
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
            // const statusdata = yield call(loginWithAgora, {
            //   username: data.user.agoraId,
            //   password: token.userToken,
            // });
            // console.log(statusdata, 'aljklfjlskdj');
            // if (!statusdata) {
            yield call(emailLogin, datas);
            yield put(updateAuth(data));
            // }
            console.log(statusdata, 'Status11111');
          }
        }
      }
    }
  } catch (error) {
    console.log(error, 'Error');
    // errorMessage(error.message.split(' ').slice(1).join(' ') ?? error);
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
    // yield call(AgoraLogout);

    yield put({type: types.LogoutType});
  } catch (error) {
    console.log(error, 'logoutErrorrr');
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
      yield call(updateProfileFirebase, {
        profilePicture: data.data.profilePicture,
        name: data.data.name,
        number: data.data.number,
      });
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
