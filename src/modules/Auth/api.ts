import axios from 'axios';

interface authData {
	login: string;
	pass: string;
}

const loginResponse = {
	data: {
		access: "ACCESS_TOKEN",
		refresh: "REFRESH_TOKEN"
	}
}

export const loginRequest = (authData: authData) => Promise.resolve(loginResponse)

const refreshTokenResponse = {
	data: {
		access: "REFRESHED_ACCESS_TOKEN"
	}
}

export const refreshTokenRequest = () => {
	console.log("REFRESH TOKEN REQUEST");
	return Promise.resolve(refreshTokenResponse)
}


const verifiedToken = {
	data: {
		exp: 1559816838589,
		user_id: 322,
		caption: "Сталин",
		permissions: ["i.can.do.anything"]
	}
}

export const verifyTokenRequest = () => {
	console.log("VERIFY TOKEN REQUEST");
	const validToken = Math.random() > 0.4;
	return new Promise((resolve, reject) => {
		if(validToken) resolve(verifiedToken);
		const error = {
			errors: {
				msg: "Ошибка авторизации"
			}
		}
		reject(error)
	})
}
