import express, {NextFunction, Request, Response} from "express";
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HttpStatusCode } from "../utils/constants";
import ErrorResponse from "../utils/expressErrorResponse";
import { loginService, signupService } from "../services/authService";

const router = express.Router();

router.post("/login", async (req:Request, res:Response, next:NextFunction):Promise<Response|void>=> {

    try {
        const loginResult = await loginService(req.body)

        if(loginResult instanceof ErrorResponse) return next(loginResult)

        return res.status(HttpStatusCode.OK).json({ result: loginResult.existingUser, token: loginResult.token });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post("/register", async (req:Request, res:Response, next:NextFunction):Promise<Response|void> => {
    
    try {
        const signupResult = await signupService(req.body);

        if(signupResult instanceof ErrorResponse) return next(signupResult)

        return res.status(HttpStatusCode.OK).json({ signupResult });
    } catch (e) {
        console.error(e);
        next(e)
    }
});

export default router;