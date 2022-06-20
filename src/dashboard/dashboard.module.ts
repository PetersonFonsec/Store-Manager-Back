import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { ProvidersModule } from 'src/providers/providers.module';
import { SalesModule } from 'src/sales/sales.module';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DashboardService } from './services/dashboard/dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [ProductsModule, SalesModule, ProvidersModule],
})
export class DashboardModule {}
