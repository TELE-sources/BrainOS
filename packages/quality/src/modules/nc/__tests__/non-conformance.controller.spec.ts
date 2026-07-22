import { Test, TestingModule } from '@nestjs/testing';
import { NonConformanceController } from '../controllers/non-conformance.controller';

describe('NonConformanceController', () => {
  let controller: NonConformanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonConformanceController],
    }).compile();

    controller = module.get<NonConformanceController>(NonConformanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
