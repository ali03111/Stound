import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {randomService} from '../../Services/AuthServices';
import {addQuesUrl, notifyUserUrl} from '../../Utils/Urls';
import {questionFalse, setAnswer} from '../Action/isQuestionAction copy';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {store} from '../Reducers';
import API from '../../Utils/helperFunc';

function* setQuestionSaga(action) {
  try {
    yield put(questionFalse());
    const {ok, data} = yield call(randomService, {
      url: addQuesUrl,
      params: action.payload.label,
    });
    if (ok) yield put({type: types.UpdateProfile, payload: data.data});
    const {adId} = yield call(store.getState, 'isQuestion');
    successMessage('You like this property');
    yield call(API.put, notifyUserUrl + adId);
  } catch (error) {
    errorMessage(data.message);
  } finally {
    yield put(questionFalse());
  }
}
function* questionSaga() {
  yield takeLatest(types.selectedAnsTypeSaga, setQuestionSaga);
}

export default questionSaga;
