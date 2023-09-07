import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { join } from 'path';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { winstonConfig } from './configs/winston.config';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

const emailConfig = {
  transport: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'pat39@ethereal.email',
      pass: 'H575V5T2SvQtTrDccK',
    },
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  port: 587,
  template: {
    dir: __dirname + '/emails/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://root:example@mongodb:27017'),
    ProductsModule,
    ProvidersModule,
    SalesModule,
    AuthModule,
    DashboardModule,
    WinstonModule.forRoot(winstonConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
    MailerModule.forRoot(emailConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
