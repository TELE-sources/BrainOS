import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabSampleController } from '../controllers/lab-sample.controller';
import { LabSampleService } from '../services/lab-sample.service';
import { LabSample } from '../entities/lab-sample.entity';
import { LabTest } from '../entities/lab-test.entity';
import { CreateLabSampleDto, UpdateLabSampleDto } from '../dtos';
import { NotFoundException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('LabSampleController', () => {
  let controller: LabSampleController;
  let service: LabSampleService;

  const mockSample = {
    id: '1',
    sampleType: 'water',
    collectedBy: 'tech',
    collectionDate: new Date(),
    description: 'Test sample',
  } as LabSample;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabSampleController],
      providers: [
        {
          provide: LabSampleService,
          useValue: createMock<LabSampleService>({
            create: jest.fn().mockResolvedValue(mockSample),
            findAll: jest.fn().mockResolvedValue([mockSample]),
            findOne: jest.fn().mockResolvedValue(mockSample),
            update: jest.fn().mockResolvedValue(mockSample),
            remove: jest.fn().mockResolvedValue(true),
            addTest: jest.fn().mockResolvedValue(true),
            getTests: jest.fn().mockResolvedValue([]),
            generateCOA: jest.fn().mockResolvedValue({}),
          }),
        },
      ],
    }).compile();

    controller = module.get<LabSampleController>(LabSampleController);
    service = module.get<LabSampleService>(LabSampleService);
  });

  describe('create', () => {
    it('should create a lab sample', async () => {
      const dto: CreateLabSampleDto = {
        sampleType: 'water',
        collectedBy: 'tech',
        collectionDate: new Date(),
        description: 'Test sample',
      };

      const result = await controller.create(dto);

      expect(result).toEqual(mockSample);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of lab samples', async () => {
      const result = await controller.findAll({});

      expect(result).toEqual([mockSample]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a lab sample by id', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(mockSample);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if sample not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a lab sample', async () => {
      const dto: UpdateLabSampleDto = {
        sampleType: 'blood',
        collectedBy: 'tech2',
      };

      const result = await controller.update('1', dto);

      expect(result).toEqual(mockSample);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove a lab sample', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('addTest', () => {
    it('should add a test to a sample', async () => {
      const testData = { testName: 'pH', result: 7.0 };

      const result = await controller.addTest('1', testData);

      expect(result).toBe(true);
      expect(service.addTest).toHaveBeenCalledWith('1', testData);
    });
  });

  describe('getTests', () => {
    it('should return tests for a sample', async () => {
      const result = await controller.getTests('1');

      expect(result).toEqual([]);
      expect(service.getTests).toHaveBeenCalledWith('1');
    });
  });

  describe('generateCOA', () => {
    it('should generate a COA for a sample', async () => {
      const result = await controller.generateCOA('1');

      expect(result).toEqual({});
      expect(service.generateCOA).toHaveBeenCalledWith('1');
    });
  });
});
