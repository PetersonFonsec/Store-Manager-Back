import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
