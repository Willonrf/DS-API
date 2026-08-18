import { Test, TestingModule } from '@nestjs/testing';
import { ArmorsController } from './armors.controller';
import { ArmorsService } from './armors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Armor } from './entities/armor.entity';

describe('ArmorsController', () => {
  let controller: ArmorsController;

  const mockArmorRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmorsController],
      providers: [
        ArmorsService,
        {
          provide: getRepositoryToken(Armor),
          useValue: mockArmorRepository,
        },
      ],
    }).compile();

    controller = module.get<ArmorsController>(ArmorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
