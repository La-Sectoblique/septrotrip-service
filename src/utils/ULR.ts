import { GenericObjectWithStrings } from "../types/utils/Object";


export function setQueryURL(baseURL: string, queryParams: GenericObjectWithStrings): string {

	let resURL = baseURL;

	let firstParam = true;

	for(const [key, value] of Object.keys(queryParams)) {
		resURL = resURL.concat(firstParam ? "?" : "&").concat(`${key}=${value}`);

		if(firstParam) 
			firstParam = false;
	}

	return resURL;
}