import axios from "axios";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import InvalidBodyError from "../../types/errors/InvalidBodyError";
import { isLogbookEntryOutput, isLogbookEntryOutputArray, LogbookEntryInput, LogbookEntryOutput } from "../../types/models/Logbook";
import { request } from "../../utils/Request";


export async function addLogbookEntry(data: LogbookEntryInput): Promise<LogbookEntryOutput> {

	try {
		const response = (await request(`/logbooks/${data.logbookId}/entries`, "POST", data));

		if(isLogbookEntryOutput(response)) {
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
			else if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;	
	}
}

export async function getLogbookEntries(id: number): Promise<LogbookEntryOutput[]>  {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/logbooks/${id}/entries`, "GET")));

		if(isLogbookEntryOutputArray(response)) {
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

export async function getLogbookEntry(logbookId: number, entryId: number): Promise<LogbookEntryOutput> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/logbooks/${logbookId}/entries/${entryId}`, "GET")));

		if(isLogbookEntryOutput(response)) {
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

export async function updateLogbookEntry(logbookId: number, entryId: number, data: Partial<Omit<LogbookEntryInput, "logbookId">>): Promise<LogbookEntryOutput> {
	try {
		const response = JSON.parse(JSON.stringify(await request(`/logbooks/${logbookId}/entries/${entryId}`, "PUT", data)));

		if(isLogbookEntryOutput(response)) {
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
			else if(error.response?.status === 404) {
				throw { message: error.response?.data.message, code: 404, name: "InexistantResourceError" } as InexistantResourceError;
			}
		}

		throw error;
	}
}

export async function deleteLogbookEntry(logbookId: number, entryId: number): Promise<void> {
	try {
		await request(`/logbooks/${logbookId}/entries/${entryId}`, "DELETE");
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