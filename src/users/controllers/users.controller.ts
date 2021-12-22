import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  buscarUsuario(@Param('id') id: string): Promise<User | User[]> {
    return id ? this.userService.findUser(id) : this.userService.getAllUser();
  }

  @Post()
  @UsePipes(ValidationPipe, PasswordValidationPipe, ConfirmPasswordPipe)
  criarUsuario(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('/:id')
  atualizaUsuario(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  deletaUsuario(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
