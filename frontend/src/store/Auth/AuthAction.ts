import { Dispatch } from "redux";
import * as api from "../../api";
import { DispatchAuthAction, AuthDetails, LOGIN, AUTH_FAIL } from "./AuthType";

export const login =
	(form: AuthDetails, history: any) =>
	async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
		try {
			const { data, status } = await api.login(form);

			if (status === 200) {
				localStorage.setItem("user", JSON.stringify(data));
				dispatch({ type: LOGIN, payload: data });
			}
			history.push("/");
			window.location.reload();
		} catch (error) {
			let errorMessage = "There is an error in authentication";
			if (error instanceof Error) {
				errorMessage = error.message;
				dispatch({ type: AUTH_FAIL, payload: error.message });
			}
			console.log(errorMessage);
			// dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
		}
	};

export const register =
	(form: AuthDetails, history: any) =>
	async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
		try {
			const { data, status } = await api.register(form);
			console.log("data", data);

			if (status === 200) {
				localStorage.setItem("user", JSON.stringify(data));
			}
			history.push("/");
			window.location.reload();
		} catch (e) {
			console.log(e);
		}
	};
