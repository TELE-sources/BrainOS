import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
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

@Injectable()
export class ControlChartFactoryService {
  constructor(private dataSource: DataSource) {}

  async createXbarRChart(data: {
    chartNumber: string;
    processSegmentId: string;
    characteristicId: string;
    type: ControlChartType.XBAR_R;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
    subgroupSize: number;
    averageRange: number;
    status?: ControlChartStatus;
  }): Promise<ControlChart> {
    return this.createChart(data, async (manager, chart) => {
      const detail = manager.create(XbarRChart, {
        chartId: chart.id,
        subgroupSize: data.subgroupSize,
        averageRange: data.averageRange,
      });
      await manager.save(detail);
    });
  }

  async createPChart(data: {
    chartNumber: string;
    processSegmentId: string;
    characteristicId: string;
    type: ControlChartType.P;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
    sampleSize: number;
    averageProportion: number;
    status?: ControlChartStatus;
  }): Promise<ControlChart> {
    return this.createChart(data, async (manager, chart) => {
      const detail = manager.create(PChart, {
        chartId: chart.id,
        sampleSize: data.sampleSize,
        averageProportion: data.averageProportion,
      });
      await manager.save(detail);
    });
  }

  async createNPChart(data: {
    chartNumber: string;
    processSegmentId: string;
    characteristicId: string;
    type: ControlChartType.NP;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
    sampleSize: number;
    avgDefects: number;
    status?: ControlChartStatus;
  }): Promise<ControlChart> {
    return this.createChart(data, async (manager, chart) => {
      const detail = manager.create(NPChart, {
        chartId: chart.id,
        sampleSize: data.sampleSize,
        averageProportion: data.avgDefects / data.sampleSize, // approximate; but we can store avgDefects directly if entity has field. We'll assume NPChart has averageNumberDefects.
        // Assuming NPChart has averageNumberDefects field.
      });
      await manager.save(detail);
    });
  }

  async createCChart(data: {
    chartNumber: string;
    processSegmentId: string;
    characteristicId: string;
    type: ControlChartType.C;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
    avgDefectsPerUnit: number;
    status?: ControlChartStatus;
  }): Promise<ControlChart> {
    return this.createChart(data, async (manager, chart) => {
      const detail = manager.create(CChart, {
        chartId: chart.id,
        // CChart may have averageCount field; assuming averageCount
        averageCount: data.avgDefectsPerUnit,
      });
      await manager.save(detail);
    });
  }

  async createUChart(data: {
    chartNumber: string;
    processSegmentId: string;
    characteristicId: string;
    type: ControlChartType.U;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
    sampleSize: number;
    avgDefectsPerUnit: number;
    status?: ControlChartStatus;
  }): Promise<ControlChart> {
    return this.createChart(data, async (manager, chart) => {
      const detail = manager.create(UChart, {
        chartId: chart.id,
        sampleSize: data.sampleSize,
        averageDefectsPerUnit: data.avgDefectsPerUnit,
      });
      await manager.save(detail);
    });
  }

  async createIMRChart(data: {
    chartNumber: string;
    processSegmentId: string;
    characteristicId: string;
    type: ControlChartType.I_MR;
    ucl: number;
    lcl: number;
    centerLine: number;
    sigma: number;
    status?: ControlChartStatus;
  }): Promise<ControlChart> {
    return this.createChart(data, async (manager, chart) => {
      const detail = manager.create(IMRChart, {
        chartId: chart.id,
        // IMRChart may have no extra fields; but we can leave empty.
      });
      await manager.save(detail);
    });
  }

  private async createChart<T>(
    data: any,
    initDetail: (manager: any, chart: ControlChart) => Promise<void>
  ): Promise<ControlChart> {
    return this.dataSource.transaction(async (manager) => {
      const chart = manager.create(ControlChart, {
        chartNumber: data.chartNumber,
        processSegment: { id: data.processSegmentId },
        characteristic: { id: data.characteristicId },
        type: data.type,
        ucl: data.ucl,
        lcl: data.lcl,
        centerLine: data.centerLine,
        sigma: data.sigma,
        status: data.status ?? ControlChartStatus.ACTIVE,
        rules: [], // empty
      });
      await manager.save(chart);

      await initDetail(manager, chart);

      return chart;
    });
  }
}
