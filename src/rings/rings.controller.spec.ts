import { Test, TestingModule } from '@nestjs/testing';
import { RingsController } from './rings.controller';
import { RingsService } from './rings.service';

describe('RingsController', () => {
  let controller: RingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RingsController],
      providers: [RingsService],
    }).compile();

    controller = module.get<RingsController>(RingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
