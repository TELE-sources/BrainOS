 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { DataSource, Repository } from 'typeorm';
 import { CAPAFactoryService } from '../services/capa-factory.service';
 import { CAPA } from '../entities/capa.entity';
 import { CorrectiveAction } from '../entities/corrective-action.entity';
 import { PreventiveAction } from '../entities/preventive-action.entity';
 import { CAPAType, CAPAStatus } from '../../../common/enums';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('CAPAFactoryService', () => {
   let service: CAPAFactoryService;
   let dataSource: DataSource;
   let capaRepo: Repository<CAPA>;
   let corrRepo: Repository<CorrectiveAction>;
   let prevRepo: Repository<PreventiveAction>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         CAPAFactoryService,
         {
           provide: DataSource,
           useValue: createMock<DataSource>({
             transaction: jest.fn().mockImplementation(async (cb) => {
               const manager = {
                 create: jest.fn(),
                 save: jest.fn(),
                 getRepository: jest.fn().mockImplementation((entity) => {
                   if (entity === CAPA) return capaRepo;
                   if (entity === CorrectiveAction) return corrRepo;
                   if (entity === PreventiveAction) return prevRepo;
                   return createMock<Repository<any>>();
                 }),
                 findOne: jest.fn(),
               } as any;
               return cb(manager);
             }),
           }),
         },
         {
           provide: getRepositoryToken(CAPA),
           useValue: createMock<Repository<CAPA>>(),
         },
         {
           provide: getRepositoryToken(CorrectiveAction),
           useValue: createMock<Repository<CorrectiveAction>>(),
         },
         {
           provide: getRepositoryToken(PreventiveAction),
           useValue: createMock<Repository<PreventiveAction>>(),
         },
       ],
     }).compile();
 
     service = module.get<CAPAFactoryService>(CAPAFactoryService);
     dataSource = module.get<DataSource>(DataSource);
     capaRepo = module.get<Repository<CAPA>>(getRepositoryToken(CAPA));
     corrRepo = module.get<Repository<CorrectiveAction>>(getRepositoryToken(CorrectiveAction));
     prevRepo = module.get<Repository<PreventiveAction>>(getRepositoryToken(PreventiveAction));
   });
 
   describe('createCorrectiveAction', () => {
     it('should create a corrective action successfully', async () => {
       const data = {
         description: 'Test',
         nonConformanceId: 'nc-1',
         responsible: 'John',
         dueDate: new Date(Date.now() + 86400000),
       };
 
       const result = await service.createCorrectiveAction(data);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(CAPAType.CORRECTIVE);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
 
     it('should throw an error if creation fails', async () => {
       jest.spyOn(dataSource, 'transaction').mockRejectedValueOnce(new Error('Transaction failed'));
 
       const data = {
         description: 'Test',
         nonConformanceId: 'nc-1',
         responsible: 'John',
         dueDate: new Date(Date.now() + 86400000),
       };
 
       await expect(service.createCorrectiveAction(data)).rejects.toThrow('Transaction failed');
     });
   });
 
   describe('createPreventiveAction', () => {
     it('should create a preventive action successfully', async () => {
       const data = {
         description: 'Test',
         riskAssessment: 'Low',
         potentialFailure: 'None',
         responsible: 'Jane',
         dueDate: new Date(Date.now() + 86400000),
       };
 
       const result = await service.createPreventiveAction(data);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(CAPAType.PREVENTIVE);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 });
 });
