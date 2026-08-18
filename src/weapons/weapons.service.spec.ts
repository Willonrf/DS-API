import { Test, TestingModule } from '@nestjs/testing';
import { WeaponsService } from './weapons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Weapons } from './entities/weapons.entity';

describe('WeaponsService', () => {
  let service: WeaponsService;

  const mockWeaponRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponsService,
        {
          provide: getRepositoryToken(Weapons),
          useValue: mockWeaponRepository,
        },
      ],
    }).compile();

    service = module.get<WeaponsService>(WeaponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
