
import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReview>('Review', reviewSchema);
