import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/usuarios';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private readonly staticAssetsPath = '/images';
  private readonly imageDefault = 'userDefault.png';

  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const { email, password } = user;
    const userExist = await this.userModel.findOne({ email }).exec();

    user.photo = this.imageDefault;
    user.password = bcrypt.hashSync(password, 8);

    if (userExist) {
      throw new BadRequestException(
        `there is already a user with this email: ${email}`,
      );
    }

    return await new this.userModel(user).save();
  }

  async findUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user)
        throw new NotFoundException(`Not found the user with id: ${id}`);
      user.photo = `${this.staticAssetsPath}/${user.photo}`;
      return user;
    } catch (error) {
      throw new NotFoundException(`Not found the user with id: ${id}`);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user)
        throw new NotFoundException(`Not found the user with email: ${email}`);
      user.photo = `${this.staticAssetsPath}/${user.photo}`;
      return user;
    } catch (error) {
      throw new NotFoundException(`Not found the user with email: ${email}`);
    }
  }

  async getAllUser(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async updateUser(id: string, fields: User): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: fields })
      .exec();
    if (!user) throw new NotFoundException(`Not found the user with id: ${id}`);
    user.photo = `${this.staticAssetsPath}/${user.photo}`;
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if (!user)
        throw new NotFoundException(`Not found the user with id: ${id}`);
      return user;
    } catch (error) {
      throw new NotFoundException(`Not found the user with id: ${id}`);
    }
  }
}
