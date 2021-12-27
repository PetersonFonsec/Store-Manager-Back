import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Sale } from '../interfaces/sale';
import { SalesService } from '../services/sales.service';

@Controller('sales')
export class SalesController {
  constructor(private saleService: SalesService) {}

  @Get('/:id')
  getSales(@Param('id') id: string): Promise<Sale | Sale[]> {
    return this.saleService.findSale(id);
  }

  @Get()
  getAllSales(): Promise<Sale | Sale[]> {
    return this.saleService.getAllSale();
  }

  @Post()
  createSale(@Body() sale: Sale): Promise<Sale> {
    return this.saleService.createSale(sale);
  }

  @Put('/:id')
  updateSale(@Param('id') id: string, @Body() sale: Sale): Promise<Sale> {
    return this.saleService.updateSale(id, sale);
  }

  @Delete('/:id')
  delateSale(@Param('id') id: string): Promise<Sale> {
    return this.saleService.deleteSale(id);
  }
}
