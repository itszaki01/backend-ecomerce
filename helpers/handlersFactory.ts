import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { TDataRES } from "../@types/ResponseData.type";
import slugify from "slugify";
import { ApiError } from "../utils/apiError";

export const deletFactory = <T>(Model:mongoose.Model<T>) => expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    res.status(200).json({ message: `Deleted Successfuly` });
});

export const updateFactoryHanlder = <T>(Modal:mongoose.Model<T>)=> expressAsyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const data = await Modal.findByIdAndUpdate(id, req.body, { new: true });
    const response: TDataRES = {
        data,
    };

    res.json(response);
});