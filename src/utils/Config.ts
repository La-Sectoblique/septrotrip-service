import axios from "axios";
import Platform from "./Platform";

/**
 * Contient toutes les informations dont a besoin le package pour fonctionner
 * 
 * @interface
 * @
 */
export interface InitParameters {
	/**
	 * L'URL de l'api Septotrip
	 */
	url: string;
	/**
	 * La plateform sur laquelle tourne le projet
	 */
	platform: Platform;
	/**
	 * La fonction chargée de stocker le token d'authentification dans la mémoire
	 */
	storeToken: (token: string) => Promise<void> | void;
	/**
	 * La fonction permettant de récupérer le token d'authentification
	 */
	getToken: () => Promise<string> | string;
}

/**
 * Paramètres actuelles du package 
 */
export let params: InitParameters;

/**
 * Initialise le package
 * 
 * @param payload Toutes les informations de bases dont a besoin le package
 */
export async function init(payload: InitParameters) {
	axios.defaults.baseURL = payload.url;
	axios.defaults.headers.common.Authorization = `Bearer ${await payload.getToken()}`;

	params = payload; 
}