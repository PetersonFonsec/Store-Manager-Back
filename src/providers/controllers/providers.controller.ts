import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProvidersService } from '../services/providers.service';
import { Provider } from '../interfaces/provider';

@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Get()
  getProviders(@Query('email') email: string): Promise<Provider | Provider[]> {
    return email
      ? this.providerService.findProvider(email)
      : this.providerService.getAllProviders();
  }

  @Post()
  createProvider(@Body() provider: Provider): Promise<Provider> {
    return this.providerService.createProvider(provider);
  }

  @Put()
  updateProvider(
    @Query('email') email: string,
    @Body() provider: Provider,
  ): Promise<Provider> {
    return this.providerService.updateProvider(email, provider);
  }

  @Delete()
  deleteProvider(@Query('email') email: string): Promise<Provider> {
    return this.providerService.removeProvider(email);
  }
}
