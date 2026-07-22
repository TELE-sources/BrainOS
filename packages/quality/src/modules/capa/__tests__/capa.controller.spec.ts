import { Test, TestingModule } from '@nestjs/testing';
import { CAPAController } from '../controllers/capa.controller';

describe('CAPAController', () => {
  let controller: CAPAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CAPAController],
    }).compile();

    controller = module.get<CAPAController>(CAPAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
