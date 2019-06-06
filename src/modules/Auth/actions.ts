import {action} from 'typesafe-actions';

import {authActionTypes} from './constants';

// export const sendAuthData = action(authActionTypes.SEND_AUTH_DATA);

export const sendAuthData = (login: string, pass: string) => {
  return {
    type: authActionTypes.SEND_AUTH_DATA,
    login,
    pass
  }
}

export const startAuthRequest = action(authActionTypes.START_AUTH_REQUEST);
export const stopAuthRequest = action(authActionTypes.STOP_AUTH_REQUEST);
export const login = action(authActionTypes.LOGIN);
export const logout = action(authActionTypes.LOGOUT);