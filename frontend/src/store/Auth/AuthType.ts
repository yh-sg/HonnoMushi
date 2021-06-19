export const LOGIN = "LOGIN",
		        LOGOUT = "LOGOUT",
		        SIGNUP = "SIGNUP",
		        AUTH_FAIL = "AUTH_FAIL";
		

export interface AuthDetails{
    email:string;
    password:string
    name?:string;
    confirmPassword?:string
}


export interface AuthResult{
    result:{
        email: string
        name: string
        password: string
        __v?: number
        _id: string
    }
    token:string
}

interface AuthSignIn {
    type: typeof LOGIN;
    data: AuthResult;
}

interface AuthSignUp {
    type: typeof SIGNUP;
    data: AuthResult;
}

interface Logout {
    type: typeof LOGOUT;
    data: void;
}

interface AuthFail {
    type: typeof AUTH_FAIL;
    data: string;
}

export type DispatchAuthAction = AuthSignIn | AuthSignUp | Logout | AuthFail; 