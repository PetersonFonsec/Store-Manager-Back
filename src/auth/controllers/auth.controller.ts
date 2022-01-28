import { Body, Controller, Post } from '@nestjs/common';
import { LogingRequest } from '../interfaces/auth';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginParams: LogingRequest) {
    return this.authService.login(loginParams);
  }
}
