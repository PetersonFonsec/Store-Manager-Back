import { Schema } from 'mongoose';

export const providerSchema = new Schema({
  name: String,
  celphone: { unique: true, type: String },
  email: { unique: true, type: String },
  representative: String,
  photo: String,
});
