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
		} catch (e) {
			// console.log("e.response.data.message --> ", e.response.data.message);
			dispatch({ type: AUTH_FAIL, payload: e.response.data.message });
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
