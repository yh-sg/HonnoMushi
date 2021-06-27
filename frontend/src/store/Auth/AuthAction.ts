import { Dispatch } from "redux";
import { RouteProps } from "react-router";
import * as api from "../../api";
import {
	DispatchAuthAction,
	AuthDetails,
	LOGIN,
	SIGNUP,
	LOGOUT,
	AUTH_FAIL,
	AuthLogin,
	AuthResult
} from "./AuthType";

//need history so that after signin, signup | push them to homepage and don't allow them in login/logout.

const loginUser = (userData: AuthResult): AuthLogin => {
	return {
		type: LOGIN,
		payload: userData
	}
}

export const loginThunkAction =
// (formData: AuthDetails, history: RouteProps) =>
(formData: AuthDetails) =>
async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
		// console.log('formData ---> ', formData)

			// send to backend and get response
			const postLogin = (await api.login(formData))
			console.log('postLogin', postLogin)

			const { status, data} = postLogin
			if (status === 200) {
				const {result, token } = data
				localStorage.setItem(result.email, token)
			}
			dispatch(loginUser(data))
		},
	signupAction =
		// (formData: AuthDetails, history: RouteProps) =>
			(formData: AuthDetails) =>
			async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
				console.log("formData --> ", formData); // can get

				await api.signup(formData);
				localStorage.setItem("user", JSON.stringify(formData));
			},
	logoutAction = () => async (dispatch: Dispatch<DispatchAuthAction>) => {
		// localStorage.removeItem("email");
		// dispatch({ type: LOGOUT });
	};
