import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider } from '../interfaces/provider';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel('Providers') private providersModel: Model<Provider>,
  ) {}

  async createProvider(provider: Provider): Promise<Provider> {
    return await new this.providersModel(provider).save();
  }

  async findProvider(email: string): Promise<Provider> {
    return await this.providersModel.findOne({ email }).exec();
  }

  async getAllProviders(): Promise<Provider[]> {
    return await this.providersModel.find().exec();
  }

  async updateProvider(email: string, provider: Provider): Promise<Provider> {
    return await this.providersModel
      .findOneAndUpdate({ email }, { $set: provider })
      .exec();
  }

  async removeProvider(email: string): Promise<Provider> {
    return await this.providersModel.findOneAndRemove({ email }).exec();
  }
}
