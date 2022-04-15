import { FileFormat, GeneralBodyFormat, isFileFormat } from "../utils/FormData";

export function generateFormData(data: GeneralBodyFormat): FormData {

	const res = new FormData();

	for(const key of Object.keys(data)) {

		const value: string | number | boolean | object | FileFormat = data[key];

		if(typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
			res.append(key, value.toString());
		} 
		else {
			if(isFileFormat(value)) {
				res.append(key, value as Blob);
			}
		}
	}

	return res;
}