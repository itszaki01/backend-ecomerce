import { Request } from "express"
import { extname } from "path"
import { TQueryParams } from "./QueryParams.type"

export type TUserSchema = {
    _id?:string,
    name:string,
    slug:string
    email:string,
    password:string
    passwordChangedAt:Date
    profileImg:string,
    phone:string,
    role: 'user' | 'admin'
    passwordResetCode:string | undefined
    passwordResetCodeExpires:Date | undefined
    passwordResetVerified:boolean | undefined
}

export interface IUser extends Request<TQueryParams, {}, TUserSchema> {
    user:TUserSchema
}