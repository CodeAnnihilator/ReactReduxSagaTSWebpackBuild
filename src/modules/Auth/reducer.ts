import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';
import { authActionTypes } from './constants';

export type AuthState = Readonly<{
  isAuth: boolean;
  permissions: string[];
  userId: string | null;
  caption: string | null;
  pendingAuthRequest: boolean;
}>

const initialState: AuthState = {
  isAuth: false,
  permissions: [],
  userId: null,
  caption: null,
  pendingAuthRequest: false,
}

export type AuthActions = ActionType<typeof actions>;

export default (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case authActionTypes.START_AUTH_REQUEST:
      return {
        ...state,
        pendingAuthRequest: true
      }
    case authActionTypes.STOP_AUTH_REQUEST:
      return {
        ...state,
        pendingAuthRequest: false
      }
    case authActionTypes.LOGIN:
      return {
        ...state,
        isAuth: true
      }
    case authActionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false
      }
    default:
      return state
  }
}