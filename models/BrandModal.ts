import mongoose from "mongoose";
import { TBrandSchema } from "../@types/Brand.type";
const brandSchema = new mongoose.Schema<TBrandSchema>(
    {
        name: {
            type: "string",
            required: [true, "Name is required"],
            unique: true,
            trim: true,
            minlength:[2,'Too short brand name'],
            maxlength:[32,'Too long brand name']
        },
        slug:{
            type:'string',
            lowercase:true,
            trim: true
        },
        image:{
            type:'string',
        }
    },
    {
        timestamps: true,
    }
);

export const Brand = mongoose.model('Brand',brandSchema)