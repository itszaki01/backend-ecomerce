import { Request } from "express"
import { TQuerParamsREQ } from "./QueryParams.type"

export type TFilterObj = Request & {
    filterObj:TQuerParamsREQ
}