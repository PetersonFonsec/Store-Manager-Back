import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/interfaces/usuarios';
import { UsersService } from 'src/users/services/users.service';
import {
  ForgetRequest,
  LogingRequest,
  RecovertPasswordRequest,
} from '../interfaces/auth';

@Injectable()
export class AuthService {
  private teste = '';

  constructor(
    private configService: ConfigService,
    private userService: UsersService,
    private jwtService: JwtService,
    private mailer: MailerService,
  ) {
    const FRONT_HOST = this.configService.get<string>('FRONT_HOST');
    this.teste = FRONT_HOST;
  }

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
      subject: `${name} Seja bem vindo !!`,
      template: 'wellcome',
      context: { name },
      to: email,
    });

    return { user: userCreated, access_token };
  }

  async forget(forgetRequest: ForgetRequest): Promise<any> {
    const user = await this.userService.findUserByEmail(forgetRequest.email);
    const TOKEN = this.createToken(user._id);
    const FRONT_HOST = this.configService.get<string>(
      'FRONT_HOST',
      'http://localhost:4200',
    );
    const link = `${FRONT_HOST}/signup/forget/${TOKEN}`;
    await this.mailer.sendMail({
      subject: `${user.name} Esqueceu sua senha? crie outra !!`,
      template: 'recovery-password',
      context: { link, name: user.name },
      to: forgetRequest.email,
    });
  }

  async recovertPassword({
    password,
    token,
  }: RecovertPasswordRequest): Promise<any> {
    try {
      const userId = await this.jwtService.verifyAsync(token);
      if (!userId) throw new BadRequestException(`Invalid Token`);
      return await this.userService.forgetPassword(userId.id, password);
    } catch (error) {
      throw new BadRequestException(`Invalid Token`);
    }
  }

  private createToken(_id: Schema.Types.ObjectId) {
    return this.jwtService.sign({ id: _id.toString() });
  }
}
