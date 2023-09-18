import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from '../interfaces/usuarios';
import { getModelToken } from '@nestjs/mongoose';
import { UsersModule } from '../users.module';

fdescribe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find() {
      return new Promise((resolve) => resolve(''));
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken('Users'))
      .useValue(mockRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
