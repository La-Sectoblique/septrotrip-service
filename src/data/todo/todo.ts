import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";
import { isTodoEntryOutput, isTodoEntryOutputArray, TodoEntryInput, TodoEntryOutput } from "../../types/models/Todo";
import { isApiResponse } from "../../types/utils/Api";
import { request } from "../../utils/Request";

/**
 * Retourne toutes les choses a faire dans un voyage
 * @param tripId identifiant du voyage
 * @returns toutes les choses a faire dans un voyage
 */
export async function getTodoEntriesByTripId(tripId: number): Promise<TodoEntryOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}/todo`, "GET")));

		if(isTodoEntryOutputArray(response)) {
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
 * Créé une nouvelle chose a faire 
 * @param entry informations pour créer une entrée
 * @returns 
 */
export async function addTodoEntry(entry: TodoEntryInput): Promise<TodoEntryOutput> {
	try {
		const response = await request(`/trips/${entry.tripId}/todo`, "POST", entry);

		if(isTodoEntryOutput(response)) {
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
			if(error.response?.status === 400) {
				throw { message: error.response?.data.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError;
			}
		}

		throw error;
	}
}

/**
 * Retourne les informations d'une seule entrée
 * @param todoEntryId identifiant de l'entrée
 * @returns l'entrée
 */
export async function getTodoEntryById(todoEntryId: number): Promise<TodoEntryOutput> {
	try {
		const response = await request(`/todo/${todoEntryId}`, "GET");

		if(isTodoEntryOutput(response)) {
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
 * Modifie une entrée de choses a faire
 * @param todoEntryId identifiant de l'entrée
 * @param newAttributes attributs a modifier
 * @returns 
 */
export async function updateTodoEntry(todoEntryId: number, newAttributes: Partial<TodoEntryInput>): Promise<TodoEntryOutput> {
	try {
		const response = await request(`/todo/${todoEntryId}`, "PUT", newAttributes);

		if(isTodoEntryOutput(response)) {
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
 * Supprime une entrée a faire
 * @param todoEntryId 
 * @returns 
 */
export async function deleteTodoEntry(todoEntryId: number): Promise<void> {
	try {
		const response = await request(`/todo/${todoEntryId}`, "DELETE");

		if(isApiResponse(response)) {
			return;
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