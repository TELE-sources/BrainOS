 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { DataSource, Repository } from 'typeorm';
 import { InspectionOrderFactoryService } from '../services/inspection-order-factory.service';
 import { InspectionOrder } from '../entities/inspection-order.entity';
 import { IncomingInspection } from '../entities/incoming-inspection.entity';
 import { InProcessInspection } from '../entities/in-process-inspection.entity';
 import { FinalInspection } from '../entities/final-inspection.entity';
 import { ShippingInspection } from '../entities/shipping-inspection.entity';
 import { InspectionType } from '../../../common/enums';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('InspectionOrderFactoryService', () => {
   let service: InspectionOrderFactoryService;
   let dataSource: DataSource;
   let orderRepo: Repository<InspectionOrder>;
   let incRepo: Repository<IncomingInspection>;
   let inprocRepo: Repository<InProcessInspection>;
   let finRepo: Repository<FinalInspection>;
   let shipRepo: Repository<ShippingInspection>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         InspectionOrderFactoryService,
         {
           provide: DataSource,
           useValue: createMock<DataSource>({
             transaction: jest.fn().mockImplementation(async (cb) => {
               const manager = {
                 create: jest.fn(),
                 save: jest.fn(),
                 getRepository: jest.fn().mockImplementation((entity) => {
                   if (entity === InspectionOrder) return orderRepo;
                   if (entity === IncomingInspection) return incRepo;
                   if (entity === InProcessInspection) return inprocRepo;
                   if (entity === FinalInspection) return finRepo;
                   if (entity === ShippingInspection) return shipRepo;
                   return createMock<Repository<any>>();
                 }),
                 findOne: jest.fn(),
               } as any;
               return cb(manager);
             }),
           }),
         },
         {
           provide: getRepositoryToken(InspectionOrder),
           useValue: createMock<Repository<InspectionOrder>>(),
         },
         {
           provide: getRepositoryToken(IncomingInspection),
           useValue: createMock<Repository<IncomingInspection>>(),
         },
         {
           provide: getRepositoryToken(InProcessInspection),
           useValue: createMock<Repository<InProcessInspection>>(),
         },
         {
           provide: getRepositoryToken(FinalInspection),
           useValue: createMock<Repository<FinalInspection>>(),
         },
         {
           provide: getRepositoryToken(ShippingInspection),
           useValue: createMock<Repository<ShippingInspection>>(),
         },
       ],
     }).compile();
 
     service = module.get<InspectionOrderFactoryService>(InspectionOrderFactoryService);
     dataSource = module.get<DataSource>(DataSource);
     orderRepo = module.get<Repository<InspectionOrder>>(getRepositoryToken(InspectionOrder));
     incRepo = module.get<Repository<IncomingInspection>>(getRepositoryToken(IncomingInspection));
     inprocRepo = module.get<Repository<InProcessInspection>>(getRepositoryToken(InProcessInspection));
     finRepo = module.get<Repository<FinalInspection>>(getRepositoryToken(FinalInspection));
     shipRepo = module.get<Repository<ShippingInspection>>(getRepositoryToken(ShippingInspection));
   });
 
   describe('createIncomingInspection', () => {
     it('should create an incoming inspection successfully', async () => {
       const dto = {
         inspectionPlanId: 'plan-1',
         supplierId: 'supp-1',
         purchaseOrderNumber: 'PO-001',
         quantityReceived: 100,
         unit: 'kg',
         scheduledDate: new Date(),
       };
 
       const result = await service.createIncomingInspection(dto);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(InspectionType.INCOMING);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
 
     it('should throw an error if creation fails', async () => {
       jest.spyOn(dataSource, 'transaction').mockRejectedValueOnce(new Error('Transaction failed'));
 
       const dto = {
         inspectionPlanId: 'plan-1',
         supplierId: 'supp-1',
         purchaseOrderNumber: 'PO-001',
         quantityReceived: 100,
         unit: 'kg',
         scheduledDate: new Date(),
       };
 
       await expect(service.createIncomingInspection(dto)).rejects.toThrow('Transaction failed');
     });
   });
 
   describe('createInProcessInspection', () => {
     it('should create an in-process inspection successfully', async () => {
       const dto = {
         inspectionPlanId: 'plan-1',
         workstationId: 'ws-1',
         operation: 'op1',
         sampleSize: 5,
         samplingMethod: 'single',
         scheduledDate: new Date(),
       };
 
       const result = await service.createInProcessInspection(dto);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(InspectionType.IN_PROCESS);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 
   describe('createFinalInspection', () => {
     it('should create a final inspection successfully', async () => {
       const dto = {
         inspectionPlanId: 'plan-1',
         inspectedUnits: 100,
         defectiveUnits: 5,
         scheduledDate: new Date(),
       };
 
       const result = await service.createFinalInspection(dto);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(InspectionType.FINAL);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 
   describe('createShippingInspection', () => {
     it('should create a shipping inspection successfully', async () => {
       const dto = {
         inspectionPlanId: 'plan-1',
         destination: 'dest',
         carrier: 'carrier',
         quantityShipped: 200,
         scheduledDate: new Date(),
       };
 
       const result = await service.createShippingInspection(dto);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(InspectionType.SHIPPING);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 });
