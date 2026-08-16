import { Test, TestingModule } from '@nestjs/testing';
import { RingsService } from './rings.service';

describe('RingsService', () => {
  let service: RingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RingsService],
    }).compile();

    service = module.get<RingsService>(RingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
