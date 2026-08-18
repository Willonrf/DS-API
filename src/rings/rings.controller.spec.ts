import { Test, TestingModule } from '@nestjs/testing';
import { RingsController } from './rings.controller';
import { RingsService } from './rings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ring } from './entities/ring.entity';

describe('RingsController', () => {
  let controller: RingsController;

  const mockRingRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RingsController],
      providers: [
        RingsService,
        {
          provide: getRepositoryToken(Ring),
          useValue: mockRingRepository,
        },
      ],
    }).compile();

    controller = module.get<RingsController>(RingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
