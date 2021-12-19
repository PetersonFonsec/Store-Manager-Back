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
import { UsuariosService } from '../services/usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  buscarUsuario(@Query('id') id: String): string {
    return id
      ? this.usuariosService.findUser(id)
      : this.usuariosService.getAllUser();
  }

  @Post()
  criarUsuario(@Body() user: User): void {
    this.usuariosService.createUser(user);
  }

  @Put()
  atualizaUsuario(@Body() user: User): void {
    this.usuariosService.updateUser(user);
  }

  @Delete()
  deletaUsuario(@Query('id') id: string): void {
    this.usuariosService.deleteUser(id);
  }
}
