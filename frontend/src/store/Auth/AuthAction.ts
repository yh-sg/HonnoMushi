import { Dispatch } from "redux";
import {DispatchAuthAction, AuthDetails} from "./AuthType";
// import * as api from '../../api'
import { RouteProps } from "react-router";

//need history so that after signin, signup | push them to homepage and don't allow them in login/logout.

export const signin = (formData:AuthDetails, history:RouteProps) => async(dispatch:Dispatch<DispatchAuthAction>):Promise<void> => {


},

signup  = (formData:AuthDetails, history:RouteProps) => async(dispatch:Dispatch<DispatchAuthAction>):Promise<void> => {


} 