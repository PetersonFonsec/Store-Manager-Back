import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from '../interfaces/products';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/:id')
  findProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findProduct(id);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
