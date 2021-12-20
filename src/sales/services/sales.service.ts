import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from '../interfaces/sale';
import { Model } from 'mongoose';

@Injectable()
export class SalesService {
  constructor(@InjectModel('Sales') private saleModel: Model<Sale>) {}

  async createSale(sale: Sale): Promise<Sale> {
    return await new this.saleModel(sale);
  }

  async updateSale(id: string, sale: Sale): Promise<Sale> {
    return await this.saleModel.findByIdAndUpdate(id, { $set: sale }).exec();
  }

  async findSale(id: string): Promise<Sale> {
    return await this.saleModel.findById(id).exec();
  }

  async getAllSale(): Promise<Sale[]> {
    return await this.saleModel.find().exec();
  }

  async deleteSale(id: string): Promise<Sale> {
    return await this.saleModel.findByIdAndDelete(id).exec();
  }
}
