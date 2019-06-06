import {all, fork} from 'redux-saga/effects';

import watchEntities from 'library/common/sagas/entities';
import authSaga from 'modules/Auth/sagas';

export default function* rootSaga() {
	yield all([
		fork(watchEntities),
		fork(authSaga)
	]);
}
