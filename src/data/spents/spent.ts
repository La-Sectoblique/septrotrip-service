import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";
import { isSpentOutput, isSpentOutputArray, SpentInput, SpentOutput } from "../../types/models/Spent";
import { isUserOutputArray, UserOutput } from "../../types/models/User";
import { request } from "../../utils/Request";

/**
 * Retourne toutes les dépenses faites sur un voyage
 * @param tripId identifiant du voyage
 * @returns toutes les dépenses du voyage
 */
export async function getSpentByTrip(tripId: number): Promise<SpentOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}/spents`, "GET")));

		if(isSpentOutputArray(response)) {
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
 * Crée une dépense pour un voyage
 * @param spent objet dépenses
 * @returns la dépense créée
 */
export async function newSpent(spent: Omit<SpentInput, "authorId"> & { beneficiaries: number[] }): Promise<SpentOutput> {
	try {
		const response = await request(`/trips/${spent.tripId}/spents`, "POST", spent);

		if(isSpentOutput(response)) {
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
 * Modifie les données d'une dépense
 * @param spentId identifiant de la dépense
 * @param data données de la dépense
 * @returns dépense nouvellement modifiée
 */
export async function updateSpent(spentId: number, data: Partial<SpentInput>): Promise<SpentOutput> {
	try {
		const response = (await request(`/spents/${spentId}`, "PUT", data));

		if(isSpentOutput(response)) {
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
 * Supprime une dépense
 * @param spentId identifiant de la dépense
 */
export async function deleteSpent(spentId: number): Promise<void> {
	try {
		await request(`/spents/${spentId}`, "DELETE");
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
 * Retourne une dépense précise
 * @param spentId identifiant de la dépense
 * @returns la dépense adaptée
 */
export async function getSpentById(spentId: number): Promise<SpentOutput> {
	try {
		const response = await request(`/spents/${spentId}`, "GET");

		if(isSpentOutput(response)) {
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
 * retourne tout les bénéficiaires d'une dépense 
 * @param spentId identifiant de la dépense
 * @returns les bénéficiaires de la dépense
 */
export async function getSpentBeneficiaries(spentId: number): Promise<UserOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/spents/${spentId}/beneficiaries`, "GET")));

		if(isUserOutputArray(response)) {
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
 * Modifie la liste des bénéficiaires d'une dépense
 * @param spentId identifiant de la dépense
 * @param beneficiariesIds liste des identifiants des nouveaux bénéficiaires
 * @returns nouveaux bénéficiaires
 */
export async function updateSpentBeneficiaries(spentId: number, beneficiariesIds: number[]): Promise<UserOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/spents/${spentId}/beneficiaries`, "PUT", beneficiariesIds)));

		if(isUserOutputArray(response)) {
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