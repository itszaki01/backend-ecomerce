import mongoose from "mongoose";

export const uniqueChecker = async <T>(Modal:mongoose.Model<T>,payload:any) => {
    
    const data = await Modal.findOne(payload.data);
    if (data) {
        return Promise.reject(new Error(`${payload.field} already exists`));
    }else{
        return true
    }

};

