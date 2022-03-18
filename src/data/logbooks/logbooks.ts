import axios from "axios";
import { request } from "../../utils/Request";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import { isLogbookOutput, isLogbookOutputArray, LogbookInput, LogbookOutput } from "../../types/models/Logbook";

/**
 * Créé un nouveau journal de voyage
 * @param data données du journal
 * @returns le journal créé
 */
export async function createLogbook(data: Omit<LogbookInput, "authorId">): Promise<LogbookOutput> {

	try {
		const response = (await request(`/trips/${data.tripId}/logbooks`, "POST", data));

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

/**
 * @returns les journaux de l'utilisateurs
 */
export async function getUserLogbooks(): Promise<LogbookOutput[]> {
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

/**
 * @param tripId identifiant du voyage
 * @returns les journaux créés par l'utilisateur pour ce voyage
 */
export async function getTripLogbooks(tripId: number): Promise<LogbookOutput[]> {
	try {
		// obligé de faire une copie, sinon le compilateur rale     
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}/logbooks`, "GET")));

		if(isLogbookOutputArray(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	}
	catch(error) {
		if(axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

/**
 * Met a jour les informations d'un journal
 * @param id identifiant du journal
 * @param data données du journal
 * @returns le journal modifié
 */
export async function updateLogbook(id: number, data: Partial<Omit<LogbookInput, "authorId">>): Promise<LogbookOutput> {

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

/**
 * Retourne un journal spécifique
 * @param id identifiant du journal
 * @returns 
 */
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

/**
 * Supprime un journal
 * @param id identifiant du journal
 */
export async function deleteLogbook(id: number): Promise<void> {

	try {
		await request(`/logbooks/${id}`, "DELETE");
	}
	catch(error) {
		if(axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}