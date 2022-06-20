import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from '../interfaces/sale';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel('Sales') private saleModel: Model<Sale>,
    private productsService: ProductsService,
  ) {}

  async createSale(sale: Sale): Promise<any> {
    try {
      const { product, quantity } = sale;

      const hasProduct = await this.productsService.findProduct(product);

      if (!hasProduct) {
        throw new NotFoundException(`Not found product with id: ${product}`);
      }

      sale.price = hasProduct.price_sale * quantity;

      return await new this.saleModel(sale).save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateSale(id: string, sale: Sale): Promise<Sale> {
    try {
      const saleUpdated = await this.saleModel
        .findByIdAndUpdate(id, { $set: sale })
        .exec();

      if (!saleUpdated) {
        throw new NotFoundException(`Not found sale with id: ${id}`);
      }

      return saleUpdated;
    } catch (error) {
      throw new NotFoundException(`Not found sale with id: ${id}`);
    }
  }

  async findSaleById(id: string): Promise<Sale> {
    try {
      const saleUpdated = await this.saleModel.findById(id).exec();

      if (!saleUpdated) {
        throw new NotFoundException(`Not found sale with id: ${id}`);
      }

      return saleUpdated;
    } catch (error) {
      throw new NotFoundException(`Not found sale with id: ${id}`);
    }
  }

  async findSaleByProduct(product_id: string): Promise<any> {
    try {
      const saleUpdated = await this.saleModel
        .find({
          product_id,
        })
        .populate('product')
        .exec();

      return saleUpdated;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAllSale(): Promise<Sale[]> {
    return await this.saleModel.find().populate('product').exec();
  }

  async deleteSale(id: string): Promise<Sale> {
    try {
      const saleUpdated = await this.saleModel.findById(id).exec();

      if (!saleUpdated) {
        throw new NotFoundException(`Not found sale with id: ${id}`);
      }

      return await this.saleModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new NotFoundException(`Not found sale with id: ${id}`);
    }
  }
}
