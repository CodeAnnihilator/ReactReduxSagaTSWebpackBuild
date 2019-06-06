import axios from 'axios';

interface authData {
  login: string;
  pass: string;
}

// export const loginRequest = (authData: authData) => axios.post("/somewhere", authData)
export const loginRequest = (authData: authData) => axios.get("https://jsonplaceholder.typicode.com/posts");
export const refreshTokenRequest = () => axios.get("https://jsonplaceholder.typicode.com/posts");
export const verifyTokenRequest = () => axios.get("https://jsonplaceholder.typicode.com/posts");