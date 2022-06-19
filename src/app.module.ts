import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://root:example@mongodb:27017'),
    ProductsModule,
    ProvidersModule,
    SalesModule,
    AuthModule,
    DashboardModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
