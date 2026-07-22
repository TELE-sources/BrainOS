 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
 import { CAPAResolverService } from '../services/capa-resolver.service';
 import { CAPA } from '../entities/capa.entity';
 import { CorrectiveAction } from '../entities/corrective-action.entity';
 import { PreventiveAction } from '../entities/preventive-action.entity';
 import { CAPAAction } from '../entities/capa-action.entity';
 import { CAPAType } from '../../../common/enums';
 import { NotFoundException } from '@nestjs/common';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('CAPAResolverService', () => {
   let service: CAPAResolverService;
   let capaRepo: Repository<CAPA>;
   let corrRepo: Repository<CorrectiveAction>;
   let prevRepo: Repository<PreventiveAction>;
   let capaActionRepo: Repository<CAPAAction>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         CAPAResolverService,
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
         {
           provide: getRepositoryToken(CAPAAction),
           useValue: createMock<Repository<CAPAAction>>(),
         },
       ],
     }).compile();
 
     service = module.get<CAPAResolverService>(CAPAResolverService);
     capaRepo = module.get<Repository<CAPA>>(getRepositoryToken(CAPA));
     corrRepo = module.get<Repository<CorrectiveAction>>(getRepositoryToken(CorrectiveAction));
     prevRepo = module.get<Repository<PreventiveAction>>(getRepositoryToken(PreventiveAction));
     capaActionRepo = module.get<Repository<CAPAAction>>(getRepositoryToken(CAPAAction));
   });
 
   describe('resolve', () => {
     it('should return CAPA and corrective action for corrective type', async () => {
       const capa = { id: '1', type: CAPAType.CORRECTIVE } as CAPA;
       const detail = { capaId: '1' } as CorrectiveAction;
 
       jest.spyOn(capaRepo, 'findOne').mockResolvedValue(capa);
       jest.spyOn(corrRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.resolve('1');
 
       expect(result).toEqual({ base: capa, detail });
       expect(capaRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
       expect(corrRepo.findOne).toHaveBeenCalledWith({ where: { capaId: '1' } });
     });
 
     it('should return CAPA and preventive action for preventive type', async () => {
       const capa = { id: '2', type: CAPAType.PREVENTIVE } as CAPA;
       const detail = { capaId: '2' } as PreventiveAction;
 
       jest.spyOn(capaRepo, 'findOne').mockResolvedValue(capa);
       jest.sy.toBeCalledWith({ where: { id: '2' } });
       jest.spyOn(prevRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.resolve('2');
 
       expect(result).toEqual({ base: capa, detail });
       expect(capaRepo.findOne).toHaveBeenCalledWith({ where: { id: '2' } });
       expect(prevRepo.findOne).toHaveBeenCalledWith({ where: { capaId: '2' } });
     });
 
     it('should throw NotFoundException if CAPA not found', async () => {
       jest.spyOn(capaRepo, 'findOne').mockResolvedValue(null);
 
       await expect(service.resolve('999')).rejects.toThrow(NotFoundException);
     });
   });
 
   describe('resolveType', () => {
     it('should return the CAPA type', async () => {
       const capa = { id: '1', type: CAPAType.CORRECTIVE } as CAPA;
 
       jest.spyOn(capaRepo, 'findOne').mockResolvedValue(capa);
 
       const result = await service.resolveType('1');
 
       expect(result).toBe(CAPAType.CORRECTIVE);
       expect(capaRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' }, select: ['type'] });
     });
   });
 
   describe('resolveWithActions', () => {
     it('should return CAPA, detail, and actions', async () => {
       const capa = { id: '1', type: CAPAType.CORRECTIVE } as CAPA;
       const detail = { capaId: '1' } as CorrectiveAction;
       const actions = [{ id: 'act1' } as CAPAAction];
 
       jest.spyOn(capaRepo, 'findOne').mockResolvedValue(capa);
       jest.spyOn(corrRepo, 'findOne').mockResolvedValue(detail);
       jest.spyOn(capaActionRepo, 'find').mockResolvedValue(actions);
 
       const result = await service.resolveWithActions('1');
 
       expect(result).toEqual({ base: capa, detail, actions });
       expect(capaRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
       expect(corrRepo.findOne).toHaveBeenCalledWith({ where: { capaId: '1' } });
       expect(capaActionRepo.find).toHaveBeenCalledWith({ where: { capa: { id: '1' } } });
     });
   });
 });
 });
