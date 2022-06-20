import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvidersController } from './controllers/providers.controller';
import { providerSchema } from './interfaces/provider.schema';
import { ProvidersService } from './services/providers.service';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService],
  imports: [
    MongooseModule.forFeature([{ name: 'Providers', schema: providerSchema }]),
  ],
  exports: [ProvidersService],
})
export class ProvidersModule {}
