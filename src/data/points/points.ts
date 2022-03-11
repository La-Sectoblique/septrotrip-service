import axios from "axios";
import { request } from "../../utils/Request";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { isPointOutput, isPointOutputArray, PointInput, PointOutput } from "../../types/models/Point";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";
import InexistantResourceError from "../../types/errors/InexistantResourceError";

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
		// obligé de faire une copie, sinon le compilateur rale
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

export async function updatePoint(id: number, data: PointInput) {

	try {
		const response = (await request(`/points/${id}`, "PUT", data));

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
				throw { message: error.response?.data.message, code: 400, name: "NoIdProvidedError" } as NoIdProvidedError;
			}
			else if (error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

export async function deletePoint(id: number) {

	try {
		const response = (await request(`/points/${id}`, "DELETE"));

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
				throw { message: error.response?.data.message, code: 400, name: "NoIdProvidedError" } as NoIdProvidedError;
			}
			else if (error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}