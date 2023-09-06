import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors();
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
