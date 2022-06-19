import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider } from '../interfaces/provider';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel('Providers') private providersModel: Model<Provider>,
  ) {}

  async createProvider(provider: Provider): Promise<Provider> {
    const { email, celphone } = provider;
    const emailExist = await this.providersModel.findOne({ email });

    if (emailExist) {
      throw new BadRequestException(
        `there is already a provider with this email: ${email}`,
      );
    }

    const celphoneExist = await this.providersModel.findOne({ celphone });
    if (celphoneExist) {
      throw new BadRequestException(
        `there is already a provider with this celphone: ${celphone}`,
      );
    }

    return await new this.providersModel(provider).save();
  }

  async findProvider(id: string): Promise<Provider> {
    try {
      const provider = await this.providersModel.findById(id).exec();

      if (!provider) {
        throw new NotFoundException(`Not found provider with id: ${id}`);
      }

      return provider;
    } catch (error) {
      throw new NotFoundException(`Not found provider with id: ${id}`);
    }
  }
  async findProviderByName(search: string): Promise<Provider[]> {
    try {
      const provider = await this.providersModel
        .find({
          name: {
            $regex: '.*' + search + '.*',
          },
        })
        .exec();

      if (!provider) {
        throw new NotFoundException(
          `Not found provider with search: ${search}`,
        );
      }

      return provider;
    } catch (error) {
      throw new NotFoundException(`Not found provider with search: ${search}`);
    }
  }

  async getAllProviders(): Promise<Provider[]> {
    return await this.providersModel.find().exec();
  }

  async updateProvider(id: string, provider: Provider): Promise<Provider> {
    try {
      const providerUpdated = await this.providersModel
        .findByIdAndUpdate(id, { $set: provider })
        .exec();

      if (!providerUpdated) {
        throw new NotFoundException(`Not found provider with id: ${id}`);
      }

      return providerUpdated;
    } catch (error) {
      throw new NotFoundException(`Not found provider with id: ${id}`);
    }
  }

  async removeProvider(id: string): Promise<Provider> {
    try {
      const providerRemoved = await this.providersModel
        .findByIdAndRemove(id)
        .exec();
      if (!providerRemoved)
        throw new NotFoundException(`Not found provider with id: ${id}`);
      return providerRemoved;
    } catch (error) {
      throw new NotFoundException(`Not found provider with id: ${id}`);
    }
  }
}
