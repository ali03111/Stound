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
  getFbResult,
  logOutFirebase,
  loginService,
  logoutService,
  registerService,
  updateProfileServices,
} from '../../Services/AuthServices';

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: datas => emailLogin(datas),
  appleID: () => appleIdlogin(),
};

const loginSaga = function* ({payload: {datas, type}}) {
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
          data: socialData,
        });
        if (ok) {
          yield put(updateAuth(data));
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

function* registerSaga({payload: {datas}}) {
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
          data: datas,
        });
        if (ok) {
          yield call(emailLogin, datas);
          yield put(updateAuth(data));
        }
      }
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

function* logOutSaga(action) {
  try {
    yield call(logoutService);
    yield call(logOutFirebase);
    yield put({type: types.LogoutType});
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

function* updateProfileSaga({payload: profileData}) {
  yield put(loadingTrue());
  try {
    const {data, ok} = yield call(updateProfileServices, {data: profileData});
    if (ok) {
      yield put({type: types.UpdateProfile, payload: data.data});
      successMessage('Your profile has been updated');
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

function* authSaga() {
  yield takeLatest(types.LoginType, loginSaga);
  yield takeLatest(types.LogoutFirebaseType, logOutSaga);
  yield takeLatest(types.RegisterUser, registerSaga);
  yield takeLatest(types.UpdateProfile, updateProfileSaga);
}

export default authSaga;
