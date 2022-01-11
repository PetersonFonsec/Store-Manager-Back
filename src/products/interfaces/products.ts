import { IsNotEmpty } from 'class-validator';
export class Product {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price_buy: number;
  @IsNotEmpty()
  price_sale: number;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  photo: string;
}
