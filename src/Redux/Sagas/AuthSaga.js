import {call, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {
  appleIdlogin,
  emailLogin,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';
import API from '../../Utils/helperFunc';
import {
  logOutUser,
  loginUser,
  updateAuth,
  updateUser,
} from '../Action/AuthAction';
import {loadingFalse, loadingTrue} from '../Action/isloadingAction';
import {errorMessage} from '../../Config/NotificationMessage';
import {loginUrl} from '../../Utils/Urls';
import {
  getFbResult,
  logOutFirebase,
  loginService,
} from '../../Services/AuthServices';

// function* loginSaga(action) {
//   yield put(loadingTrue());
//   const {payload} = action;
//   const {datas} = payload;
//   const getLoginData = async () => {
//     try {
//       const data = await loginObject[payload.type];
//       const result = await data(datas);
//       return {data: result, ok: true};
//     } catch (error) {
//       return {data: error, ok: false};
//     }
//   };
//   try {
//     const {ok, data} = yield call(getLoginData);
//     console.log('ok', ok, data);
//     if (ok) {
//       const idTokenResult = yield call(getFbResult);
//       console.log('idTokenResult', idTokenResult);
//       const {data, ok} = yield call(loginService, {token: idTokenResult.token});
//       console.log('data', data);
//       if (ok) {
//         console.log('shdfjhsvfhjks', data);
//         yield put(updateAuth(data));
//       } else errorMessage('Some xnvkl kl ');
//     }
//   } catch (error) {
//     console.log('errrr', error);
//     errorMessage(error);
//   } finally {
//     yield put(loadingFalse());
//   }
// }

const loginObject = {
  Google: () => ({
    googleLogin,
  }),
  facebook: () => ({faceBookLogin}),
  email: datas => emailLogin(datas?.email, datas?.password),
  appleID: () => ({appleIdlogin}),
};

const loginSaga = function* ({payload: {datas, type}}) {
  yield put(loadingTrue());

  try {
    const getLoginData = loginObject[type];
    const result = yield call(getLoginData, datas);
    const {data, ok} = {data: result, ok: true};

    console.log('ok', ok, data);

    if (ok) {
      const idTokenResult = yield call(getFbResult);
      console.log('idTokenResult', idTokenResult);

      const {data, ok} = yield call(loginService, {token: idTokenResult.token});
      console.log('data', data);

      if (ok) {
        console.log('shdfjhsvfhjks', data);
        yield put(updateAuth(data));
      } else {
        errorMessage('Some xnvkl kl ');
      }
    }
  } catch (error) {
    console.error('errrr', error);
    errorMessage(error);
  } finally {
    yield put(loadingFalse());
  }
};

function* registerSaga(action) {
  yield put(loadingTrue());
}

function* logOutSaga(action) {
  yield put(loadingTrue());
  yield call(logOutFirebase);
  // yield put(updateAuth());
  yield call(logOutUser);
  yield put(loadingFalse());
}

function* authSaga() {
  yield takeLatest(types.LoginType, loginSaga);
  yield takeLatest(types.LogoutType, logOutSaga);
}

export default authSaga;
