import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { TDataRES } from "../@types/ResponseData.type";
import slugify from "slugify";
import { ApiError } from "../utils/apiError";
import { TQuerParamsREQ } from "../@types/QueryParams.type";

export const deleteOne = <T>(Model:mongoose.Model<T>) => expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    res.status(200).json({ message: `Deleted Successfuly` });
});

export const updateOne = <T>(Modal:mongoose.Model<T>)=> expressAsyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const data = await Modal.findByIdAndUpdate(id, req.body, { new: true });
    res.json(data);
});

export const createOne = <T>(Modal:mongoose.Model<T>)=> expressAsyncHandler(async (req: TQuerParamsREQ, res) => {
    const data = await Modal.create(req.body);
    res.status(201).json(data);
});

export const getOne = <T>(Modal:mongoose.Model<T>)=> expressAsyncHandler(async (req: TQuerParamsREQ, res,next) => {
    const data = await Modal.findById(req.params.id)
    // .populate("brand", "name").populate("category", "name").populate("subcategories", "name");
    
    if(!data){
        return next(new ApiError("No data", 404));
    }

    res.json(data);
});