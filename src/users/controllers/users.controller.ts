import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '../interfaces/usuarios';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  buscarUsuario(
    @Query('email') email: string,
  ): Promise<User> | Promise<User[]> {
    return email
      ? this.userService.findUser(email)
      : this.userService.getAllUser();
  }

  @Post()
  criarUsuario(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put()
  atualizaUsuario(
    @Query('email') email: string,
    @Body() user: User,
  ): Promise<User> {
    return this.userService.updateUser(email, user);
  }

  @Delete()
  deletaUsuario(@Query('email') email: string): Promise<User> {
    return this.userService.deleteUser(email);
  }
}
