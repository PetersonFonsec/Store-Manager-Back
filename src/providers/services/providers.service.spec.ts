import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { ProvidersService } from './providers.service';
import { ProvidersModule } from '../providers.module';

describe('ProvidersService', () => {
  let service: ProvidersService;

  const mockRepository = {
    find() {
      return new Promise((resolve) => resolve(''));
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProvidersModule],
    })
      .overrideProvider(getModelToken('Providers'))
      .useValue(mockRepository)
      .compile();

    service = module.get<ProvidersService>(ProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
