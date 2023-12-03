import { Request } from "express";
import { TQueryParams } from "./QueryParams.type";

export type TCategorySchema = {
    name: string;
    slug: string;
    image: string;
};


//Category Reusests Types
export type TCategoryREQ = Request<{ id: string }, {}, TCategorySchema, TQueryParams>;
