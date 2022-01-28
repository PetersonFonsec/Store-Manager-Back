import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogingRequest {
  @IsNotEmpty() password: string;
  @IsEmail() email: string;
}

export class LogingResponse {}
