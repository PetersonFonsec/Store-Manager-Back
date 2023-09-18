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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { storage } from './../../utils/storage';
import { Product } from '../interfaces/products';
import { ProductsService } from '../services/products.service';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findProduct(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findProductByName(@Query('search') search: string): Promise<Product[]> {
    return search
      ? this.productService.findProductByName(search)
      : this.productService.getAllProducts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', storage('products_photo')))
  @UseGuards(JwtAuthGuard)
  create(@Body() product: Product, @UploadedFile() photo): Promise<Product> {
    return this.productService.createProduct(product, photo);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('photo', storage('products_photo')))
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() product: Product,
    @UploadedFile() photo,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product, photo);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
