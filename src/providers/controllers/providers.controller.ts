import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProvidersService } from '../services/providers.service';
import { Provider } from '../interfaces/provider';
import { CelphoneValidationPipe } from 'src/providers/pipes/celphone-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllProviders(): Promise<Provider[]> {
    return this.providerService.getAllProviders();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getProviders(@Param('id') id: string): Promise<Provider> {
    return this.providerService.findProvider(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe, CelphoneValidationPipe)
  createProvider(@Body() provider: Provider): Promise<Provider> {
    return this.providerService.createProvider(provider);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  updateProvider(
    @Param('id') id: string,
    @Body() provider: Provider,
  ): Promise<Provider> {
    return this.providerService.updateProvider(id, provider);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteProvider(@Param('id') id: string): Promise<Provider> {
    return this.providerService.removeProvider(id);
  }
}
