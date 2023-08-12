import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/products';

@Injectable()
export class ProductsService {
  private readonly staticAssetsPath = '/uploads/products_photo';
  private readonly imageDefault = 'imageNotFound.jpeg';

  constructor(@InjectModel('Products') private productModel: Model<Product>) {}

  async createProduct(product: Product, photo: any): Promise<Product> {
    const { name } = product;
    product.photo = photo?.filename || this.imageDefault;
    const result = await this.productModel.findOne({ name }).exec();

    if (result) {
      throw new BadRequestException(
        `there is already a product with this name: ${name}`,
      );
    }

    return await new this.productModel(product).save();
  }

  async findProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).exec();

      if (!product) {
        throw new NotFoundException(`Not found product with id: ${id}`);
      }
      product.photo = `${this.staticAssetsPath}/${product.photo}`;
      return product;
    } catch (error) {
      throw new NotFoundException(`Not found product with id: ${id}`);
    }
  }

  async findProductByName(search: string): Promise<Product[]> {
    try {
      let products = await this.productModel
        .find({
          name: {
            $regex: '.*' + search + '.*',
          },
        })
        .exec();

      if (!products) {
        throw new NotFoundException(`Not found product with name: ${search}`);
      }

      products = products.map((product) => this.setImageLinkInProduct(product));

      return products;
    } catch (error) {
      throw new NotFoundException(`Not found product with name: ${search}`);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    const products =  await this.productModel.find().exec();
    return products.map((product) => this.setImageLinkInProduct(product));
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    try {
      const productUpdated = await this.productModel
        .findByIdAndUpdate(id, { $set: product })
        .exec();

      if (!productUpdated) {
        throw new NotFoundException(`Not found product with id: ${id}`);
      }

      productUpdated.photo = `${this.staticAssetsPath}/${product.photo}`;
      return productUpdated;
    } catch (error) {
      throw new NotFoundException(`Not found product with id: ${id}`);
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      const productRemoved = await this.productModel
        .findByIdAndRemove(id)
        .exec();

      if (!productRemoved) {
        throw new NotFoundException(`Not found product with id: ${id}`);
      }

      return productRemoved;
    } catch (error) {
      throw new NotFoundException(`Not found product with id: ${id}`);
    }
  }

  private setImageLinkInProduct(product) {
    return Object.assign(product, {
      photo: `${this.staticAssetsPath}/${product.photo}`,
    });
  }
}
