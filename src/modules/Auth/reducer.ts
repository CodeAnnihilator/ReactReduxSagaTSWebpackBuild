import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';

export type AuthState = Readonly<{
	isAuth: boolean;
	permissions: string[];
	userId: string | null;
	caption: string | null;
	pendingAuthRequest: boolean;
	tokenIsRefreshing: boolean;
	tokenExpiration: number | null;
}>

const initialState: AuthState = {
	isAuth: false,
	permissions: [],
	userId: null,
	caption: null,
	pendingAuthRequest: false,
	tokenIsRefreshing: false,
	tokenExpiration: null
};

export type AuthActions = ActionType<typeof actions>;

export default (state = initialState, action: AuthActions): AuthState => {
	switch (action.type) {
		case getType(actions.startAuthRequest):
			return {
				...state,
				pendingAuthRequest: true,
			};
		case getType(actions.stopAuthRequest):
			return {
				...state,
				pendingAuthRequest: false,
			};
		case getType(actions.login):
			return {
				...state,
				isAuth: true,
				userId: action.userId,
				caption: action.caption,
				permissions: action.permissions,
				tokenExpiration: action.exp
			};
		case getType(actions.logout):
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');

			return {
				...state,
				isAuth: false,
				permissions: [],
				userId: null,
				caption: null,
			};
		default:
			return state;
	}
}
