import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Sale } from '../interfaces/sale';
import { SalesService } from '../services/sales.service';

@Controller('sales')
export class SalesController {
  constructor(private saleService: SalesService) {}

  @Get()
  getSales(@Query() id: string): Promise<Sale | Sale[]> {
    return id ? this.saleService.findSale(id) : this.saleService.getAllSale();
  }

  @Post()
  createSale(@Body() sale: Sale): Promise<Sale> {
    return this.saleService.createSale(sale);
  }

  @Put()
  updateSale(@Query() id: string, @Body() sale: Sale): Promise<Sale> {
    return this.saleService.updateSale(id, sale);
  }

  @Delete()
  delateSale(@Query() id: string): Promise<Sale> {
    return this.saleService.deleteSale(id);
  }
}
