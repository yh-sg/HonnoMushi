export const LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
	SIGNUP = "SIGNUP",
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

interface AuthSignUp {
	type: typeof SIGNUP;
	payload: AuthResult;
}

interface Logout {
	type: typeof LOGOUT;
	// payload: void;
}

interface AuthFail {
	type: typeof AUTH_FAIL;
	payload: string;
}

export type DispatchAuthAction = AuthLogin | AuthSignUp | Logout | AuthFail;
