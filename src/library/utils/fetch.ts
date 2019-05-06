import axios from 'axios';

export const backendURI = 'http://dummyuri';

export const fetch = axios.create({
	baseURL: backendURI,
});
