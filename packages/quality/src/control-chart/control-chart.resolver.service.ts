### ControlChartResolverService

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
import { ControlChartPoint } from '../entities/control-chart-point.entity';
import { ControlChartType } from '../enums/control-chart-type.enum';

@Injectable()
export class ControlChartResolverService {
  constructor(private dataSource: DataSource) {}

  async resolve(id: string): Promise<{ base: ControlChart; detail: any }> {
    const chart = await this.dataSource
      .getRepository(ControlChart)
      .findOne({ where: { id } });

    if (!chart) {
      throw new Error(`ControlChart with id ${id} not found`);
    }

    let detail = null;
    const repository = this.getRepositoryForType(chart.type);

    if (repository) {
      detail = await repository.findOne({ where: { chartId: id } });
    }

    return { base: chart, detail };
  }

  async resolveType(id: string): Promise<ControlChartType> {
    const chart = await this.dataSource
      .getRepository(ControlChart)
      .findOne({ where: { id }, select: ['type'] });
    return chart?.type;
  }

  async resolveWithPoints(id: string): Promise<{
    base: ControlChart;
    detail: any;
    points: ControlChartPoint[];
  }> {
    const result = await this.resolve(id);
    const points = await this.dataSource
      .getRepository(ControlChartPoint)
      .find({
        where: { chartId: id },
        order: { timestamp: 'ASC' },
        take: 100,
      });
    return { ...result, points };
  }

  private getRepositoryForType(type: ControlChartType) {
    switch (type) {
      case ControlChartType.XBAR_R:
        return this.dataSource.getRepository(XbarRChart);
      case ControlChartType.P:
        return this.dataSource.getRepository(PChart);
      case ControlChartType.NP:
        return this.dataSource.getRepository(NPChart);
      case ControlChartType.C:
        return this.dataSource.getRepository(CChart);
      case ControlChartType.U:
        return this.dataSource.getRepository(UChart);
      case ControlChartType.IMR:
        return this.dataSource.getRepository(IMRChart);
      default:
        return null;
    }
  }
}
```
