import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SalesController } from './controllers/sales.controller';
import { SaleSchema } from './interfaces/sale.schema';
import { SalesService } from './services/sales.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [MongooseModule.forFeature([{ name: 'Sales', schema: SaleSchema }])],
})
export class SalesModule {}
