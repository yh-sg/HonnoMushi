import { Reducer } from "redux";
import {DispatchAuthAction} from "./AuthType";
		

const AuthReducer:Reducer<object,DispatchAuthAction> = 
    (state:object={},action:DispatchAuthAction):object => {
        switch(action.type){
            //Login
            //Logout
            //Signup
        default:
            return state
    }
}


export default AuthReducer; 