import mongoose from "mongoose";
import { TCategorySchema } from "../@types/Categorys.type";

const categorySchema = new mongoose.Schema<TCategorySchema>(
    {
        name: {
            type: "string",
            required: [true, "Category Required"],
            trim: true,
            minlength: [6, "Too short category length"],
            maxlength: [32, "Too long category name"],
            unique: true,
        },
        slug: {
            type: "string",
            lowercase: true,
            trim: true
        },
        image: {
            type: "string",
        },
    },
    {
        timestamps: true,
    }
);



export const CategoryModal = mongoose.model("Category", categorySchema);
