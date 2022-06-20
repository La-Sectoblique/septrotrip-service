import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";
import { isTripOutput, isTripOutputArray, TripInput, TripOutput } from "../../types/models/Trip";
import { Author, isAuthor, isUserOutputArray, UserOutput } from "../../types/models/User";
import { ApiResponse, isApiResponse } from "../../types/utils/Api";
import { request } from "../../utils/Request";

/**
 * Créé un voyage
 * @param data Données du voyage
 * @returns voyage créé
 */
export async function createTrip(data: Omit<TripInput, "authorId">): Promise<TripOutput> {

	try {
		const response = (await request("/trips", "POST", data));

		if(isTripOutput(response)) {
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
 * Retourne tout les voyages publiques
 * @returns 
 */
export async function getAllPublicTrips(): Promise<TripOutput[]> {
	try {
		// obligé de faire une copie, sinon le compilateur rale     
		const response = JSON.parse(JSON.stringify(await request("/trips", "GET")));

		if(isTripOutputArray(response)) {
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
 * Retourne tout les voyages de l'utilisateur
 * @returns 
 */
export async function getUserTrips(): Promise<TripOutput[]> {
	try {
		// obligé de faire une copie, sinon le compilateur rale     
		const response = JSON.parse(JSON.stringify(await request("/trips/me", "GET")));

		if(isTripOutputArray(response)) {
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
 * Retourne un voyage spécifique
 * @param id identifiant du voyage
 */
export async function getTripById(tripId: number): Promise<TripOutput> {
	try {
		// obligé de faire une copie, sinon le compilateur rale     
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}`, "GET")));

		if(isTripOutput(response)) {
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
 * Modifie un voyage
 * @param tripId identifiant du voyage
 * @param data nouvelles données
 * @returns le voyage modifié
 */
export async function updateTrip(tripId: number, data: Partial<TripInput>): Promise<TripOutput> {

	try {
		const response = (await request(`/trips/${tripId}`, "PUT", data));

		if(isTripOutput(response)) {
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
 * @returns 
 */
export async function deleteTrip(tripId: number) {

	try {
		const response = (await request(`/trips/${tripId}`, "DELETE"));

		if(isApiResponse(response)) {
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
 * Retourne les membres qui participe au voyage
 * @param tripId identifiant du voyage
 */
export async function getTravelers(tripId: number): Promise<UserOutput[]> {
	try {
		// obligé de faire une copie, sinon le compilateur rale     
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}/users`, "GET")));

		if(isUserOutputArray(response)) {
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
 * Retourne l'auteur d'un voyage
 * @param tripId identifiant du voyage
 */
export async function getAuthor(tripId: number): Promise<Author> {
	try {
		const response = await request(`/trips/${tripId}/author`, "GET");

		if(isAuthor(response)) {
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
 * Ajoute un voyageur au voyage
 * @param tripId identifiant du voyage
 * @param email adresse de l'utilisateur à ajouter
 * @returns 
 */
export async function addTravelerToTrip(tripId: number, email: string): Promise<ApiResponse> {
	try {
		const response = (await request(`/trips/${tripId}/users`, "POST", { email }));

		if(isApiResponse(response)) {
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
 * Enlève un voyageur
 * @param tripId identifiant du voyage
 * @param userId identifiant de l'utilisateur à enlever du voyage
 * @returns 
 */
export async function removeTraveler(tripId: number, userId: number): Promise<ApiResponse> {

	try {
		const response = (await request(`/trips/${tripId}/users/${userId}`, "DELETE"));

		if(isApiResponse(response)) {
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