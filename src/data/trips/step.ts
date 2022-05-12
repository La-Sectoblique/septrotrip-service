import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { DayOutput, isDayOutputArray } from "../../types/models/Day";
import { isStepOutput, StepInput, StepOutput, isStepOutputArray } from "../../types/models/Step";
import { request } from "../../utils/Request";

/**
 * Créé une étape de voyage
 * @param tripId identifiant du voyage
 * @param data données de l'étape
 * @returns l'étape nouvellement créée
 */
export async function addStep(tripId: number, data: Omit<StepInput, "tripId">): Promise<StepOutput> {
	try {
		const response = (await request(`/trips/${tripId}/steps`, "POST", data));

		if(isStepOutput(response)) {
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
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}

/**
 * Retourne toutes les étapes d'un voyage
 * @param tripId identifiant du voyage
 * @returns toutes les étapes, dans l'ordre
 */
export async function getTripSteps(tripId: number): Promise<StepOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/trips/${tripId}/steps`, "GET")));

		if(isStepOutputArray(response)) {
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
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}

/**
 * Retourne l'étape correspondant a l'id donné en paramètre
 * @param stepId identifiant de l'étape
 * @returns l'étape correspondant
 */
export async function getStepById(stepId: number): Promise<StepOutput> {
	try {
		const response = (await request(`/steps/${stepId}`, "GET"));

		if(isStepOutput(response)) {
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
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}

/**
 * Modifie les données d'une étape
 * @param stepId identifiant de l'étape
 * @param data données a modifier de l'étape
 * @returns l'étape modifiée
 */
export async function updateStep(stepId: number, data: Partial<StepInput>): Promise<StepOutput> {
	try {
		const response = (await request(`/steps/${stepId}`, "PUT", data));

		if(isStepOutput(response)) {
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
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}

/**
 * Supprime une étape
 * @param stepId identifiant de l'étape
 */
export async function deleteStep(stepId: number): Promise<void> {
	try {
		await request(`/steps/${stepId}`, "DELETE");
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
 * Obtient tout les jours d'une étape
 * @param stepId identifiant de l'étape
 * @returns tous les jours de l'étape
 */
export async function getStepDays(stepId: number): Promise<DayOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/steps/${stepId}/days`, "GET")));

		if(isDayOutputArray(response)) {
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

export async function updateStepOrder(stepId: number, newIndex: number): Promise<StepOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/steps/${stepId}/order`, "PUT", { newOrder: newIndex })));

		if(isStepOutputArray(response)) {
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