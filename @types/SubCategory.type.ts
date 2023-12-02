import { Request } from "express";
import mongoose from "mongoose";

export type TSubCategorySchema = {
    name: string;
    slug: string;
    category: mongoose.Schema.Types.ObjectId | string;
};

type TSubCategoryParams = {
    limit: string;
    page: string;
    id: string;
    categoryID:string
};

export type TSubCategoryREQ = Request<TSubCategoryParams, {}, TSubCategorySchema>;
