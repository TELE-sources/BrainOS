 import { Test, TestingModule } from '@nestjs/testing';
 import { getRepositoryToken } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
 import { ControlChartResolverService } from '../services/control-chart-resolver.service';
 import { ControlChart } from '../entities/control-chart.entity';
 import { XbarRChart } from '../entities/xbar-r-chart.entity';
 import { PChart } from '../entities/p-chart.entity';
 import { NPChart } from '../entities/np-chart.entity';
 import { CChart } from '../entities/c-chart.entity';
 import { UChart } from '../entities/u-chart.entity';
 import { IMRChart } from '../entities/imr-chart.entity';
 import { ControlChartPoint } from '../entities/control-chart-point.entity';
 import { ControlChartType } from '../../../common/enums';
 import { NotFoundException } from '@nestjs/common';
 import { createMock } from '@golevelup/ts-jest';
 
 describe('ControlChartResolverService', () => {
   let service: ControlChartResolverService;
   let chartRepo: Repository<ControlChart>;
   ****#   let xbarRepo: Repository<XbarRChart>;
   ****#   let pRepo: Repository<PChart>;
   ****#   let npRepo: Repository<NPChart>;
   ****#   let cRepo: Repository<CChart>;
   ****#   let uRepo: Repository<UChart>;
   ****#   let imrRepo: Repository<IMRChart>;
   ****#   let pointRepo: Repository<ControlChartPoint>;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         ControlChartResolverService,
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
           provide: getRepositoryToken(ControlChartPoint),
           useValue: createMock<Repository<ControlChartPoint>>(),
         },
       ],
     }).compile();
 
     service = module.get<ControlChartResolverService>(ControlChartResolverService);
     chartRepo = module.get<Repository<ControlChart>>(getRepositoryToken(ControlChart));
     xbarRepo = module.get<Repository<XbarRChart>>(getRepositoryToken(XbarRChart));
     pRepo = module.get<Repository<PChart>>(getRepositoryToken(PChart));
     npRepo = module.get<Repository<NPChart>>(getRepositoryToken(NPChart));
     cRepo = module.get<Repository<CChart>>(getRepositoryToken(CChart));
     uRepo = module.get<Repository<UChart>>(getRepositoryToken(UChart));
     imrRepo = module.get<Repository<IMRChart>>(getRepositoryToken(IMRChart));
     pointRepo = module.get<Repository<ControlChartPoint>>(getRepositoryToken(ControlChartPoint));
   });
 
   describe('resolve', () => {
     it('should return chart and detail for XBarR chart', async () => {
       const chart = { id: '1', type: ControlChartType.XBAR_R } as ControlChart;
       const detail = { chartId: '1' } as XbarRChart;
 
       jest.spyOn(chartRepo, 'findOne').mockResolvedValue(chart);
       jest.spyOn(xbarRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.resolve('1');
 
       expect(result).toEqual({ base: chart, detail });
       expect(chartRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
       expect(xbarRepo.findOne).toHaveBeenCalledWith({ where: { chartId: '1' } });
     });
 
     it('should return chart and detail for P chart', async () => {
       const chart = { id: '2', type: ControlChartType.P } as ControlChart;
       const detail = { chartId: '2' } as PChart;
 
       jest.spyOn(chartRepo, 'findOne').mockResolvedValue(chart);
       jest.spyOn(pRepo, 'findOne').mockResolvedValue(detail);
 
       const result = await service.resolve('2');
 
       expect(result).toEqual({ base: chart, detail });
       expect(chartRepo.findOne).toHaveBeenCalledWith({ where: { id: '2' } });
       expect(pRepo.findOne).toHaveBeenCalledWith({ where: { chartId: '2' } });
     });
 
     it('should throw NotFoundException if chart not found', async () => {
       jest.spyOn(chartRepo, 'findOne').mockResolvedValue(null);
 
       await expect(service.resolve('999')).rejects.toThrow(NotFoundException);
     });
   });
 
   describe('resolveType', () => {
     it('should return the chart type', async () => {
       const chart = { id: '1', type: ControlChartType.XBAR_R } as ControlChart;
 
       jest.spyOn(chartRepo, 'findOne').mockResolvedValue(chart);
 
       const result = await service.resolveType('1');
 
       expect(result).toBe(ControlChartType.XBAR_R);
       expect(chartRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' }, select: ['type'] });
     });
   });
 
   describe('resolveWithPoints', () => {
     it('should return chart, detail, and points', async () => {
       const chart = { id: '1', type: ControlChartType.XBAR_R } as ControlChart;
       const detail = { chartId: '1' } as XbarRChart;
       const points = [{ id: 'p1' } as ControlChartPoint];
 
       jest.spyOn(chartRepo, 'findOne').mockResolvedValue(chart);
       jest.spyOn(xbarRepo, 'findOne').mockResolvedValue(detail);
       jest.spyOn(pointRepo, 'find').mockResolvedValue(points);
 
       const result = await service.resolveWithPoints('1');
 
       expect(result).toEqual({ base: chart, detail, points });
       expect(chartRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
       expect(xbarRepo.findOne).toHaveBeenCalledWith({ where: { chartId: '1' } });
       expect(pointRepo.find).toHaveBeenCalledWith({ where: { chartId: '1' } });
     });
   });
 });
 });
