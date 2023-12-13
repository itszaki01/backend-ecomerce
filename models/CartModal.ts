import mongoose from "mongoose";
import { TCartSchema } from "../@types/Cart.type";

const cartSchema = new mongoose.Schema<TCartSchema>(
    {
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                color: { type: "String" },
                quantitiy: { type: "Number", default: 1 },
                price: { type: "Number" },
            },
        ],
        totalCartPrice: { type: "Number" },
        totalPriceAfterDiscount: { type: "Number" },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Cart = mongoose.model("Cart", cartSchema);
