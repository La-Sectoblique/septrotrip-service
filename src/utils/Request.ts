import axios, { AxiosResponse, Method } from "axios";
import InvalidTokenError from "../types/errors/InvalidTokenError";
import UnauthorizedError from "../types/errors/UnauthorizedError";
import { GenericJsonObject } from "../types/utils/Object";
import { GeneralBodyFormat } from "../utils/FormData";
import { generateFormData } from "./Body";
import { params } from "./Config";
import { log } from "./Log";

/**
 * Effectue une requête à l'API septotrip et gère le token
 * 
 * @param url chemin à appeler
 * @param method methode de l'appel
 * @param data données a envoyer
 * @returns résultat de la requête 
 */
export async function request(url: string, method: Method, data?: object): Promise<AxiosResponse<unknown, unknown>> {

	log(`${method} ${url}`, "request()");

	if(data) {
		for(const [key, value] of Object.entries(data)) {
			if( value === undefined ) {
				(data as GenericJsonObject)[key] = null;
			}
		}

		log(`data : ${JSON.stringify(data)}`, "request()");
	}

	try {
		const response = await axios.request({
			method,
			data,
			url
		});
	
		if(response.headers["x-renewed-jwt-token"]) {
			axios.defaults.headers.common.Authorization = `Bearer ${response.headers["x-renewed-jwt-token"]}`;
			params.storeToken(response.headers["x-renewed-jwt-token"]);
		}
	
		return response.data;
	}
	catch(error) {

		if(axios.isAxiosError(error)) {
			if(error.response?.status === 401) {
				throw { message: error.response?.data.message, code: 401, name: "InvalidTokenError" } as InvalidTokenError;
			}
			if(error.response?.status === 403) {
				throw { message: error.response?.data.message, code: 403, name: "UnauthorizedError" } as UnauthorizedError;
			}
		}

		throw error;
	}


}

/**
 * Upload un fichier et d'autres informations 
 * 
 * @param url chemin a appeler 
 * @param method methode de l'appel
 * @param data données a envoyer
 * @returns résultat de la requete
 */
export async function upload(url: string, method: Method, data: FormData | object): Promise<AxiosResponse<unknown, unknown>> {

	log(`${method} ${url}`, "upload()");

	try {

		if(typeof data === "object") {
			data = generateFormData(data as GeneralBodyFormat);
		}

		if(data) {
			log(`data : ${data}`, "upload()");
		}

		const response = await axios.request({
			url,
			method,
			headers: {
				"Content-Type": "multipart/form-data"
			},
			data,
			// cette fonction est obligatoire pour le client mobile
			transformRequest: formData => formData 
		});

		if(response.headers["x-renewed-jwt-token"]) {
			axios.defaults.headers.common.Authorization = `Bearer ${response.headers["x-renewed-jwt-token"]}`;
			params.storeToken(response.headers["x-renewed-jwt-token"]);
		}

		return response.data;
	}
	catch(error) {
		if(axios.isAxiosError(error)) {
			if(error.response?.status === 401) {
				throw { message: error.response?.data.message, code: 401, name: "InvalidTokenError" } as InvalidTokenError;
			}
			if(error.response?.status === 403) {
				throw { message: error.response?.data.message, code: 403, name: "UnauthorizedError" } as UnauthorizedError;
			}
		}

		throw error;
	}
}


