import axios from "axios";
import { request } from "../../utils/Request";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { isPointOutput, isPointOutputArray, PointInput, PointOutput } from "../../types/models/Point";

export async function addPoint(data: Omit<PointInput, "authorId">): Promise<PointOutput> {

	try {
		const response = (await request("/points", "POST", data));

		if(isPointOutput(response)) {
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

export async function getUserPoints(): Promise<PointOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request("/points", "GET")));

		if(isPointOutputArray(response)) {
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