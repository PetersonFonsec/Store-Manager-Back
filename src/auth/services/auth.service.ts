import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'src/users/interfaces/usuarios';
import { UsersService } from 'src/users/services/users.service';
import { LogingRequest } from '../interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailer: MailerService,
  ) {}

  async login(loginParams: LogingRequest): Promise<any> {
    const { email, password } = loginParams;

    if (!email || !password) {
      return new BadRequestException('Email e password are required');
    }

    try {
      const user = await this.userService.validPassword(password, email);
      const access_token = this.createToken(user._id);
      user.photo = this.userService.findPhoto(user.photo);
      return { user, access_token };
    } catch (error) {
      throw new NotFoundException(`Email or password incorrect`);
    }
  }

  async signup(user: User): Promise<any> {
    const newUser = await this.userService.createUser(user);
    const { _id, email, name } = newUser;

    const access_token = this.createToken(_id);
    const userCreated = await this.userService.findUserByEmail(email);

    await this.mailer.sendMail({
      subject: 'Seja bem vindo !!',
      template: 'wellcome',
      context: { name },
      to: email,
    });

    return { user: userCreated, access_token };
  }

  private createToken(_id: Schema.Types.ObjectId) {
    return this.jwtService.sign({ id: _id.toString() });
  }

  //TODO PEGAR OS VALORES DO TOKEN PARA GERAR UM NOVO TOKEN
  async refresh(): Promise<any> {
    // return this.createToken()
  }
}
