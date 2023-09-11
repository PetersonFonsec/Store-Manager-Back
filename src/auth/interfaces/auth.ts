import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogingRequest {
  @IsNotEmpty() password: string;
  @IsEmail() email: string;
}
export class ForgetRequest {
  @IsEmail() email: string;
}
export class RecovertPasswordRequest {
  @IsNotEmpty() password: string;
  @IsNotEmpty() confirm_password: string;
  @IsNotEmpty() token: string;
}

export class LogingResponse {}
