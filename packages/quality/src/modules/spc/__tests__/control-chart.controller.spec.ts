import { Test, TestingModule } from '@nestjs/testing';
import { ControlChartController } from '../controllers/control-chart.controller';

describe('ControlChartController', () => {
  let controller: ControlChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlChartController],
    }).compile();

    controller = module.get<ControlChartController>(ControlChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
