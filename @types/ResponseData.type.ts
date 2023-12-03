import { Request } from "express"
import { TBodyParma, TQuerParamsREQ, TQueryParams } from "./QueryParams.type"

export type TDataRES = {
    results?:number,
    data?:unknown
}

export type TPaginateResults = {
    limit?:number
    currentPage?:number,
    totalResults?:number
    totalPages?:number
    next?:number | null,
    prev?:number | null
}


export interface CustomRequest extends Request {
    filterObj:TQuerParamsREQ
}