import { Reducer } from "redux";
import { DispatchAuthAction, AuthDetails, LOGIN } from "./AuthType";

interface AuthReducerState {
	// name: string;
	// email: string;
	// password: string;
	// confirmPassword: string;
	// error: string;
	// token: string;
	name?: string;
	email?: string;
	loggedIn?: boolean;
	error?: string
}

const initialState = {
	// name: "",
	// email: "",
	// password: "",
	// confirmPassword: "",
	// error: "",
	// token: "",
	name: "",
	email: "",
	loggedIn: false,
	error: ""
};

const AuthReducer: Reducer<AuthReducerState, DispatchAuthAction> = (
	state: AuthReducerState = initialState,
	action: DispatchAuthAction
): AuthReducerState => {
	switch (action.type) {
		//Login
		case LOGIN: {
			return {
				...state, 
				name: action.payload.result.name,
				email: action.payload.result.email,
				loggedIn: true
			}
		}
		//Signup
		//Logout
		default:
			return state;
	}
};

export default AuthReducer;
