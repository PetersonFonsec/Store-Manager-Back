import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';

import { SalesService } from './../../../sales/services/sales.service';
import { ProductsService } from './../../../products/services/products.service';
import { ProvidersService } from './../../../providers/services/providers.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: ProductsService,
          useValue: {
            getAllProducts: jest.fn(),
          },
        },
        {
          provide: ProvidersService,
          useValue: {
            getAllProviders: jest.fn(),
          },
        },
        {
          provide: SalesService,
          useValue: {
            getAllSale: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
