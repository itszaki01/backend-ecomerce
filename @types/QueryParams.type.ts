import { Request } from "express"

export type TQuerySortParams = ['limit','page','sort','fields']
export type TQueryParams = {
    id?:string,
    limit?:string,
    page?:string,
    sort?:string,
    fields?:string
    keyword?:string
    category?:string
    categoryID?:string
}

export type TBodyParma = {
    name?:string,
    title?:string,
    slug?:string,
    description?:string,
    price?:number,
    stock?:number,
    category?:string,
}

export type TQuerParamsREQ = Request<TQueryParams,{},TBodyParma,TQueryParams>