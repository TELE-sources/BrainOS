import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LabSampleFactoryService } from '../services/lab-sample-factory.service';
import { LabSample } from '../entities/lab-sample.entity';
import { LabTest } from '../entities/lab-test.entity';
import { createMock } from '@golevelup/ts-jest';

describe('LabSampleFactoryService', () => {
  let service: LabSampleFactoryService;
  let dataSource: DataSource;
  let sampleRepo: Repository<LabSample>;
  let testRepo: Repository<LabTest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LabSampleFactoryService,
        {
          provide: DataSource,
          useValue: createMock<DataSource>({
            transaction: jest.fn().mockImplementation(async (cb) => {
              const manager = {
                create: jest.fn(),
                save: jest.fn(),
              };
              return cb(manager);
            }),
          }),
        },
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

    service = module.get<LabSampleFactoryService>(LabSampleFactoryService);
    dataSource = module.get<DataSource>(DataSource);
    sampleRepo = module.get<Repository<LabSample>>(getRepositoryToken(LabSample));
    testRepo = module.get<Repository<LabTest>>(getRepositoryToken(LabTest));
  });

  describe('createLabSample', () => {
    it('should create a lab sample successfully', async () => {
      const dto = {
        sampleType: 'water',
        collectedBy: 'tech',
        collectionDate: new Date(),
        description: 'Test sample',
      };

      const result = await service.createLabSample(dto);

      expect(result).toBeDefined();
      expect(result.sampleType).toBe(dto.sampleType);
      expect(dataSource.transaction).toHaveBeenCalled();
    });

    it('should throw an error if creation fails', async () => {
      jest.spyOn(dataSource, 'transaction').mockRejectedValueOnce(new Error('Transaction failed'));

      const dto = {
        sampleType: 'water',
        collectedBy: 'tech',
        collectionDate: new Date(),
        description: 'Test sample',
      };

      await expect(service.createLabSample(dto)).rejects.toThrow('Transaction failed');
    });
  });
});
