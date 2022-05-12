import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import { DayInput, DayOutput, isDayOutput, isDayOutputArray } from "../../types/models/Day";
import { isPointOutputArray, PointOutput } from "../../types/models/Point";
import { request } from "../../utils/Request";


/**
 * Retourne un jour en fonction de son identifiant
 * @param dayId identifiant du jour
 * @returns le jour correspondant a l'identifiant
 */
export async function getDayByID(dayId: number): Promise<DayOutput> {
	try {
		const response = await request(`/dayId/${dayId}`, "GET");

		if(isDayOutput(response)) {
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
 * Modifie les propriétés d'un jour
 * @param dayId identifiant du jour a modifier
 * @param payload propriétés a modifier
 * @returns le jour modifié
 */
export async function updateDay(dayId: number, payload: Partial<DayInput>): Promise<DayOutput> {
	try {
		const response = await request(`/dayId/${dayId}`, "PUT", payload);

		if(isDayOutput(response)) {
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
 * Retourne les points lié a ce jour
 * @param dayId identifiant du jour
 * @returns les points de ce jour
 */
export async function getPointsByDay(dayId: number): Promise<PointOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/days/${dayId}/points`, "GET")));

		if(isPointOutputArray(response)) {
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
 * Retourne tout les jours associé a un point d'intéret
 * @param pointId identifiant du point d'intéret
 * @returns les jours associé au point d'intéret 
 */
export async function getDaysByPoint(pointId: number): Promise<DayOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/points/${pointId}/days`, "GET")));

		if(isDayOutputArray(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	} catch(error) {
		if(axios.isAxiosError(error)) {
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}

/**
 * Modifie les jours associé a un point
 * @param pointId identifiant du point a modifier
 * @param dayIds identifiants des jours liés à ce point
 * @returns les jours associé au point d'intéret 
 */
export async function updatePointDays(pointId: number, dayIds: number[]): Promise<DayOutput[]> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/points/${pointId}/days`, "PUT", dayIds)));

		if(isDayOutputArray(response)) {
			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	} catch(error) {
		if(axios.isAxiosError(error)) {
			if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}
