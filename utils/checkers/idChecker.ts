import mongoose from "mongoose";

export const idChecker = async <T>(Modal:mongoose.Model<T>,id: string) => {
    
    const data = await Modal.findById(id);
    if (!data) {
        return Promise.reject(new Error(`No document for this id ${id}`));
    }else{
        return true
    }

};

