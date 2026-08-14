import { Test, TestingModule } from '@nestjs/testing';
import { ArmorsController } from './armors.controller';
import { ArmorsService } from './armors.service';

describe('ArmorsController', () => {
  let controller: ArmorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmorsController],
      providers: [ArmorsService],
    }).compile();

    controller = module.get<ArmorsController>(ArmorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
