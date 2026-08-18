import { Test, TestingModule } from '@nestjs/testing';
import { BossesService } from './bosses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Boss } from './entities/boss.entity';

describe('BossesService', () => {
  let service: BossesService;

  const mockBossRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BossesService,
        {
          provide: getRepositoryToken(Boss),
          useValue: mockBossRepository,
        },
      ],
    }).compile();

    service = module.get<BossesService>(BossesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
