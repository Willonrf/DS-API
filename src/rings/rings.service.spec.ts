import { Test, TestingModule } from '@nestjs/testing';
import { RingsService } from './rings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ring } from './entities/ring.entity';

describe('RingsService', () => {
  let service: RingsService;

  const mockRingRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RingsService,
        {
          provide: getRepositoryToken(Ring),
          useValue: mockRingRepository,
        },
      ],
    }).compile();

    service = module.get<RingsService>(RingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
