import { Test, TestingModule } from '@nestjs/testing';
import { ArmorsService } from './armors.service';

describe('ArmorsService', () => {
  let service: ArmorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmorsService],
    }).compile();

    service = module.get<ArmorsService>(ArmorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
