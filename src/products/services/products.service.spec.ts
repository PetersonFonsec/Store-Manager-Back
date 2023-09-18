import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsModule } from '../products.module';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockRepository = {
    find: () => new Promise((resolve) => resolve('')),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(getModelToken('Products'))
      .useValue(mockRepository)
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
