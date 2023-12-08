import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { ApiError } from "../apiError";




export const belongChecker = async (model: mongoose.Model<any>, payload: any,compareValue:string) => {
    const data = await model.findById(payload.data);
    if(payload.role === 'user'){
        if (!data) {
            return Promise.reject(new ApiError("No Data", 400));
        }
        if (data.user._id.toString() !== compareValue.toString()) {
            return Promise.reject(new ApiError("Not Authorized", 401));
        }
    }
    return true;
}