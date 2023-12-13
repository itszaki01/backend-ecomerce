import mongoose from "mongoose";
import { TOrderSchema } from "../@types/Order.type";

const orderSchema = new mongoose.Schema<TOrderSchema>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required"],
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            color: { type: "String" },
            quantitiy: { type: "Number" },
            price: { type: "Number" },
        },
    ],
    shippingAddress:{
        details:'string',
        phone:'string',
        city:'string',
        postalCode:'string'
    },
    taxPrice:{type:'number',default:0},
    shippingPrice: {type:'number',default:0},
    totalOrderPrice: "Number",
    paymentMethod: {
        type: "String",
        enum: ["card", "cash"],
        default: "cash",
    },
    isPaid: "boolean",
    paidAt: "date",
    isDelivred: "boolean",
    delivredAt: "Date",
},{
    timestamps:true
});

orderSchema.pre(/^find/,function(next){
    //@ts-ignore
    this.populate('user','name')
    //@ts-ignore
    this.populate('cartItems.product','name imageCover -_id')
    next()
})

export const Order = mongoose.model<TOrderSchema>("Order", orderSchema);
