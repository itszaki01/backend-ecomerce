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

export type TQuerParamsREQ = Request<{},{},{slug:string,name:string,title:string},TQueryParams>