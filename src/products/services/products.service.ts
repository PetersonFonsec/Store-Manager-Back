import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/products';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Products') private productModel: Model<Product>) {}

  async createProduct(product: Product): Promise<Product> {
    return await new this.productModel(product).save();
  }

  async findProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, { $set: product })
      .exec();
  }

  async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id).exec();
  }
}
