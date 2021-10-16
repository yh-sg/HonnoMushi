import { ErrorRequestHandler } from "express";
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

const ErrorResponse = require('../utils/errorResponse');

//! Is there a better way of handling error??
interface IError{
    message:string
    code:number
    statusCode:number
    errors:ValidationError
}

const errorHandler:ErrorRequestHandler = (err:IError, req, res, next):void => {

    let error = {...err};

    error.message = err.message;

    //?In mongoose, this means duplicated keys
    if(err.code===11000){
        const message = 'Duplicate Field Value Enter'
        error = new ErrorResponse(message, 400);
    }

    if(err.message==="ValidationError"){
        const message = Object.values(err.errors).map((val)=>val.message)
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        message: "something went south", 
        error: error.message || "Server Error"
    })
}

export default errorHandler;