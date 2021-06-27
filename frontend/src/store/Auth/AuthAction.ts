import { Dispatch } from "redux";
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

// need history so that after signin, signup | push them to homepage and don't allow them in login/logout.

// const loginUser = (userData: AuthResult): AuthLogin => {
// 	return {
// 		type: LOGIN,
// 		payload: userData
// 	}
// }

// export const loginThunkAction =
// // (formData: AuthDetails, history: RouteProps) =>
// (formData: AuthDetails) =>
// async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
// 		// console.log('formData ---> ', formData)

// 			// send to backend and get response
// 			const postLogin = (await api.login(formData))
// 			console.log('postLogin', postLogin)

// 			const { status, data} = postLogin
// 			if (status === 200) {
// 				localStorage.setItem('user', JSON.stringify(data))
// 				dispatch(loginUser(data))
// 			}
// 		},
	// signupAction =
	// 	// (formData: AuthDetails, history: RouteProps) =>
	// 		(formData: AuthDetails) =>
	// 		async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
	// 			console.log("formData --> ", formData); // can get

	// 			await api.signup(formData);
	// 			localStorage.setItem("user", JSON.stringify(formData));
	// 		}

export const signin = (form:AuthDetails, history:any) => async(dispatch:Dispatch<DispatchAuthAction>):Promise<void> => {
	try {
		//login the user
		const {data, status} = await api.login(form);
		console.log(data)
		
		if (status === 200) {
			localStorage.setItem('user', JSON.stringify(data))
			dispatch({type: LOGIN, payload: data});
		}

		history.push('/')
	} catch (e) {
		console.log(e)
	}
}

export const signup = (form:AuthDetails, history:any) => async(dispatch:Dispatch<DispatchAuthAction>):Promise<void> => {
	try {
		//login the user
		// const {data, status} = await api.signup(form);
		console.log(form)
		const data = await api.signup(form);
		console.log('data -->', data)
		
		localStorage.setItem('user', JSON.stringify(data))
		// dispatch({type: SIGNUP, payload: data});
		
		history.push('/')
	} catch (e) {
		console.log(e)
	}
}