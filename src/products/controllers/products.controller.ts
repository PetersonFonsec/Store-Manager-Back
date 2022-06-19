import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Product } from '../interfaces/products';
import { ProductsService } from '../services/products.service';
import { v4 as uuidv4 } from 'uuid';
const path = require('path');

export const storage = (destination) => ({
  storage: diskStorage({
    destination: `./uploads/${destination}`,
    filename: (req, file, cb) => {
      const filename =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
});
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  findProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findProduct(id);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', storage('products_photo')))
  // @UseGuards(JwtAuthGuard)
  create(@Body() product: Product, @UploadedFile() photo): Promise<Product> {
    product.photo = photo.filename;
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
