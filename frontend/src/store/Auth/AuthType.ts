import { AxiosError } from "axios";

export const LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
	REGISTER = "REGISTER",
	AUTH_FAIL = "AUTH_FAIL";

export interface AuthDetails {
	email: string;
	password: string;
	name?: string;
	confirmPassword?: string;
}

export interface AuthResult {
	result: {
		name: string;
		email: string;
		password?: string;
		__v?: number;
		_id: string;
	};
	token: string;
}

export interface AuthLogin {
	type: typeof LOGIN;
	payload: AuthResult;
}

interface AuthRegister {
	type: typeof REGISTER;
	payload: AuthResult;
}

interface Logout {
	type: typeof LOGOUT;
}

interface AuthFail {
	type: typeof AUTH_FAIL;
	payload: AxiosError<string>;
}

export type DispatchAuthAction = AuthLogin | AuthRegister | Logout | AuthFail;
