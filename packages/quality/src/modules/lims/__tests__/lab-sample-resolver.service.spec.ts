import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabSampleResolverService } from '../services/lab-sample-resolver.service';
import { LabSample } from '../entities/lab-sample.entity';
import { LabTest } from '../entities/lab-test.entity';
import { NotFoundException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('LabSampleResolverService', () => {
  let service: LabSampleResolverService;
  let sampleRepo: Repository<LabSample>;
  let testRepo: Repository<LabTest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LabSampleResolverService,
        {
          provide: getRepositoryToken(LabSample),
          useValue: createMock<Repository<LabSample>>(),
        },
        {
          provide: getRepositoryToken(LabTest),
          useValue: createMock<Repository<LabTest>>(),
        },
      ],
    }).compile();

    service = module.get<LabSampleResolverService>(LabSampleResolverService);
    sampleRepo = module.get<Repository<LabSample>>(getRepositoryToken(LabSample));
    testRepo = module.get<Repository<LabTest>>(getRepositoryToken(LabTest));
  });

  describe('resolve', () => {
    it('should return sample and test for a valid id', async () => {
      const sample = { id: '1', sampleType: 'water' } as LabSample;
      const test = { sampleId: '1' } as LabTest;

      jest.spyOn(sampleRepo, 'findOne').mockResolvedValue(sample);
      jest.spyOn(testRepo, 'findOne').mockResolvedValue(test);

      const result = await service.resolve('1');

      expect(result).toEqual({ base: sample, detail: test });
      expect(sampleRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(testRepo.findOne).toHaveBeenCalledWith({ where: { sampleId: '1' } });
    });

    it('should throw NotFoundException if sample not found', async () => {
      jest.spyOn(sampleRepo, 'findOne').mockResolvedValue(null);

      await expect(service.resolve('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('resolveType', () => {
    it('should return the sample type', async () => {
      const sample = { id: '1', sampleType: 'water' } as LabSample;

      jest.spyOn(sampleRepo, 'findOne').mockResolvedValue(sample);

      const result = await service.resolveType('1');

      expect(result).toBe('water');
      expect(sampleRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' }, select: ['sampleType'] });
    });
  });
});
