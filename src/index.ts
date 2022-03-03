import { register, login } from "./data/user/Login";
import { addPoint, getUserPoints } from "./data/points/points";
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
	getUserPoints
};