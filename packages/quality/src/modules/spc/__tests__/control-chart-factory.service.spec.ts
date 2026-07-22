 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { DataSource, Repository } from 'typeorm';
 import { ControlChartFactoryService } from '../services/control-chart-factory.service';
 import { ControlChart } from '../entities/control-chart.entity';
 import { XbarRChart } from '../entities/xbar-r-chart.entity';
 import { PChart } from '../entities/p-chart.entity';
 import { NPChart } from '../entities/np-chart.entity';
 import { CChart } from '../entities/c-chart.entity';
 import { UChart } from '../entities/u-chart.entity';
 import { IMRChart } from '../entities/imr-chart.entity';
 import { ProcessSegment } from '../../../../core-domain/src/entities/process-segment.entity';
 import { QualityMasterData } from '../../foundation/entities/quality-master-data.entity';
 import { ControlChartType, ControlChartStatus } from '../../../common/enums';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('ControlChartFactoryService', () => {
   let service: ControlChartFactoryService;
   let dataSource: DataSource;
   let chartRepo: Repository<ControlChart>;
   let xbarRepo: Repository<XbarRChart>;
   let pRepo: Repository<PChart>;
   let npRepo: Repository<NPChart>;
   let cRepo: Repository<CChart>;
   let uRepo: Repository<UChart>;
   let imrRepo: Repository<IMRChart>;
   let processSegRepo: Repository<ProcessSegment>;
   let masterDataRepo: Repository<QualityMasterData>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         ControlChartFactoryService,
         {
           provide: DataSource,
           useValue: createMock<DataSource>({
             transaction: jest.fn().mockImplementation(async (cb) => {
               const manager = {
                 create: jest.fn(),
                 save: jest.fn(),
                 getRepository: jest.fn().mockImplementation((entity) => {
                   if (entity === ControlChart) return chartRepo;
                   if (entity === XbarRChart) return xbarRepo;
                   if (entity === PChart) return pRepo;
                   if (entity === NPChart) return npRepo;
                   if (entity === CChart) return cRepo;
                   if (entity === UChart) return uRepo;
                   if (entity === IMRChart) return imrRepo;
                   if (entity === ProcessSegment) return processSegRepo;
                   if (entity === QualityMasterData) return masterDataRepo;
                   return createMock<Repository<any>>();
                 }),
                 findOne: jest.fn(),
               } as any;
               return cb(manager);
             }),
           }),
         },
         {
           provide: getRepositoryToken(ControlChart),
           useValue: createMock<Repository<ControlChart>>(),
         },
         {
           provide: getRepositoryToken(XbarRChart),
           useValue: createMock<Repository<XbarRChart>>(),
         },
         {
           provide: getRepositoryToken(PChart),
           useValue: createMock<Repository<PChart>>(),
         },
         {
           provide: getRepositoryToken(NPChart),
           useValue: createMock<Repository<NPChart>>(),
         },
         {
           provide: getRepositoryToken(CChart),
           useValue: createMock<Repository<CChart>>(),
         },
         {
           provide: getRepositoryToken(UChart),
           useValue: createMock<Repository<UChart>>(),
         },
         {
           provide: getRepositoryToken(IMRChart),
           useValue: createMock<Repository<IMRChart>>(),
         },
         {
           provide: getRepositoryToken(ProcessSegment),
           useValue: createMock<Repository<ProcessSegment>>(),
         },
         {
           provide: getRepositoryToken(QualityMasterData),
           useValue: createMock<Repository<QualityMasterData>>(),
         },
       ],
     }).compile();
 
     service = module.get<ControlChartFactoryService>(ControlChartFactoryService);
     dataSource = module.get<DataSource>(DataSource);
     chartRepo = module.get<Repository<ControlChart>>(getRepositoryToken(ControlChart));
     xbarRepo = module.get<Repository<XbarRChart>>(getRepositoryToken(XbarRChart));
     pRepo = module.get<Repository<PChart>>(getRepositoryToken(PChart));
     npRepo = module.get<Repository<NPChart>>(getRepositoryToken(NPChart));
     cRepo = module.get<Repository<CChart>>(getRepositoryToken(CChart));
     uRepo = module.get<Repository<UChart>>(getRepositoryToken(UChart));
     imrRepo = module.get<Repository<IMRChart>>(getRepositoryToken(IMRChart));
     processSegRepo = module.get<Repository<ProcessSegment>>(getRepositoryToken(ProcessSegment));
     masterDataRepo = module.get<Repository<QualityMasterData>>(getRepositoryToken(QualityMasterData));
   });
 
   describe('createXbarRChart', () => {
     it('should create an XBarR chart successfully', async () => {
       const data = {
         chartNumber: 'CH-001',
         processSegmentId: 'ps-1',
         characteristicId: 'char-1',
         type: ControlChartType.XBAR_R,
         ucl: 10,
         lcl: 2,
         centerLine: 6,
         sigma: 1,
         subgroupSize: 5,
         averageRange: 1.5,
       };
 
       const result = await service.createXbarRChart(data);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(ControlChartType.XBAR_R);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 
   describe('createPChart', () => {
     it('should create a P chart successfully', async () => {
       const data = {
         chartNumber: 'CH-002',
         processSegmentId: 'ps-1',
         characteristicId: 'char-1',
         type: ControlChartType.P,
         ucl: 0.1,
         lcl: 0,
         centerLine: 0.05,
         sigma: 0.01,
         sampleSize: 50,
         averageProportion: 0.05,
       };
 
       const result = await service.createPChart(data);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(ControlChartType.P);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 });
 });
