import { Dispatch } from "redux";
import * as api from "../../api";
import { DispatchAuthAction, AuthDetails, LOGIN, AUTH_FAIL } from "./AuthType";

export const login =
	(form: AuthDetails, history: any) =>
	async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
		try {
			const { data, status } = await api.login(form);
			// console.log(data)

			if (status === 200) {
				localStorage.setItem("user", JSON.stringify(data));
				dispatch({ type: LOGIN, payload: data });
			}

			history.push("/");
			window.location.reload();
		} catch (e) {
			// can't get message: "Wrong Password!" from authRoute (backend)
			dispatch({ type: AUTH_FAIL, payload: "The password is incorrect" });
		}
	};

export const register =
	(form: AuthDetails, history: any) =>
	async (dispatch: Dispatch<DispatchAuthAction>): Promise<void> => {
		try {
			const data = await api.register(form);

			localStorage.setItem("user", JSON.stringify(data));

			history.push("/");
		} catch (e) {
			console.log(e);
		}
	};
