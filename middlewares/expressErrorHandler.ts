import { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/apiError";

export const expressErrorHandler:ErrorRequestHandler = (err:ApiError,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV?.startsWith('DEV')){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            error:err,
            stack:err.stack
        })
    }else{
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
        })
    }
}