import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProvidersService } from '../services/providers.service';
import { Provider } from '../interfaces/provider';
import { CelphoneValidationPipe } from 'src/providers/pipes/celphone-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/products/controllers/products.controller';

@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  findProviderByName(@Query('search') search: string): Promise<Provider[]> {
    return search
      ? this.providerService.findProviderByName(search)
      : this.providerService.getAllProviders();
  }

  @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  getProviders(@Param('id') id: string): Promise<Provider> {
    return this.providerService.findProvider(id);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe, CelphoneValidationPipe)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('photo', storage('providers_photo')))
  createProvider(
    @Body() provider: Provider,
    @UploadedFile() photo,
  ): Promise<Provider> {
    provider.photo = photo.filename;
    return this.providerService.createProvider(provider);
  }

  @Put('/:id')
  // @UseGuards(JwtAuthGuard)
  updateProvider(
    @Param('id') id: string,
    @Body() provider: Provider,
  ): Promise<Provider> {
    return this.providerService.updateProvider(id, provider);
  }

  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  deleteProvider(@Param('id') id: string): Promise<Provider> {
    return this.providerService.removeProvider(id);
  }
}
