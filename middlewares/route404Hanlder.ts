import { RequestHandler } from "express";
import { ApiError } from "../utils/apiError";

export const route404Hanlder:RequestHandler = (req,res,next)=>{
    // const err = new Error(`Can't find this route => ${req.originalUrl}`)

    next(new ApiError(`Can't find this route => ${req.originalUrl}`,400))
}