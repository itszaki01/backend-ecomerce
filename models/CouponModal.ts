import mongoose from "mongoose";
import { TCouponSchema } from "../@types/Coupon.type";



const couponSchema = new mongoose.Schema<TCouponSchema>({
    name:{
        type:String,
        trim:true,
        unique:true,
        uppercase:true,
        required:[true,'Please enter coupon name'],
    },
    expire:{
        type:Date,
        required:[true,'Please enter coupon expire date'],
    },
    discount:{
        type:Number,
        required:[true,'Please enter coupon discount'],
    },
},{
    timestamps:true,
})


export const Coupon = mongoose.model<TCouponSchema>('Coupon',couponSchema)