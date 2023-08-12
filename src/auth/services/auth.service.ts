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

      const access_token = this.createToken(user._id);
      return {user, access_token};
    } catch (error) {
      throw new NotFoundException(`Email or password incorrect`);
    }
  }

  async signup(user: User): Promise<any> {
    const newUser = await this.userService.createUser(user);
    const { name, _id, email } = newUser;

    const access_token = this.createToken(_id);
    const userCreated = await this.userService.findUserByEmail(email);

    return {user: userCreated, access_token};
  }

  private createToken(_id: Schema.Types.ObjectId) {
    return  this.jwtService.sign({ id: _id.toString() })
  }

  //TODO PEGAR OS VALORES DO TOKEN PARA GERAR UM NOVO TOKEN
  async refresh(): Promise<any> {
    // return this.createToken()
  }
}
