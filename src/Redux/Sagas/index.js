import { all } from 'redux-saga/effects';
import Auth_Saga from './AuthSaga';
import RecentLocationSaga from './RecentLocationSaga';

function* rootSaga() {
  yield all([Auth_Saga()]);
}

export default rootSaga;
