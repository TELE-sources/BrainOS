import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ControlChart } from '../entities/control-chart.entity';
import { XbarRChart } from '../entities/xbar-r-chart.entity';
import { PChart } from '../entities/p-chart.entity';
import { NPChart } from '../entities/np-chart.entity';
import { CChart } from '../entities/c-chart.entity';
import { UChart } from '../entities/u-chart.entity';
import { IMRChart } from '../entities/imr-chart.entity';
import { ControlChartPoint } from '../entities/control-chart-point.entity';
import { ControlChartType } from '../../../common/enums';

@Injectable()
export class ControlChartResolverService {
  constructor(private dataSource: DataSource) {}

  async resolve(id: string): Promise<{ base: ControlChart; detail: any }> {
    const base = await this.dataSource.getRepository(ControlChart).findOne({ where: { id } });
    if (!base) {
      throw new NotFoundException(`ControlChart with id ${id} not found`);
    }
    let detail = null;
    switch (base.type) {
      case ControlChartType.XBAR_R:
        detail = await this.dataSource.getRepository(XbarRChart).findOne({ where: { chartId: id } });
        break;
      case ControlChartType.P:
        detail = await this.dataSource.getRepository(PChart).findOne({ where: { chartId: id } });
        break;
      case ControlChartType.NP:
        detail = await this.dataSource.getRepository(NPChart).findOne({ where: { chartId: id } });
        break;
      case ControlChartType.C:
        detail = await this.dataSource.getRepository(CChart).findOne({ where: { chartId: id } });
        break;
      case ControlChartType.U:
        detail = await this.dataSource.getRepository(UChart).findOne({ where: { chartId: id } });
        break;
      case ControlChartType.I_MR:
        detail = await this.dataSource.getRepository(IMRChart).findOne({ where: { chartId: id } });
        break;
    }
    return { base, detail };
  }

  async resolveType(id: string): Promise<ControlChartType> {
    const chart = await this.dataSource.getRepository(ControlChart).findOne({ where: { id }, select: ['type'] });
    if (!chart) {
      throw new NotFoundException(`ControlChart with id ${id} not found`);
    }
    return chart.type;
  }

  async resolveWithPoints(id: string): Promise<{ base: ControlChart; detail: any; points: ControlChartPoint[] }> {
    const { base, detail } = await this.resolve(id);
    const points = await this.dataSource.getRepository(ControlChartPoint).find({ where: { chartId: id } });
    return { base, detail, points };
  }
}
