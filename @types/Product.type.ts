import { Request } from "express";
import mongoose from "mongoose";
import { TQueryParams } from "./QueryParams.type";

export type TProductSchema = {
    title: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    priceAfterDiscount: number;
    quantity: number;
    sold: number;
    remining_quantity: number;
    imageCover: string;
    images: string[];
    colors: string[];
    brand: string | mongoose.Schema.Types.ObjectId;
    category: string | mongoose.Schema.Types.ObjectId;
    subcategories: string[] | mongoose.Schema.Types.ObjectId[];
    ratingsAverage:number,
    ratingsQuantity:number
};


type TProductQueryParams = {
    limit: string;
    page: string;
};

//Category Reusests Types
export type TProductREQ = Request<{ id: string }, {}, TProductSchema, TProductQueryParams & TQueryParams>;
