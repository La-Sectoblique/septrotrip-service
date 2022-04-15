import { register, login } from "./data/user/Login";
import { addPoint, getStepPoints, deletePoint, updatePoint, getTripPoints } from "./data/points/points";
import { createLogbookEntry, deleteLogbookEntry, getLogbookEntry, getTripLogbookEntries, updateLogbookEntry } from "./data/logbooks/logbookEntries";
import { addStep, deleteStep, getStepById, getTripSteps, updateStep, getStepDays } from "./data/trips/step";
import { addTravelerToTrip, createTrip, deleteTrip, getAllPublicTrips, getTravelers, getTripById, getUserTrips, removeTraveler, updateTrip } from "./data/trips/trips";
import { getDayByID, getPointsByDay, updateDay } from "./data/points/days";
import { getPathById, getPathToNextStep, getPathToPreviousStep, updatePath } from "./data/trips/path";
import { uploadFile } from "./data/trips/file";

import { init, params } from "./utils/Config";
import Platform from "./utils/Platform";
import { generateFormData } from "./utils/Body"; 

export {
	// config
	init,
	params,

	// platform
	Platform,

	// body
	generateFormData,

	// user
	register,
	login,

	// points
	addPoint,
	getStepPoints,
	updatePoint,
	deletePoint,
	getTripPoints,
	getPointsByDay,

	// step
	addStep,
	deleteStep,
	getStepById, 
	getTripSteps, 
	updateStep,
	getStepDays,

	// logbook entries
	createLogbookEntry,
	getTripLogbookEntries,
	deleteLogbookEntry,
	getLogbookEntry,
	updateLogbookEntry,

	// trips
	addTravelerToTrip,
	createTrip,
	deleteTrip,
	getAllPublicTrips,
	getTravelers,
	getTripById,
	getUserTrips,
	removeTraveler,
	updateTrip,

	// days
	getDayByID,
	updateDay,

	// path
	getPathById,
	getPathToNextStep,
	getPathToPreviousStep,
	updatePath,

	// file
	uploadFile
};