import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './../products/products.module';

import { SalesController } from './controllers/sales.controller';
import { SaleSchema } from './interfaces/sale.schema';
import { SalesService } from './services/sales.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Sales', schema: SaleSchema }]),
    ProductsModule,
  ],
  exports: [SalesService],
})
export class SalesModule {}
