import axios from "axios";
import { request } from "../../utils/Request";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { isPointOutput, isPointOutputArray, PointInput, PointOutput } from "../../types/models/Point";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";
import InexistantResourceError from "../../types/errors/InexistantResourceError";

/**
 * Ajoute un point d'intéret sur la carte
 * @param tripId identifiant du voyage
 * @param data données du point
 * @returns le point qui a été créé
 */
export async function addPoint(tripId: number, data: Omit<PointInput, "authorId" | "tripId">): Promise<PointOutput> {

	try {
		const response = (await request(`/trips/${tripId}/points`, "POST", data));

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

/**
 * Retourne tout les points créé par l'utilisateur lors de ce voyage
 * @param tripId identifiant du voyage
 * @returns points créé par l'utilisateur lors de ce voyage
 */
export async function getUserPoints(tripId: number): Promise<PointOutput[]> {
	try {
		// obligé de faire une copie, sinon le compilateur rale
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}/points`, "GET")));

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

/**
 * Modifie un point
 * @param tripId identifiant du voyage
 * @param pointId identifiant du point
 * @param data nouvelles données
 * @returns le point modifié
 */
export async function updatePoint(tripId: number, pointId: number, data: Partial<PointInput>): Promise<PointOutput> {

	try {
		const response = (await request(`/trips/${tripId}/points${pointId}`, "PUT", data));

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

/**
 * Supprime un point
 * @param tripId identifiant du voyage
 * @param pointId identifiant du point
 * @returns 
 */
export async function deletePoint(tripId: number, pointId: number) {

	try {
		const response = (await request(`/trips/${tripId}/points${pointId}`, "DELETE"));

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