 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
 import { NonConformanceResolverService } from '../services/non-conformance-resolver.service';
 import { NonConformance } from '../entities/non-conformance.entity';
 import { InternalNC } from '../entities/internal-nc.entity';
 import { SupplierNC } from '../entities/supplier-nc.entity';
 import { CustomerNC } from '../entities/customer-nc.entity';
 import { CAPA } from '../../capa/entities/capa.entity';
 import { NCType } from '../../../common/enums';
 import { NotFoundException } from '@nestjs/common';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('NonConformanceResolverService', () => {
   let service: NonConformanceResolverService;
   let ncRepo: Repository<NonConformance>;
   let internalRepo: Repository<InternalNC>;
   let supplierRepo: Repository<SupplierNC>;
   let customerRepo: Repository<CustomerNC>;
   let capaRepo: Repository<CAPA>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         NonConformanceResolverService,
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
         {
           provide: getRepositoryToken(CAPA),
           useValue: createMock<Repository<CAPA>>(),
         },
       ],
     }).compile();
 
     service = module.get<NonConformanceResolverService>(NonConformanceResolverService);
     ncRepo = module.get<Repository<NonConformance>>(getRepositoryToken(NonConformance));
     internalRepo = module.get<Repository<InternalNC>>(getRepositoryToken(InternalNC));
     supplierRepo = module.get<Repository<SupplierNC>>(getRepositoryToken(SupplierNC));
     customerRepo = module.get<Repository<CustomerNC>>(getRepositoryToken(CustomerNC));
     capaRepo = module.get<Repository<CAPA>>(getRepositoryToken(CAPA));
   });
 
   describe('resolve', () => {
     it('should return base and detail for internal NC', async () => {
       const nc = { id: '1', type: NCType.INTERNAL } as NonConformance;
       const detail = { ncId: '1' } as InternalNC;
 
       jest.spyOn(ncRepo, 'findOne').mockResolvedValue(nc);
       jest.spyOn(internalRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.resolve('1');
 
       expect(result).toEqual({ base: nc, detail });
       expect(ncRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
       expect(internalRepo.findOne).toHaveBeenCalledWith({ where: { ncId: '1' } });
     });
 
     it('should return base and detail for supplier NC', async () => {
       const nc = { id: '2', type: NCType.SUPPLIER } as NonConformance;
       const detail = { ncId: '2' } as SupplierNC;
 
       jest.spyOn(ncRepo, 'findOne').mockResolvedValue(nc);
       jest.spyOn(supplierRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.resolve('2');
 
       expect(result).toEqual({ base: nc, detail });
       expect(ncRepo.findOne).toHaveBeenCalledWith({ where: { id: '2' } });
       expect(supplierRepo.findOne).toHaveBeenCalledWith({ where: { ncId: '2' } });
     });
 
     it('should return base and detail for customer NC', async () => {
       const nc = { id: '3', type: NCType.CUSTOMER } as NonConformance;
       const detail = { ncId: '3' } as CustomerNC;
 
       jest.spyOn(ncRepo, 'findOne').mockResolvedValue(nc);
       jest.sy.toBeCalledWith({ where: { id: '3' } });
       jest.spyOn(customerRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.resolve('3');
 
       expect(result).toEqual({ base: nc, detail });
       expect(ncRepo.findOne).toHaveBeenCalledWith({ where: { id: '3' } });
       expect(customerRepo.findOne).toHaveBeenCalledWith({ where: { ncId: '3' } });
     });
 
     it('should throw NotFoundException if NC not found', async () => {
       jest.spyOn(ncRepo, 'findOne').mockResolvedValue(null);
 
       await expect(service.resolve('999')).rejects.toThrow(NotFoundException);
     });
   });
 
   describe('resolveType', () => {
     it('should return the NC type', async () => {
       const nc = { id: '1', type: NCType.INTERNAL } as NonConformance;
 
       jest.spyOn(ncRepo, 'findOne').mockResolvedValue(nc);
 
       const result = await service.resolveType('1');
 
       expect(result).toBe(NCType.INTERNAL);
       expect(ncRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' }, select: ['type'] });
     });
   });
 
   describe('resolveWithCAPA', () => {
     it('should return base, detail, and CAPAs', async () => {
       const nc = { id: '1', type: NCType.INTERNAL } as NonConformance;
       const detail = { ncId: '1' } as InternalNC;
       const capas = [{ id: 'capa1' } as CAPA];
 
       jest.spyOn(ncRepo, 'findOne').mockResolvedValue(nc);
       jest.spyOn(internalRepo, 'findOne').mockResolvedValue(detail);
       jest.spyOn(capaRepo, 'find').mockResolvedValue(capas);
 
       const result = await service.resolveWithCAPA('1');
 
       expect(result).toEqual({ base: nc, detail, capas });
       expect(ncRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
       expect(internalRepo.findOne).toHaveBeenCalledWith({ where: { ncId: '1' } });
       expect(capaRepo.find).toHaveBeenCalledWith({ where: { nonConformance: { id: '1' } } });
     });
   });
 });
 });
