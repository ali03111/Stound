import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { types } from '../types';

function* setRecentLocationSaga(action) {
    console.log("paylaod", action)
    yield put({ type: types.RecentLocation, payload: action.payload.description });


}
function* recentLocationSaga() {
    yield takeLatest('SetRecentLocation', setRecentLocationSaga);

}

export default recentLocationSaga;