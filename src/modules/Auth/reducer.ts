import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';

export type AuthState = Readonly<{
	isAuth: boolean;
	permissions: string[];
	userId: string | null;
	caption: string | null;
	pendingAuthRequest: boolean;
}>;

const initialState: AuthState = {
	isAuth: false,
	permissions: [],
	userId: null,
	caption: null,
	pendingAuthRequest: false,
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
			};
		case getType(actions.logout):
			return {
				...state,
				isAuth: false,
			};
		default:
			return state;
	}
};
