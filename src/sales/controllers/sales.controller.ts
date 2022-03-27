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
import { Sale } from '../interfaces/sale';
import { SalesService } from '../services/sales.service';

@Controller('sales')
export class SalesController {
  constructor(private saleService: SalesService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getSales(@Param('id') id: string): Promise<Sale | Sale[]> {
    return this.saleService.findSaleById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getSalesByProduct(@Query('product') id: string): Promise<Sale | Sale[]> {
    return this.saleService.findSaleByProduct(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllSales(): Promise<Sale | Sale[]> {
    return this.saleService.getAllSale();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createSale(@Body() sale: Sale): Promise<Sale> {
    return this.saleService.createSale(sale);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  updateSale(@Param('id') id: string, @Body() sale: Sale): Promise<Sale> {
    return this.saleService.updateSale(id, sale);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delateSale(@Param('id') id: string): Promise<Sale> {
    return this.saleService.deleteSale(id);
  }
}
