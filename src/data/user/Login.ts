import axios from "axios";
import { request } from "../../utils/Request";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { ApiResponse, isApiResponse, isSuccessLoginResponse, SuccessLoginResponse } from "../../types/utils/Api";
import { LoginCredentials, RegisterCredentials } from "../../types/utils/Credentials";
import RessourceAlreadyExistError from "../../types/errors/RessourceAlreadyExistError";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidPasswordError from "../../types/errors/InvalidPasswordError";
import { params } from "../..";

/**
 * S'inscrire au service Septotrip
 *  
 * @param data informations d'inscription 
 * @returns 
 */
export async function register(data: RegisterCredentials): Promise<ApiResponse> {

	try {
		const response = (await request("/register", "POST", data));

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
			else if (error.response?.status === 409) {
				throw { message: error.response?.data.message, code: 409, name: "RessourceAlreadyExistError" } as RessourceAlreadyExistError;
			}
		}

		throw error;	
	}
}

/**
 * Se connecte au service Septotrip
 *  
 * @param data informations de connexion
 * @returns informations de connexion (token, adresse email, session)
 */
export async function login(data: LoginCredentials): Promise<SuccessLoginResponse> {
	try {
		const response = (await request("/login", "POST", data));

		if(isSuccessLoginResponse(response)) {

			axios.defaults.headers.common.Authorization = `Bearer ${response.session.token}`;
			params.storeToken(response.session.token);

			return response;
		}
		else {
			throw new Error(JSON.stringify(response));
		}
	}
	catch(error) {
		if(axios.isAxiosError(error)) {
			if(error.response?.status === 400) {
				if(error.response?.data?.name === "InvalidBodyError")
					throw { message: error.response?.data.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError;
				if(error.response?.data?.name === "InvalidPasswordError")
					throw { message: error.response?.data.message, code: 400, name: "InvalidPasswordError" } as InvalidPasswordError;
			}

			if (error.response?.status === 404) {
				throw ({ message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError);
			}
		}

		throw error;	
	}
}