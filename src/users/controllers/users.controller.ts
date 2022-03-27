import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../interfaces/usuarios';
import { ConfirmPasswordPipe } from '../pipes/confirm-password/confirm-password.pipe';
import { PasswordValidationPipe } from '../pipes/password-validation/password-validation.pipe';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findUser(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe, PasswordValidationPipe, ConfirmPasswordPipe)
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
