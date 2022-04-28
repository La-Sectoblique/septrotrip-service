import { params } from "./Config";

export async function log(msg: string, ctx: string, ) {
	if(params.context === "production")
		return;
	
	const now = new Date();

	let display = `[${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}][${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}][septotrip-service][${ctx}]`;

	display += msg;

	console.log(display);
}