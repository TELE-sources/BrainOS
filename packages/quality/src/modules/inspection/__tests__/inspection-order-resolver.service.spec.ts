 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
 import { InspectionOrderResolverService } from '../services/inspection-order-resolver.service';
 import { InspectionOrder } from '../entities/inspection-order.entity';
 import { IncomingInspection } from '../entities/incoming-inspection.entity';
 import { InProcessInspection } from '../entities/in-process-inspection.entity';
 import { FinalInspection } from '../entities/final-inspection.entity';
 import { ShippingInspection } from '../entities/shipping-inspection.entity';
 import { InspectionType } from '../../../common/enums';
 import { NotFoundException } from '@nestjs/common';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('InspectionOrderResolverService', () => {
   let service: InspectionOrderResolverService;
   let orderRepo: Repository<InspectionOrder>;
   let incRepo: Repository<IncomingInspection>;
   let inprocRepo: Repository<InProcessInspection>;
   let finRepo: Repository<FinalInspection>;
   let shipRepo: Repository<ShippingInspection>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         InspectionOrderResolverService,
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
 
     service = module.get<InspectionOrderResolverService>(InspectionOrderResolverService);
     orderRepo = module.get<Repository<InspectionOrder>>(getRepositoryToken(InspectionOrder));
     incRepo = module.get<Repository<IncomingInspection>>(getRepositoryToken(IncomingInspection));
     inprocRepo = module.get<Repository<InProcessInspection>>(getRepositoryToken(InProcessInspection));
     finRepo = module.get<Repository<FinalInspection>>(getRepositoryToken(FinalInspection));
     shipRepo = module.get<Repository<ShippingInspection>>(getRepositoryToken(ShippingInspection));
   });
 
   describe('getInspectionOrderWithDetails', () => {
     it('should return order with detail for incoming inspection', async () => {
       const order = { id: '1', type: InspectionType.INCOMING } as InspectionOrder;
       const detail = { inspectionOrderId: '1' } as IncomingInspection;
 
       jest.spyOn(orderRepo, 'findOne').mockResolvedValue(order);
       jest.spyOn(incRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.getInspectionOrderWithDetails('1');
 
       expect(result).toEqual(expect.objectContaining({ ...order, detail }));
       expect(orderRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
       expect(incRepo.findOne).toHaveBeenCalledWith({ where: { inspectionOrderId: '1' } });
     });
 
     it('should throw NotFoundException if order not found', async () => {
       jest.spyOn(orderRepo, 'findOne').mockResolvedValue(null);
 
       await expect(service.getInspectionOrderWithDetails('1')).rejects.toThrow(NotFoundException);
     });
   });
 
   describe('getInspectionOrdersByType', () => {
     it('should return orders by type', async () => {
       const orders = [{ id: '1', type: InspectionType.INCOMING } as InspectionOrder];
       jest.spyOn(orderRepo, 'find').mockResolvedValue(orders);
 
       const result = await service.getInspectionOrdersByType(InspectionType.INCOMING);
 
       expect(result).toEqual(orders);
       expect(orderRepo.find).toHaveBeenCalledWith({ where: { type: InspectionType.INCOMING } });
     });
   });
 
   describe('getInspectionOrdersByStatus', () => {
     it('should return orders by status', async () => {
       const orders = [{ id: '1', status: 'CREATED' } as InspectionOrder];
       jest.spyOn(orderRepo, 'find').mockResolvedValue(orders);
 
       const result = await service.getInspectionOrdersByStatus('CREATED');
 
       expect(result).toEqual(orders);
       expect(orderRepo.find).toHaveBeenCalledWith({ where: { status: 'CREATED' } });
     });
   });
 });
 });
   });
 });
