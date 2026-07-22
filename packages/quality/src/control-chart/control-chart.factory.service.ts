```typescript
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ControlChart } from '../entities/control-chart.entity';
import { XbarRChart } from '../entities/xbar-r-chart.entity';
import { PChart } from '../entities/p-chart.entity';
import { NPChart } from '../entities/np-chart.entity';
import { CChart } from '../entities/c-chart.entity';
import { UChart } from '../entities/u-chart.entity';
import { IMRChart } from '../entities/imr-chart.entity';
import { ControlChartType } from '../enums/control-chart-type.enum';
import { ControlChartStatus } from '../enums/chart-status.enum';

@Injectable()
export class ControlChartFactoryService {
  constructor(private dataSource: DataSource) {}

  async createXbarRChart(data: {
    processSegmentId: string;
    characteristicId: string;
    subgroupSize: number;
    averageRange: number;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
  }): Promise<ControlChart> {
    return this.dataSource.transaction(async (manager) => {
      const chart = manager.create(ControlChart, {
        processSegmentId: data.processSegmentId,
        characteristicId: data.characteristicId,
        type: ControlChartType.XBAR_R,
        ucl: data.ucl,
        lcl: data.lcl,
        centerLine: data.centerLine,
        sigma: data.sigma,
        status: ControlChartStatus.ACTIVE,
      });
      await manager.save(chart);

      const detail = manager.create(XbarRChart, {
        chartId: chart.id,
        subgroupSize: data.subgroupSize,
        averageRange: data.averageRange,
      });
      await manager.save(detail);

      return chart;
    });
  }

  async createPChart(data: {
    processSegmentId: string;
    characteristicId: string;
    sampleSize: number;
    averageProportion: number;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
  }): Promise<ControlChart> {
    return this.dataSource.transaction(async (manager) => {
      const chart = manager.create(ControlChart, {
        processSegmentId: data.processSegmentId,
        characteristicId: data.characteristicId,
        type: ControlChartType.P,
        ucl: data.ucl,
        lcl: data.lcl,
        centerLine: data.centerLine,
        sigma: data.sigma,
        status: ControlChartStatus.ACTIVE,
      });
      await manager.save(chart);

      const detail = manager.create(PChart, {
        chartId: chart.id,
        sampleSize: data.sampleSize,
        averageProportion: data.averageProportion,
      });
      await manager.save(detail);

      return chart;
    });
  }

  async createNPChart(data: {
    processSegmentId: string;
    characteristicId: string;
    sampleSize: number;
    averageDefectives: number;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
  }): Promise<ControlChart> {
    return this.dataSource.transaction(async (manager) => {
      const chart = manager.create(ControlChart, {
        processSegmentId: data.processSegmentId,
        characteristicId: data.characteristicId,
        type: ControlChartType.NP,
        ucl: data.ucl,
        lcl: data.lcl,
        centerLine: data.centerLine,
        sigma: data.sigma,
        status: ControlChartStatus.ACTIVE,
      });
      await manager.save(chart);

      const detail = manager.create(NPChart, {
        chartId: chart.id,
        sampleSize: data.sampleSize,
        averageDefectives: data.averageDefectives,
      });
      await manager.save(detail);

      return chart;
    });
  }

  async createCChart(data: {
    processSegmentId: string;
    characteristicId: string;
    averageDefects: number;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
  }): Promise<ControlChart> {
    return this.dataSource.transaction(async (manager) => {
      const chart = manager.create(ControlChart, {
        processSegmentId: data.processSegmentId,
        characteristicId: data.characteristicId,
        type: ControlChartType.C,
        ucl: data.ucl,
        lcl: data.lcl,
        centerLine: data.centerLine,
        sigma: data.sigma,
        status: ControlChartStatus.ACTIVE,
      });
      await manager.save(chart);

      const detail = manager.create(CChart, {
        chartId: chart.id,
        averageDefects: data.averageDefects,
      });
      await manager.save(detail);

      return chart;
    });
  }

  async createUChart(data: {
    processSegmentId: string;
    characteristicId: string;
    sampleSize: number;
    averageDefectsPerUnit: number;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
  }): Promise<ControlChart> {
    return this.dataSource.transaction(async (manager) => {
      const chart = manager.create(ControlChart, {
        processSegmentId: data.processSegmentId,
        characteristicId: data.characteristicId,
        type: ControlChartType.U,
        ucl: data.ucl,
        lcl: data.lcl,
        centerLine: data.centerLine,
        sigma: data.sigma,
        status: ControlChartStatus.ACTIVE,
      });
      await manager.save(chart);

      const detail = manager.create(UChart, {
        chartId: chart.id,
        sampleSize: data.sampleSize,
        averageDefectsPerUnit: data.averageDefectsPerUnit,
      });
      await manager.save(detail);

      return chart;
    });
  }

  async createIMRChart(data: {
    processSegmentId: string;
    characteristicId: string;
    movingRangeAverage: number;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
  }): Promise<ControlChart> {
    return this.dataSource.transaction(async (manager) => {
      const chart = manager.create(ControlChart, {
        processSegmentId: data.processSegmentId,
        characteristicId: data.characteristicId,
        type: ControlChartType.IMR,
        ucl: data.ucl,
        lcl: data.lcl,
        centerLine: data.centerLine,
        sigma: data.sigma,
        status: ControlChartStatus.ACTIVE,
      });
      await manager.save(chart);

      const detail = manager.create(IMRChart, {
        chartId: chart.id,
        movingRangeAverage: data.movingRangeAverage,
      });
      await manager.save(detail);

      return chart;
    });
  }
}
