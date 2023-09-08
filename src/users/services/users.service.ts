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
  private readonly staticAssetsPath = '/uploads/users_photo';
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
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`Not found the user with id: ${id}`);
    user.photo = this.findPhoto(user.photo);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user)
      throw new NotFoundException(`Not found the user with email: ${email}`);
    user.photo = this.findPhoto(user.photo);
    return user;
  }

  async getAllUser(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async updateUser(id: string, fields: User, photo: any): Promise<User> {
    fields.photo = photo?.filename || this.imageDefault;

    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: fields })
      .exec();
    if (!user) throw new NotFoundException(`Not found the user with id: ${id}`);
    user.photo = this.findPhoto(user.photo);
    return user;
  }

  async forgetPassword(userId: string, newPassword: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User not found`);

    user.password = bcrypt.hashSync(newPassword, 8);
    return await user.save();
  }

  async updatePassword(
    _id: string,
    fields: User & { current_password: string },
  ): Promise<User> {
    const { password, current_password, email } = fields;
    const user = await this.validPassword(current_password, email);
    user.password = bcrypt.hashSync(password, 8);
    await user.save();
    user.photo = this.findPhoto(user.photo);
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException(`Not found the user with id: ${id}`);
    return user;
  }

  public findPhoto(photo: string): string {
    return photo === this.imageDefault
      ? `/images/${photo}`
      : `${this.staticAssetsPath}/${photo}`;
  }

  public async validPassword(password, email) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException(`Email incorrect`);

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new NotFoundException(`password incorrect`);
    }

    return user;
  }
}
