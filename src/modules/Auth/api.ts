import axios from 'axios';

interface IAuthData {
	login: string;
	pass: string;
}

export const loginRequest = (authData: IAuthData) => axios.get('https://jsonplaceholder.typicode.com/posts');
export const refreshTokenRequest = () => axios.get('https://jsonplaceholder.typicode.com/posts');
export const verifyTokenRequest = () => axios.get('https://jsonplaceholder.typicode.com/posts');
