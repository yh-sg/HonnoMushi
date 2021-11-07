import { ErrorRequestHandler } from "express";
import { Error } from 'mongoose';
import { HttpStatusCode } from "../utils/constants";
import ValidationError = Error.ValidationError;

const ErrorResponse = require('../utils/expressErrorResponse');

//! Is there a better way of handling error??
interface IError extends Error{
    message:string
    code:number
    statusCode:number
    errors:ValidationError
}

const errorHandler:ErrorRequestHandler = (err:IError, req, res, next):void => {

    console.error(err)

    let error = {...err};

    error.message = err.message;

    //?In mongoose, this means duplicated keys
    if(err.code===11000){
        const message = 'Duplicate Field Value Enter'
        error = new ErrorResponse(message, HttpStatusCode.BAD_REQUEST);
    }

    if(err.message==="ValidationError"){
        const message = Object.values(err.errors).map((val)=>val.message)
        error = new ErrorResponse(message, HttpStatusCode.BAD_REQUEST);
    }

    res.status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Server Error"
    })
}

export default errorHandler;