import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/usuarios';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    return await new this.userModel(user).save();
  }

  async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(email: string, user: User): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate({ email }, { $set: user })
      .exec();
  }

  async deleteUser(email: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ email }).exec();
  }
}
