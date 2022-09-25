import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
export class User {
  _id: ObjectId;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirm_password: string;
  photo: string;
}
