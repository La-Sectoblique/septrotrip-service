import axios from "axios";
import { request } from "../../utils/Request";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import { isLogbookOutput, isLogbookOutputArray, LogbookInput, LogbookOutput } from "../../types/models/Logbook";

export async function createLogbook(data: Omit<LogbookInput, "authorId">): Promise<LogbookOutput> {

	try {
		const response = (await request("/logbooks", "POST", data));

		if(isLogbookOutput(response)) {
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

export async function getLogbooks(): Promise<LogbookOutput[]> {
	try {
		// obligé de faire une copie, sinon le compilateur rale     
		const response = JSON.parse(JSON.stringify(await request("/logbooks", "GET")));

		if(isLogbookOutputArray(response)) {
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

export async function updateLogbook(id: number, data: Omit<LogbookInput, "authorId">): Promise<LogbookOutput> {

	try {
		const response = (await request(`/logbooks/${id}`, "PUT", data));

		if(isLogbookOutput(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	}
	catch(error) {

		if(axios.isAxiosError(error)) {
			if(error.response?.status === 400) {
				throw { message: error.response?.data.message, code: 400, name: "NoIdProvidedError" } as NoIdProvidedError;
			}
			else if (error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

export async function getLogbook(id: number): Promise<LogbookOutput> {

	try {
		const response = (await request(`/logbooks/${id}`, "GET"));

		if(isLogbookOutput(response)) {
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
			else if (error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

export async function deleteLogbook(id: number) {

	id;

	throw new Error("Not yet implemented héhé");

	// try {
	// 	const response = (await request(`/points/${id}`, "DELETE"));

	// 	if(isPointOutput(response)) {
	// 		return response;
	// 	}
	// 	else {
	// 		throw new Error(JSON.stringify(response));
	// 	}
	// }
	// catch(error) {

	// 	if(axios.isAxiosError(error)) {
	// 		if(error.response?.status === 400) {
	// 			throw { message: error.response?.data.message, code: 400, name: "NoIdProvidedError" } as NoIdProvidedError;
	// 		}
	// 		else if (error.response?.status === 404) {
	// 			throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
	// 		}
	// 	}

	// 	throw error;	
	// }
}