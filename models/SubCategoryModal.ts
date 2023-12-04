import mongoose from "mongoose";
import { TSubCategorySchema } from "../@types/SubCategory.type";
const subCategorySchema = new mongoose.Schema<TSubCategorySchema>(
    {
        name: {
            type: "string",
            required: [true, "Name is required"],
            unique: true,
            trim: true,
            minlength:[2,'Too short subcategory name'],
            maxlength:[32,'Too long subcategory name']
        },
        slug:{
            type:'string',
            lowercase:true,
            trim: true
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:[true,'SubCategory must be belong to parent category']
        },
    },
    {
        timestamps: true,
    }
);

subCategorySchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("category", "name");
    next();
});
export const SubCategory = mongoose.model('SubCategory',subCategorySchema)

