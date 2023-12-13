import { ObjectId } from "mongoose"

export type TOrderSchema = {
    user:string | ObjectId
    cartItems: {
        product: ObjectId | string;
        color: string;
        quantitiy: number;
        price: number;
        _id:string | ObjectId
    }[];
    shippingAddress:{
        details:string,
        phone:string,
        city:string,
        postalCode:string
    }
    taxPrice:number,
    shippingPrice:number,
    totalOrderPrice:number,
    paymentMethod:'cart' | 'cash'
    isPaid: boolean,
    paidAt: Date,
    isDelivred:boolean,
    delivredAt:Date,
    _id:string | ObjectId
}