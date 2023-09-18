import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from '../services/sales.service';

describe('SalesController', () => {
  let controller: SalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        {
          provide: SalesService,
          useValue: {
            findSale: jest.fn(),
            createSale: jest.fn(),
            updateSale: jest.fn(),
            deleteSale: jest.fn(),
            getAllSales: jest.fn(),
            findSaleByName: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
