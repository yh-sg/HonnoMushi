import { NextFunction, Request ,Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { HttpStatusCode } from '../utils/constants';
import ErrorResponse from '../utils/expressErrorResponse';

export interface UserAuthReq extends Request {
    userId?: string 
  }

const auth = async (req:Request,res:Response,next:NextFunction) => {
    try {
        //check if token is valid or not
        const authReq = req as UserAuthReq

        const auth = req.headers.authorization as string

        if (!auth) return next(new ErrorResponse('Unauthorized request',HttpStatusCode.UNAUTHORIZED));

        const token = auth.split(" ");
        let tokenCode;

        (token.length!==2) ? next(new ErrorResponse('Unauthorized request',HttpStatusCode.UNAUTHORIZED)) : tokenCode = token[1];

        let decodedData;

        if(token){
            
            decodedData = jwt.verify(tokenCode as string, process.env.SECRET as string) as JwtPayload;

            authReq.userId = decodedData?.id as string;
        }

        next();

    } catch (e) {
        return next(new ErrorResponse(e as string, HttpStatusCode.UNAUTHORIZED));
    }
}

export default auth;