import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProvidersService } from '../services/providers.service';
import { Provider } from '../interfaces/provider';
import { CelphoneValidationPipe } from 'src/providers/pipes/celphone-validation.pipe';

@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Get()
  getAllProviders(): Promise<Provider[]> {
    return this.providerService.getAllProviders();
  }

  @Get('/:id')
  getProviders(@Param('id') id: string): Promise<Provider> {
    return this.providerService.findProvider(id);
  }

  @Post()
  @UsePipes(ValidationPipe, CelphoneValidationPipe)
  createProvider(@Body() provider: Provider): Promise<Provider> {
    return this.providerService.createProvider(provider);
  }

  @Put('/:id')
  updateProvider(
    @Param('id') id: string,
    @Body() provider: Provider,
  ): Promise<Provider> {
    return this.providerService.updateProvider(id, provider);
  }

  @Delete('/:id')
  deleteProvider(@Param('id') id: string): Promise<Provider> {
    return this.providerService.removeProvider(id);
  }
}
