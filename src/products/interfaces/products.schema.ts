import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: String,
    price_buy: Number,
    price_sale: Number,
    description: String,
    photo: String,
    quantity: Number,
  },
  {
    timestamps: true,
  },
);
