import { Test, TestingModule } from '@nestjs/testing';
import { ConsumablesController } from './consumables.controller';
import { ConsumablesService } from './consumables.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consumable } from './entities/consumable.entity';

describe('ConsumablesController', () => {
  let controller: ConsumablesController;

  const mockConsumableRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumablesController],
      providers: [
        ConsumablesService,
        {
          provide: getRepositoryToken(Consumable),
          useValue: mockConsumableRepository,
        },
      ],
    }).compile();

    controller = module.get<ConsumablesController>(ConsumablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
