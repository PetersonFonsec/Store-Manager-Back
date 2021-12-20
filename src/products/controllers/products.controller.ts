import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from '../interfaces/products';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  get(@Query('id') id: string): Promise<Product | Product[]> {
    return id
      ? this.productService.getAllProducts()
      : this.productService.findProduct(id);
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put()
  update(@Query('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete()
  delete(@Query('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
