import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { User } from 'src/users/interfaces/usuarios';
import { UsersService } from 'src/users/services/users.service';
import { LogingRequest } from '../interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginParams: LogingRequest): Promise<any> {
    const { email, password } = loginParams;

    if (!email || !password) {
      return new BadRequestException('Email e password are required');
    }

    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) throw new NotFoundException(`Email or password incorrect`);

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        throw new NotFoundException(`Email or password incorrect`);
      }

      const { name, _id } = user;
      return this.createToken(name, email, _id);
    } catch (error) {
      throw new NotFoundException(`Email or password incorrect`);
    }
  }

  async signup(user: User): Promise<any> {
    const newUser = await this.userService.createUser(user);
    const { name, _id, email } = newUser;

    return this.createToken(name, email, _id);
  }

  private createToken(name: string, email: string, _id: Schema.Types.ObjectId) {
    return {
      name,
      email,
      access_token: this.jwtService.sign({ id: _id.toString() }),
    };
  }

  //TODO PEGAR OS VALORES DO TOKEN PARA GERAR UM NOVO TOKEN
  async refresh(): Promise<any> {
    // return this.createToken()
  }
}
