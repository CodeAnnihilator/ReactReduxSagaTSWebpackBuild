import axios from 'axios';

interface authData {
	login: string;
	pass: string;
}

export const loginRequest = (authData: authData) => axios.post("http://localhost:4000/auth/login", authData);

export const refreshTokenRequest = (refreshToken: string) => axios.post("http://localhost:4000/auth/refresh", { refresh: refreshToken})

export const verifyTokenRequest = (accessToken: string) => axios.post("http://localhost:4000/auth/verify", {token: accessToken})