import {takeLatest, call, put} from 'redux-saga/effects';

import {
	loginRequest,
	refreshTokenRequest,
	verifyTokenRequest,
} from './api';

import {
	startAuthRequest,
	stopAuthRequest,
	login as loginUser,
	logout,
	startTokenRefresh,
	stopTokenRefresh,
	verifyToken,
	sendAuthData,
} from './actions';

import {authActionTypes} from './constants';

function* authenticateWithLoginAndPassword(action: ReturnType<typeof sendAuthData>) {
	yield put(startAuthRequest());
	const {login, pass} = action;
	try {
		const authResponse =  yield call(loginRequest, {login, pass});
		const {
			data: {access, refresh}
		} = authResponse;

		localStorage.setItem('access_token', access);
		localStorage.setItem('refresh_token', refresh);
		yield put(verifyToken());
	} catch (error) {
		yield put(stopAuthRequest());
	}
}

function* refreshToken() {
	yield put(startTokenRefresh());
	const refreshToken = localStorage.getItem('refresh_token');

	if(!refreshToken){
		return yield put(logout());
	}

	try {
		const refreshTokenResponse = yield call(refreshTokenRequest, {refresh: refreshToken});
		const {
			data: {access},
		} = refreshTokenResponse;
		localStorage.setItem('access_token', access);
		yield put(stopTokenRefresh());

	} catch(error) {
		yield put(stopTokenRefresh());
		yield put(logout());
	}
}

function* verifyTokenSaga() {
	const accessToken = localStorage.getItem('access_token');

	if(!accessToken) {
		return yield put(logout());
	}

	try {
		const verifiedTokenResponse = yield call(verifyTokenRequest);
		const {
			data: {exp, user_id, caption, permissions},
		} = verifiedTokenResponse;
		yield put(loginUser(exp, user_id, caption, permissions));
	} catch (error) {
		yield put(logout());
	}
}

export default function* watchEntities() {
	yield takeLatest(authActionTypes.SEND_AUTH_DATA, authenticateWithLoginAndPassword);
	yield takeLatest(authActionTypes.REFRESH_TOKEN, refreshToken);
	yield takeLatest(authActionTypes.VERIFY_TOKEN, verifyTokenSaga);
}
