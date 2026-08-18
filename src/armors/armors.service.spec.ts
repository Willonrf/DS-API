import { Test, TestingModule } from '@nestjs/testing';
import { ArmorsService } from './armors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Armor } from './entities/armor.entity';

describe('ArmorsService', () => {
  let service: ArmorsService;

  const mockArmorRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArmorsService,
        {
          provide: getRepositoryToken(Armor),
          useValue: mockArmorRepository,
        },
      ],
    }).compile();

    service = module.get<ArmorsService>(ArmorsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
