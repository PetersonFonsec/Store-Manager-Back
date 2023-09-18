import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './../../users/interfaces/usuarios';
import { ConfirmPasswordPipe } from './../../users/pipes/confirm-password/confirm-password.pipe';
import { PasswordValidationPipe } from './../../users/pipes/password-validation/password-validation.pipe';
import {
  ForgetRequest,
  LogingRequest,
  RecovertPasswordRequest,
} from '../interfaces/auth';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/forget')
  @UsePipes(ValidationPipe)
  forget(@Body() email: ForgetRequest) {
    return this.authService.forget(email);
  }

  @Post('/recovertPassword/')
  @UsePipes(ValidationPipe, PasswordValidationPipe, ConfirmPasswordPipe)
  recovertPassword(@Body() recovertPasswordRequest: RecovertPasswordRequest) {
    return this.authService.recovertPassword(recovertPasswordRequest);
  }

  @Post('/login')
  login(@Body() loginParams: LogingRequest) {
    return this.authService.login(loginParams);
  }

  @Post('/signup')
  @UsePipes(ValidationPipe, PasswordValidationPipe, ConfirmPasswordPipe)
  signup(@Body() user: User) {
    return this.authService.signup(user);
  }
}
