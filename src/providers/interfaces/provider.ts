import { IsEmail, IsNotEmpty } from 'class-validator';

export class Provider {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  celphone: string;
  @IsEmail()
  email: string;
  representative: string;
  photo: string;
}
