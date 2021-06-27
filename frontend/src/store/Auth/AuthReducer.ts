import { Reducer } from "redux";
import { DispatchAuthAction, LOGIN } from "./AuthType";

export interface AuthReducerState {
	authData: object | null;
}

const initialState = {
	authData: null,
};

const AuthReducer: Reducer<AuthReducerState, DispatchAuthAction> = (
	state: AuthReducerState = initialState,
	action: DispatchAuthAction
): AuthReducerState => {
	switch (action.type) {
		//Login
		case LOGIN:
			return { ...state, authData: action.payload };
		//register
		// case REGISTER:
		//Logout
		default:
			return state;
	}
};

export default AuthReducer;
