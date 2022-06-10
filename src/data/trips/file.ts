import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { FileMetadataInput, FileMetadataOutput, isFileMetadataOuput, isFileMetadataOuputArray } from "../../types/models/File";
import { isApiResponse } from "../../types/utils/Api";
import { params } from "../../utils/Config";
import { FileFormat, GeneralBodyFormat } from "../../utils/FormData";
import { getTripFilesOptions } from "../../utils/Parameters";
import { request, upload } from "../../utils/Request";
import { setQueryURL } from "../../utils/URL";


export async function uploadFile(metadata: FileMetadataInput, data: FileFormat): Promise<FileMetadataOutput> {
	try {
		const response = await upload(`/trips/${metadata.tripId}/files`, "POST", { file: data, ...metadata } as GeneralBodyFormat);

		if(isFileMetadataOuput(response)) {
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
 * Retourne tout les fichiers lié à un voyage
 * @param tripId identifiant du voyage
 * @returns toutes les métadonnées des fichiers du voyage
 */
export async function getTripFiles(tripId: number, options: getTripFilesOptions = {}): Promise<FileMetadataOutput[]> {
	try {

		const url = setQueryURL(`/trips/${tripId}/files`, options);

		const response = JSON.parse(JSON.stringify(await request(url, "GET")));

		if(isFileMetadataOuputArray(response)) {
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
 * Retourne les Metadonnées d'un fichier
 * @param tripId identifiant du voyage du fichier
 * @param fileId identifiant du fichier
 * @returns métadonnées du fichier
 */
export async function getFileMetadata(tripId: number, fileId: number): Promise<FileMetadataOutput> {
	try {
		const response = await request(`/trips/${tripId}/files/${fileId}`, "GET");

		if(isFileMetadataOuput(response)) {
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
 * Modifie les Metadonnées d'un fichier
 * @param tripId identifiant du voyage du fichier
 * @param fileId identifiant du fichier
 * @param metadata nouvelles métadonnées
 * @returns métadonnées du fichier
 */
export async function modifyFileMetadata(tripId: number, fileId: number, metadata: Partial<FileMetadataInput>): Promise<FileMetadataOutput> {
	try {
		const response = await request(`/trips/${tripId}/files/${fileId}`, "PUT", metadata);

		if(isFileMetadataOuput(response)) {
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
 * Supprime un fichier
 * @param tripId identifiant du voyage du fichier
 * @param fileId identifiant du fichier
 */
export async function deleteFile(tripId: number, fileId: number): Promise<void> {
	try {
		const response = await request(`/trips/${tripId}/files/${fileId}`, "DELETE");

		if(isApiResponse(response)) {
			return;
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
 * Retourne le lien vers un fichier 
 * @param tripId identifiant du voyage du fichier
 * @param fileId identifiant du fichier
 * @returns lien vers un fichier
 */
export async function getFileLink(tripId: number, fileId: number): Promise<string> {
	const metadata = await getFileMetadata(tripId, fileId);

	if(!metadata) {
		throw new Error("ERROR : metadata est vide");
	}

	if(!metadata.tempFileId) {
		throw new Error("ERROR : aucun tempFileId retourné par l'API");
	}

	return params.url.concat("/files/").concat(metadata.tempFileId);
}