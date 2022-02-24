import { isUserOutput, UserInput, UserOutput } from "../types/models/User";
import axios from "axios";
import { request } from "../utils/Request";
import InvalidBodyError from "../types/errors/InvalidBodyError";

export async function register( data: UserInput): Promise<UserOutput> {

	try {
		const response = (await request("/register", "POST", data));

		if(isUserOutput(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	}
	catch(error) {

		if(axios.isAxiosError(error)) {
			if(error.response?.status === 400) {
				throw { message: error.response?.data.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError;
			}
		}

		throw error;	
	}
}