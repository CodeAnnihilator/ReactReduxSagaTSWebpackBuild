import axios from 'axios';

import { store } from 'main';
import { login, logout } from 'modules/Auth/actions'

const accessToken = localStorage.getItem('access_token');

axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

axios.interceptors.response.use(function(response) {
  const expiresIn = store.getState().auth.tokenExpiration;
  if(expiresIn){
    console.log("EXPIRES IN: ", expiresIn);
    console.log(expiresIn - Date.now());
  }
  console.log("TOKEN IS FINE");
	return response;
},
	function(error){
    const isAuth = store.getState().auth.isAuth;
    const expiresIn = store.getState().auth.tokenExpiration;
    if(expiresIn){
      console.log('CHECK TOKEN EXPIRATION');
      console.log("EXPIRES IN: ", expiresIn);
      console.log(expiresIn - Date.now());
    }

		const errorResponse = error.response
    if (isAuth && isTokenExpiredError(errorResponse)) {
      console.log('token is expired');
      return resetTokenAndReattemptRequest(error)
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error)
	}
)

function isTokenExpiredError(errorResponse: any): boolean {
  const expiration = store.getState().auth.tokenExpiration ;
  const now = Date.now();
  if(expiration){
    return expiration < now;
  }
  return true;
}

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers:any = [];

async function resetTokenAndReattemptRequest(error: any) {
  try {
    const { response: errorResponse } = error;
		// const resetToken = await TokenUtils.getResetToken(); // Your own mechanism to get the refresh token to refresh the JWT token
		const resetToken = localStorage.getItem('refresh_token');
    if (!resetToken) {
      // We can't refresh, throw the error anyway
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
    /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber((access_token: string) => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await axios({
        method: 'post',
        url: `http://localhost:4000/auth/refresh`,
        data: {
          token: resetToken 
        }
      });
      console.log(response);
      if (!response.data) {
        return Promise.reject(error);
      }
      const newToken = response.data.access;
      console.log('newToken', newToken);
      try {
        const verifiedToken = await axios.post("http://localhost:4000/auth/verify", {token: newToken});
        const {data: {exp, user_id, caption, permissions}} = verifiedToken;
        store.dispatch(login(exp, user_id, caption, permissions))
      } catch (error) {
        store.dispatch(logout());
      }
      localStorage.removeItem('access_token');
      localStorage.setItem('access_token', newToken); // save the newly refreshed token for other requests to use
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(newToken);
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(access_token: string) {
	// When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach((callback:any) => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback: any) {
  subscribers.push(callback);
}