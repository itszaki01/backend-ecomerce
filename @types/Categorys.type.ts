import { Request } from "express";

export type TCategorySchema = {
    name: string;
    slug: string;
    image: string;
};

type TCategoriesQueryParams = {
    limit: string;
    page: string;
};

//Category Reusests Types
export type TCategoryREQ = Request<{ id: string }, {}, TCategorySchema, TCategoriesQueryParams>;
