import {delay} from 'redux-saga';
import {call, takeLatest} from 'redux-saga/effects';

import {entitiesActionTypes} from 'library/common/constants/entities';

function* requestTestDataSaga() {
	yield call(delay, 1000);
}

export default function* watchEntities() {
	yield takeLatest(entitiesActionTypes.REQUEST_TEST_DATA_START, requestTestDataSaga);
}
