import mongoose from "mongoose";

export interface IReview extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId | string;
    product: mongoose.Schema.Types.ObjectId | string;
    rating: number;
    title: string;
  }


  