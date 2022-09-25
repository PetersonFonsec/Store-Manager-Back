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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { storage } from 'src/utils/storage';
import { Product } from '../interfaces/products';
import { ProductsService } from '../services/products.service';
@Controller('products')
export class ProductsController {
  private readonly imageDefault = '';

  constructor(private productService: ProductsService) {}

  @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  findProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findProduct(id);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findProductByName(@Query('search') search: string): Promise<Product[]> {
    return search
      ? this.productService.findProductByName(search)
      : this.productService.getAllProducts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', storage('products_photo')))
  // @UseGuards(JwtAuthGuard)
  create(@Body() product: Product, @UploadedFile() photo): Promise<Product> {
    product.photo = photo?.filename || this.imageDefault;
    return this.productService.createProduct(product);
  }

  @Put('/:id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
