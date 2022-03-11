import axios, { AxiosResponse, Method } from "axios";
import InvalidTokenError from "../types/errors/InvalidTokenError";
import { params } from "./Config";

export async function request(url: string, method: Method, data?: object): Promise<AxiosResponse<unknown, unknown>> {

	try {
		const response = await axios.request({
			method,
			data,
			url
		});
	
		if(response.headers["x-renewed-jwt-token"]) {
			axios.defaults.headers.common.Authorization = `Bearer ${response.headers["x-renewed-jwt-token"]}`;
			params.storeToken(response.headers["x-renewed-jwt-token"]);
		}
	
		return response.data;
	}
	catch(error) {

		if(axios.isAxiosError(error)) {
			if(error.response?.status === 401) {
				throw { message: error.response?.data.message, code: 401, name: "InvalidTokenError" } as InvalidTokenError;
			}
		}

		throw error;
	}


}