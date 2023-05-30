import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {randomService} from '../../Services/AuthServices';
import {addQuesUrl} from '../../Utils/Urls';
import {questionFalse, setAnswer} from '../Action/isQuestionAction copy';
import {errorMessage} from '../../Config/NotificationMessage';

function* setQuestionSaga(action) {
  try {
    yield put(questionFalse());
    const {ok, data} = yield call(randomService, {
      url: addQuesUrl,
      params: action.payload.label,
    });
    if (ok) yield put({type: types.UpdateProfile, payload: data.data});
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
