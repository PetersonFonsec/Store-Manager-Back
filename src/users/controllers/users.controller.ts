import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../interfaces/usuarios';
import { ConfirmPasswordPipe } from '../pipes/confirm-password/confirm-password.pipe';
import { PasswordValidationPipe } from '../pipes/password-validation/password-validation.pipe';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findUser(id);
  }

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Post()
  @UsePipes(ValidationPipe, PasswordValidationPipe, ConfirmPasswordPipe)
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
