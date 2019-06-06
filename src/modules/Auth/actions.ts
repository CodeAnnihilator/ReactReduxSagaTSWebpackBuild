import {action, createStandardAction} from 'typesafe-actions';

import {authActionTypes} from './constants';

export const sendAuthData =
	createStandardAction(authActionTypes.SEND_AUTH_DATA)
		<string, string>();

export const startAuthRequest = () => action(authActionTypes.START_AUTH_REQUEST);
export const stopAuthRequest = () => action(authActionTypes.STOP_AUTH_REQUEST);
export const login = () => action(authActionTypes.LOGIN);
export const logout = () => action(authActionTypes.LOGOUT);
