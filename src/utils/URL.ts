import { GenericObjectWithStringsAndNumber } from "../types/utils/Object";


export function setQueryURL(baseURL: string, queryParams: GenericObjectWithStringsAndNumber): string {

	let resURL = baseURL;

	let firstParam = true;

	for(const [key, value] of Object.entries(queryParams)) {
		resURL = resURL.concat(firstParam ? "?" : "&").concat(`${key}=${value}`);

		if(firstParam) 
			firstParam = false;
	}

	return resURL;
}