import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { isLogbookEntryOutput, isLogbookEntryOutputArray, LogbookEntryInput, LogbookEntryOutput } from "../../types/models/Logbook";
import { request } from "../../utils/Request";

/**
 * Ajoute une entrée dans le journal du voyage
 * @param data données de l'entrée
 * @returns l'entrée créé
 */
export async function createLogbookEntry(data: LogbookEntryInput): Promise<LogbookEntryOutput> {

	try {
		const response = (await request(`/trips/${data.tripId}/logbook`, "POST", data));

		if(isLogbookEntryOutput(response)) {
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
			else if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

/**
 * Retourne toutes les entrées d'un journal
 * @param tripId identifiant du voyage
 * @returns entrées du journal
 */
export async function getTripLogbookEntries(tripId: number): Promise<LogbookEntryOutput[]>  {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}/logbook`, "GET")));

		if(isLogbookEntryOutputArray(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	}
	catch(error) {

		if(axios.isAxiosError(error)) {
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

/**
 * Retourne une entrée de journal spécifique
 * @param entryId identifiant de l'entrée
 * @returns entrée du journal
 */
export async function getLogbookEntry(entryId: number): Promise<LogbookEntryOutput> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/logbook/${entryId}`, "GET")));

		if(isLogbookEntryOutput(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	}
	catch(error) {

		if(axios.isAxiosError(error)) {
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

/**
 * Met a jour les données d'une entrée 
 * @param entryId identifiant de l'entrée
 * @param data données de l'entrée
 * @returns l'entrée modifiée
 */
export async function updateLogbookEntry(entryId: number, data: Partial<LogbookEntryInput>): Promise<LogbookEntryOutput> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/logbook/${entryId}`, "PUT", data)));

		if(isLogbookEntryOutput(response)) {
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
			else if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}

/**
 * Supprime une entrée du journal
 * @param entryId identifiant de l'entrée
 */
export async function deleteLogbookEntry(entryId: number): Promise<void> {
	try {
		await request(`/logbook/${entryId}`, "DELETE");
	}
	catch(error) {

		if(axios.isAxiosError(error)) {
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}