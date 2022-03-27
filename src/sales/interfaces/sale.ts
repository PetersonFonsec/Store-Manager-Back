import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/interfaces/products';

export class Sale {
  @IsNotEmpty()
  product: string;
  @IsNotEmpty()
  quantity: number;
  price: number;
}
export class CreateSaleResponse {
  product: string;
  quantity: number;
}
export class FindSaleByProduct {
  product: Product;
  quantity: number;
  price: number;
}
