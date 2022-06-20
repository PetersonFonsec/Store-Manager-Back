import { Product } from 'src/products/interfaces/products';
import { Sale } from 'src/sales/interfaces/sale';

export interface IDashboard {
  products: {
    register: number;
    best_sellers: any[];
    less_sold: any[];
  };
  providers: number;
  sale: any[];
}
