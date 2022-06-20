import { BadRequestException, Injectable } from '@nestjs/common';
import { IDashboard } from 'src/dashboard/interfaces/dashboard.interface';
import { Product } from 'src/products/interfaces/products';
import { ProductsService } from 'src/products/services/products.service';
import { ProvidersService } from 'src/providers/services/providers.service';
import { Sale, Salle } from 'src/sales/interfaces/sale';
import { SalesService } from 'src/sales/services/sales.service';

@Injectable()
export class DashboardService {
  constructor(
    private productService: ProductsService,
    private providerService: ProvidersService,
    private saleService: SalesService,
  ) {}

  async getDashboard(): Promise<IDashboard> {
    const products = await this.productService.getAllProducts();
    const provider = await this.providerService.getAllProviders();
    const sale = await this.saleService.getAllSale();
    const best_sellers = this.getBestSellers(sale);
    const less_sold = this.getLessSold(sale);

    return {
      products: {
        register: products.length,
        best_sellers,
        less_sold,
      },
      providers: provider.length,
      sale: this.getAllSalesInLastMonth(sale),
    };
  }

  transformSales(sale: any[]): any[] {
    const produtos = [];
    const hasProduct = (v) => {
      return produtos.filter((prod) => prod.product._id === v.product._id);
    };

    const sumQuantity = (venda) => {
      produtos.forEach((prod, index) => {
        if (prod.product._id === venda.product._id)
          produtos[index].quantity += venda.quantity;
      });
    };

    sale.forEach((venda) => {
      !hasProduct(venda).length ? produtos.push(venda) : sumQuantity(venda);
    });

    return produtos;
  }

  getBestSellers(sales: any[]): any[] {
    const produtos = this.transformSales(sales);
    return produtos.sort((a, b) => (a.quantity < b.quantity ? 1 : -1));
  }

  getLessSold(sales: any[]): any[] {
    const produtos = this.transformSales(sales);
    return produtos.sort((a, b) => (a.quantity > b.quantity ? 1 : -1));
  }

  getAllSalesInLastMonth(sales: Sale[]): Sale[] {
    return sales;
  }
}
