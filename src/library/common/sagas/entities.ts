import {delay} from 'redux-saga';
import {call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {entitiesActionTypes} from 'library/common/constants/entities';

const fetchEntities = () => axios.get("http://localhost:4000/data/private-data")

function* requestTestDataSaga() {
	// yield call(delay, 1000);
	try {
		const entities = yield call(fetchEntities);
		console.log("FETCHING ENTITIES", entities);
	} catch (error) {
		
	}

}
export default function* watchEntities() {
	yield takeLatest(entitiesActionTypes.REQUEST_TEST_DATA_START, requestTestDataSaga);
}
