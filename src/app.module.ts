import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://root:example@mongodb:27017'),
    ProductsModule,
    ProvidersModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
