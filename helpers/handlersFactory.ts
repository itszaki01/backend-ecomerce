import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import {  TDataRES } from "../@types/ResponseData.type";
import { ApiError } from "../utils/apiError";
import { TQuerParamsREQ } from "../@types/QueryParams.type";
import { ApiFeatures } from "../utils/apiFeatures";
import { TFilterObj } from "../@types/Other.type";

export const deleteOne = <T>(Model: mongoose.Model<T>) =>
    expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;
        await Model.findByIdAndDelete(id);
        res.status(200).json({ message: `Deleted Successfuly` });
    });

export const updateOne = <T>(Modal: mongoose.Model<T>) =>
    expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const data = await Modal.findByIdAndUpdate(id, req.body, { new: true });
        res.json(data);
    });

export const createOne = <T>(Modal: mongoose.Model<T>) =>
    expressAsyncHandler(async (req: TQuerParamsREQ, res) => {
        console.log(req.body)
        const data = await Modal.create(req.body);
        res.status(201).json(data);
    });

export const getOne = <T>(Modal: mongoose.Model<T>) =>
    expressAsyncHandler(async (req: TQuerParamsREQ, res, next) => {
        const data = await Modal.findById(req.params.id);
        // .populate("brand", "name").populate("category", "name").populate("subcategories", "name");

        if (!data) {
            return next(new ApiError("No data", 404));
        }

        res.json(data);
    });

export const getAll = <T>(Modal: mongoose.Model<T>, ByMethod?: "ByName" | "ByTitle") =>
    expressAsyncHandler(async (req, res, next) => {
        const _req = req as TFilterObj;
        const apiFeatures = new ApiFeatures(Modal, Modal, req.query);

        (await (await apiFeatures.filter(_req.filterObj as any)).search(ByMethod, _req.filterObj as any)).sort().fieldsLimit().pagination();

        const documents = await apiFeatures.mongooseQuery;

        if (!documents || documents.length === 0) {
            return next(new ApiError(`No documents to show`, 404));
        }

        const response: TDataRES = {
            results: documents.length,
            ...apiFeatures.paginateResults,
            data: documents,
        };

        res.json(response);
    });
