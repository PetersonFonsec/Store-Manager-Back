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
import { CelphoneValidationPipe } from './../../providers/pipes/celphone-validation.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './../../utils/storage';

@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findProviderByName(@Query('search') search: string): Promise<Provider[]> {
    return search
      ? this.providerService.findProviderByName(search)
      : this.providerService.getAllProviders();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getProviders(@Param('id') id: string): Promise<Provider> {
    return this.providerService.findProvider(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe, CelphoneValidationPipe)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('photo', storage('providers_photo')))
  createProvider(
    @Body() provider: Provider,
    @UploadedFile() photo,
  ): Promise<Provider> {
    return this.providerService.createProvider(provider, photo);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', storage('providers_photo')))
  updateProvider(
    @Param('id') id: string,
    @Body() provider: Provider,
    @UploadedFile() photo,
  ): Promise<Provider> {
    return this.providerService.updateProvider(id, provider, photo);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteProvider(@Param('id') id: string): Promise<Provider> {
    return this.providerService.removeProvider(id);
  }
}
