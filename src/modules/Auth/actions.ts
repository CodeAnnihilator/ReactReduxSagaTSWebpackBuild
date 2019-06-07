import {action, createCustomAction, createAction, createStandardAction} from 'typesafe-actions';

import {authActionTypes} from './constants';

// export const sendAuthData =
// 	createStandardAction(authActionTypes.SEND_AUTH_DATA)
// 		<any>();

// export const sendAuthData = (login: string, pass: string) => ({
// 	type: authActionTypes.SEND_AUTH_DATA,
// 	login,
// 	pass,
// });
export const sendAuthData = createCustomAction(authActionTypes.SEND_AUTH_DATA, type =>
	(login: string, pass: string) => ({
		type, login, pass,
	}));

export const startAuthRequest = createStandardAction(authActionTypes.START_AUTH_REQUEST)();
export const stopAuthRequest = createStandardAction(authActionTypes.STOP_AUTH_REQUEST)();
export const login = createCustomAction(authActionTypes.LOGIN, type =>
	(exp: number, userId: string, caption: string, permissions: string[]) => ({
		type, exp, userId, caption, permissions,
	}),
);
export const logout = createStandardAction(authActionTypes.LOGOUT)();
export const startTokenRefresh = createStandardAction(authActionTypes.START_TOKEN_REFRESH)();
export const stopTokenRefresh = createStandardAction(authActionTypes.STOP_TOKEN_REFRESH)();
export const verifyToken = createStandardAction(authActionTypes.VERIFY_TOKEN)();
