import axios from "axios";

interface InitParameters {
	url: string;
	storeToken: (token: string) => void,
	getToken: () => string
}

export let params: InitParameters;

export function init(payload: InitParameters) {
	axios.defaults.baseURL = payload.url;
	axios.defaults.headers.common.Authorization = `Bearer ${payload.getToken()}`;

	params = payload; 
}