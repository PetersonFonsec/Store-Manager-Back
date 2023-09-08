import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/users/interfaces/usuarios';
import { ConfirmPasswordPipe } from 'src/users/pipes/confirm-password/confirm-password.pipe';
import { PasswordValidationPipe } from 'src/users/pipes/password-validation/password-validation.pipe';
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

  @Post('/recovertPassword/:token')
  @UsePipes(ValidationPipe, PasswordValidationPipe, ConfirmPasswordPipe)
  recovertPassword(
    @Body() recovertPasswordRequest: RecovertPasswordRequest,
    @Param('token') token: string,
  ) {
    return this.authService.recovertPassword(token, recovertPasswordRequest);
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
