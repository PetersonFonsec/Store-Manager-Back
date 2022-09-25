import { Schema } from 'mongoose';

export const usersSchema = new Schema(
  {
    name: String,
    password: String,
    photo: String,
    email: { unique: true, type: String },
  },
  {
    timestamps: true,
    collection: 'Users',
  },
);
