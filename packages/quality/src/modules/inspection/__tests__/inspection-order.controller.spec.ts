import { Test, TestingModule } from '@nestjs/testing';
import { InspectionOrderController } from '../controllers/inspection-order.controller';

describe('InspectionOrderController', () => {
  let controller: InspectionOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionOrderController],
    }).compile();

    controller = module.get<InspectionOrderController>(InspectionOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
