import axios from "axios";

interface InitParameters {
	url: string;
	storeToken: (token: string) => Promise<void> | void,
	getToken: () => Promise<string> | string
}

export let params: InitParameters;

export async function init(payload: InitParameters) {
	axios.defaults.baseURL = payload.url;
	axios.defaults.headers.common.Authorization = `Bearer ${await payload.getToken()}`;

	params = payload; 
}