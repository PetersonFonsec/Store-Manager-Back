import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from '../services/providers.service';

describe('ProvidersController', () => {
  let controller: ProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [
        {
          provide: ProvidersService,
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
    }).compile();

    controller = module.get<ProvidersController>(ProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
