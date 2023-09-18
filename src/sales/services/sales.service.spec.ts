import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { SalesService } from './sales.service';
import { SalesModule } from '../sales.module';
import { ProductsService } from './../../products/services/products.service';
import { AppModule } from './../../app.module';

describe('SalesService', () => {
  let service: SalesService;

  const mockRepository = {
    find: () => new Promise((resolve) => resolve('')),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SalesModule,
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: 'mongodb://root:example@mongodb:27017',
          }),
        }),
      ],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findProvider: jest.fn(),
            createProvider: jest.fn(),
            updateProvider: jest.fn(),
            deleteProvider: jest.fn(),
            getAllProviders: jest.fn(),
            findProviderByName: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(getModelToken('Sales'))
      .useValue(mockRepository)
      .compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
