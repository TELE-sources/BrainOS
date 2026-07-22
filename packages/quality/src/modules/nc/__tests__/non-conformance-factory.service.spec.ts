 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { DataSource, Repository } from 'typeorm';
 import { NonConformanceFactoryService } from '../services/non-conformance-factory.service';
 import { NonConformance } from '../entities/non-conformance.entity';
 import { InternalNC } from '../entities/internal-nc.entity';
 import { SupplierNC } from '../entities/supplier-nc.entity';
 import { CustomerNC } from '../entities/customer-nc.entity';
 import { NCType, Severity, NCStatus } from '../../../common/enums';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('NonConformanceFactoryService', () => {
   let service: NonConformanceFactoryService;
   let dataSource: DataSource;
   let ncRepo: Repository<NonConformance>;
   let internalRepo: Repository<InternalNC>;
   let supplierRepo: Repository<SupplierNC>;
   let customerRepo: Repository<CustomerNC>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         NonConformanceFactoryService,
         {
           provide: DataSource,
           useValue: createMock<DataSource>({
             transaction: jest.fn().mockImplementation(async (cb) => {
               const manager = {
                 create: jest.fn(),
                 save: jest.fn(),
                 getRepository: jest.fn().mockImplementation((entity) => {
                   if (entity === NonConformance) return ncRepo;
                   if (entity === InternalNC) return internalRepo;
                   if (entity === SupplierNC) return supplierRepo;
                   if (entity === CustomerNC) return customerRepo;
                   return createMock<Repository<any>>();
                 }),
                 findOne: jest.fn(),
               } as any;
               return cb(manager);
             }),
           }),
         },
         {
           provide: getRepositoryToken(NonConformance),
           useValue: createMock<Repository<NonConformance>>(),
         },
         {
           provide: getRepositoryToken(InternalNC),
           useValue: createMock<Repository<InternalNC>>(),
         },
         {
           provide: getRepositoryToken(SupplierNC),
           useValue: createMock<Repository<SupplierNC>>(),
         },
         {
           provide: getRepositoryToken(CustomerNC),
           useValue: createMock<Repository<CustomerNC>>(),
         },
       ],
     }).compile();
 
     service = module.get<NonConformanceFactoryService>(NonConformanceFactoryService);
     dataSource = module.get<DataSource>(DataSource);
     ncRepo = module.get<Repository<NonConformance>>(getRepositoryToken(NonConformance));
     internalRepo = module.get<Repository<InternalNC>>(getRepositoryToken(InternalNC));
     supplierRepo = module.get<Repository<SupplierNC>>(getRepositoryToken(SupplierNC));
     customerRepo = module.get<Repository<CustomerNC>>(getRepositoryToken(CustomerNC));
   });
 
   describe('createInternalNC', () => {
     it('should create an internal NC successfully', async () => {
       const data = {
         description: 'Test',
         severity: Severity.MAJOR,
         detectedDate: new Date(),
         detectedBy: 'tester',
         department: 'dept',
         processStep: 'step',
       };
 
       const result = await service.createInternalNC(data);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(NCType.INTERNAL);
       expect(result.severity).toBe(Severity.MAJOR);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
 
     it('should throw an error if creation fails', async () => {
       jest.spyOn(dataSource, 'transaction').mockRejectedValueOnce(new Error('Transaction failed'));
 
       const data = {
         description: 'Test',
         severity: Severity.MAJOR,
         detectedDate: new Date(),
         detectedBy: 'tester',
         department: 'dept',
         processStep: 'step',
       };
 
       await expect(service.createInternalNC(data)).rejects.toThrow('Transaction failed');
     });
   });
 
   describe('createSupplierNC', () => {
     it('should create a supplier NC successfully', async () => {
       const data = {
         description: 'Test',
         severity: Severity.MINOR,
         detectedDate: new Date(),
         detectedBy: 'tester',
         supplierId: 'supp-1',
         purchaseOrderNumber: 'PO-001',
       };
 
       const result = await service.createSupplierNC(data);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(NCType.SUPPLIER);
       expect(result.severity).toBe(Severity.MINOR);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 
   describe('createCustomerNC', () => {
     it('should create a customer NC successfully', async () => {
       const data = {
         description: 'Test',
         severity: Severity.CRITICAL,
         detectedDate: new Date(),
         detectedBy: 'tester',
         customerId: 'cust-1',
         complaintNumber: 'COMP-001',
       };
 
       const result = await service.createCustomerNC(data);
 
       expect(result).toBeDefined();
       expect(result.type).toBe(NCType.CUSTOMER);
       expect(result.severity).toBe(Severity.CRITICAL);
       expect(dataSource.transaction).toHaveBeenCalled();
     });
   });
 });
 });
