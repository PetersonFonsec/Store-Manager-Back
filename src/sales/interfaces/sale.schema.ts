import { Schema } from 'mongoose';

export const SaleSchema = new Schema({
  products_sold: [
    {
      product: String,
      quantity: Number,
    },
  ],
  price: Number,
});
