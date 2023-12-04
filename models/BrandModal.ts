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

function setImageUrl(doc:any){
    if(doc.image){
        const imageUrl = `${process.env.BASE_URL}/brand/${doc.image}`
        doc.image =imageUrl
    }
}
brandSchema.post('init',function(doc){
    setImageUrl(doc)
})
brandSchema.post('save',function(doc){
    setImageUrl(doc)
})

export const Brand = mongoose.model('Brand',brandSchema)