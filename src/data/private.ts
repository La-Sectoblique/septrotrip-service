import { isApiResponse } from "../types/utils/Api";
import { request } from "../utils/Request";

export async function p(): Promise<object> {

	try {
		const response = (await request("/private", "GET"));

		if(isApiResponse(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	}
	catch(error) {
		throw error;	
	}
}