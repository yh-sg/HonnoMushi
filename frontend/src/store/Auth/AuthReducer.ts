import { Reducer } from "redux";
import { DispatchAuthAction, AuthDetails, AuthResult, LOGIN } from "./AuthType";

export interface AuthReducerState {
	authData: object | null;
}

const AuthReducer: Reducer<AuthReducerState, DispatchAuthAction> = (
	state: AuthReducerState = { authData: null },
	action: DispatchAuthAction
): AuthReducerState => {
	switch (action.type) {
		//Login
		case LOGIN:
			return { ...state, authData: action.payload };
		//Signup
		// case SIGNUP:
		//Logout
		default:
			return state;
	}
};

export default AuthReducer;
