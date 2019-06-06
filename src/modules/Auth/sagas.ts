import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';

import {loginRequest, refreshTokenRequest, verifyTokenRequest} from './api'

import { startAuthRequest, stopAuthRequest, login as loginUser, logout } from './actions'
import { authActionTypes } from './constants';

function* authenticateWithLoginAndPassword(action: any) {
	return yield put(loginUser);
	console.log('Starting auth saga');
	yield put(startAuthRequest);
	const { login, pass } = action;
	try {
		// throw new Error("access denied");
		const authResponse =  yield call(loginRequest, { login, pass });
		// const {
		//   data: { access, refresh }
		// } = authResponse;
		localStorage.setItem('access_token', "VALID_ACCESS_TOKEN");
		localStorage.setItem('refresh_token', "VALID_REFRESH_TOKEN");
		yield put(stopAuthRequest);
		yield put(loginUser)
	} catch(error) {
		console.log(error)
	} 
}


function* refreshToken(){
	
	const refreshToken = localStorage.getItem('refresh_token');

	if(!refreshToken){
		return yield put(logout)
	}
	yield put(startAuthRequest);
	try {
		const refreshTokenResponse = yield call(refreshTokenRequest, { refresh: refreshToken });
		// const {
		//   data: { access },
		// } = refreshTokenResponse;
		localStorage.setItem('access_token', "REFRESHED_ACCESS_TOKEN");
	} catch(error) {

	}
}

function* verifyToken(){
	const accessToken = localStorage.getItem("access_token");
	if(!accessToken) {
		// AUTH FAIL
	}
	try {
		const verifiedTokenResponse = yield call(verifyTokenRequest);
		// const {
		//   data: { exp, user_id, caption, permissions },
		// } = response;

	} catch (error) {
		
	}
}

export default function* watchEntities() {
	yield takeLatest(authActionTypes.SEND_AUTH_DATA, authenticateWithLoginAndPassword);
}