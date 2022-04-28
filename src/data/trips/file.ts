import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { FileMetadataInput, FileMetadataOutput, isFileMetadataOuput } from "../../types/models/File";
import { FileFormat, GeneralBodyFormat } from "../../utils/FormData";
import { upload } from "../../utils/Request";


export async function uploadFile(metadata: FileMetadataInput, data: FileFormat): Promise<FileMetadataOutput> {
	try {
		const response = await upload(`/trips/${metadata.tripId}/file`, "POST", { file: data, ...metadata } as GeneralBodyFormat);

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