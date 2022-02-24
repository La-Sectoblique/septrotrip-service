import axios, { AxiosResponse, Method } from "axios";
import { API_URL } from "./Config";


export async function request(url: string, method: Method, data: object): Promise<AxiosResponse<unknown, unknown>> {
	return (await axios.request({
		baseURL: API_URL,
		method,
		data,
		url
	})).data;
}