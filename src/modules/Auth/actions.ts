import {createStandardAction} from 'typesafe-actions';

import {authActionTypes} from './constants';

// export const sendAuthData =
// 	createStandardAction(authActionTypes.SEND_AUTH_DATA)
// 		<any>();

export const startAuthRequest = createStandardAction(authActionTypes.START_AUTH_REQUEST)();
export const stopAuthRequest = createStandardAction(authActionTypes.STOP_AUTH_REQUEST)();
export const login = createStandardAction(authActionTypes.LOGIN)();
export const logout = createStandardAction(authActionTypes.LOGOUT)();
