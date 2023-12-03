import { Request } from "express";
import mongoose from "mongoose";
import { TQueryParams } from "./QueryParams.type";

export type TBrandSchema = {
    name: string;
    slug: string;
    image:string
};

type TBrandParams = {
    limit: string;
    page: string;
    id: string;
};

export type TBrandREQ = Request<TBrandParams, {}, TBrandSchema,TQueryParams>;
