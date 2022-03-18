import { register, login } from "./data/user/Login";
import { addPoint, getUserPoints, deletePoint, updatePoint } from "./data/points/points";
import { createLogbook, deleteLogbook, getLogbook, updateLogbook, getTripLogbooks, getUserLogbooks } from "./data/logbooks/logbooks";
import { addLogbookEntry, getLogbookEntries } from "./data/logbooks/logbookEntries";
import { init, params } from "./utils/Config";

export {
	// config
	init,
	params,

	// user
	register,
	login,

	// points
	addPoint,
	getUserPoints,
	updatePoint,
	deletePoint,

	// logbooks
	createLogbook,
	deleteLogbook,
	getLogbook,
	updateLogbook,
	getTripLogbooks,
	getUserLogbooks,

	// logbook entries
	addLogbookEntry,
	getLogbookEntries
};