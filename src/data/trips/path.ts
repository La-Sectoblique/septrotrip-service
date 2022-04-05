import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { isPathOuput, PathInput, PathOutput } from "../../types/models/Path";
import { request } from "../../utils/Request";

/**
 * Retourne le chemin vers la prochaine étape
 * @param stepId identifiant de l'étape actuelle
 * @returns le chemin vers l'étape suivante
 */
export async function getPathToNextStep(stepId: number): Promise<PathOutput> {

	try {
		const response = await request(`/steps/${stepId}/path/after`, "GET");

		if(isPathOuput(response)) {
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
 * Retourne le chemin vers la précédente étape
 * @param stepId identifiant de l'étape actuelle
 * @returns le chemin vers l'étape précédente
 */
export async function getPathToPreviousStep(stepId: number): Promise<PathOutput> {
	try {
		const response = await request(`/steps/${stepId}/path/before`, "GET");

		if(isPathOuput(response)) {
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
 * Retourne le chemin correspondant à l'id donné
 * @param pathId identifiant du chemin
 * @returns chemin correspondant
 */
export async function getPathById(pathId: number): Promise<PathOutput> {
	try {
		const response = await request(`/paths/${pathId}`, "GET");

		if(isPathOuput(response)) {
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
 * Modifie les données d'un chemin vers une étape
 * @param pathId identifiant du chemin
 * @param payload données a modifier
 * @returns chemin ainsi modifié
 */
export async function updatePath(pathId: number, payload: Partial<PathInput>): Promise<PathOutput> {
	try {
		const response = await request(`/paths/${pathId}`, "PUT", payload);

		if(isPathOuput(response)) {
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