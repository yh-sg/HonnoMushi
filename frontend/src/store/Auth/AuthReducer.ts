import { Reducer } from "redux";
import { DispatchAuthAction, LOGIN, AUTH_FAIL } from "./AuthType";

export interface AuthReducerState {
	authData: object | null;
	error: Error;
}

const initialState = {
	authData: null,
	error: {name:"",message:""}
};

const AuthReducer: Reducer<AuthReducerState, DispatchAuthAction> = (
	state: AuthReducerState = initialState,
	action: DispatchAuthAction
): AuthReducerState => {
	switch (action.type) {
		case LOGIN:
			return { ...state, authData: action.payload };
		case AUTH_FAIL:
			return { ...state, error: action.payload };
		//register
		//Logout
		default:
			return state;
	}
};

export default AuthReducer;
