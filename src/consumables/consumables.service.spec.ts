import { Test, TestingModule } from '@nestjs/testing';
import { ConsumablesService } from './consumables.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consumable } from './entities/consumable.entity';

describe('ConsumablesService', () => {
  let service: ConsumablesService;

  const mockConsumableRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumablesService,
        {
          provide: getRepositoryToken(Consumable),
          useValue: mockConsumableRepository,
        },
      ],
    }).compile();

    service = module.get<ConsumablesService>(ConsumablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
