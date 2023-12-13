import { ObjectId } from "mongoose";

export type TCartSchema = {
    cartItems: {
        product: ObjectId | string;
        color: string;
        quantitiy: number;
        price: number;
        _id:string | ObjectId
    }[];
    totalCartPrice: number;
    totalPriceAfterDiscount: number;
    user: ObjectId | string;
};
