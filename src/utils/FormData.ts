export type GeneralBodyFormat = {
	[key: string]: string | number | boolean | object;
	file: FileFormat;
}

export type FileFormat = WebFileFormat | MobileFileFormat;

// Standard JS File Format
export type WebFileFormat = File;

export type MobileFileFormat = {
	uri: MobileFileURI;
	name: string;
	type: string;
}

export type MobileFileURI = AndroidFileURI | IOSFileURI;
export type AndroidFileURI = `content://${string}`;
export type IOSFileURI = `file://${string}`;

// type predicates
export function isWebFileFormat(object: unknown): object is WebFileFormat {
	return object instanceof File;
}

export function isMobileFileFormat(object: unknown): object is MobileFileFormat {
	return (
		(object as MobileFileFormat).name !== undefined &&
		(object as MobileFileFormat).type !== undefined &&
		isMobileFileURI((object as MobileFileFormat).uri)
	);
}

export function isMobileFileURI(object: unknown): object is MobileFileURI {
	return (
		isAndroidFileURI(object) ||
		isIOSFileURI(object)
	);
}

export function isAndroidFileURI(object: unknown): object is AndroidFileURI {
	return (
		typeof object === "string" &&
		object.startsWith("content://")
	);
}

export function isIOSFileURI(object: unknown): object is IOSFileURI {
	return (
		typeof object === "string" &&
		object.startsWith("file://")
	);
}

export function isFileFormat(object: unknown): object is FileFormat {
	return (
		isWebFileFormat(object) ||
		isMobileFileFormat(object)
	);
}