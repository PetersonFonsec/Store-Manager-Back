import { Schema } from 'mongoose';

export const providerSchema = new Schema({
  name: String,
  celphone: String,
  email: String,
  representative: String,
  photo: String,
});
