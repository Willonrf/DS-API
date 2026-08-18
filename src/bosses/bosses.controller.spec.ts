import { Test, TestingModule } from '@nestjs/testing';
import { BossesController } from './bosses.controller';
import { BossesService } from './bosses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Boss } from './entities/boss.entity';

describe('BossesController', () => {
  let controller: BossesController;

  const mockBossRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BossesController],
      providers: [
        BossesService,
        {
          provide: getRepositoryToken(Boss),
          useValue: mockBossRepository,
        },
      ],
    }).compile();

    controller = module.get<BossesController>(BossesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
