import { Test, TestingModule } from '@nestjs/testing';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Weapons } from './entities/weapons.entity';

describe('WeaponsController', () => {
  let controller: WeaponsController;

  const mockWeaponsRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponsController],
      providers: [
        WeaponsService,
        {
          provide: getRepositoryToken(Weapons),
          useValue: mockWeaponsRepository,
        },
      ],
    }).compile();

    controller = module.get<WeaponsController>(WeaponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
