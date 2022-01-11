import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: {
      unique: true,
      type: String,
    },
    price_buy: Number,
    price_sale: Number,
    description: String,
    photo: String,
  },
  {
    timestamps: true,
  },
);
