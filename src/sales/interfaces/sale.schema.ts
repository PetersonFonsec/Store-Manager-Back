import { Schema } from 'mongoose';

export const SaleSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products' },
    quantity: Number,
    price: Number,
  },
  {
    timestamps: true,
  },
);
