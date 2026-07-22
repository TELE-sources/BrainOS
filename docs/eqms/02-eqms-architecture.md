## Services de Contrôle Statistique des Processus (SPC)

### ControlChartFactoryService

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
        lcol: data.lcl,
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
```

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

### LabSampleFactoryService

```typescript
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LabSample } from '../entities/lab-sample.entity';
import { RawMaterialSample } from '../entities/raw-material-sample.entity';
import { SlurrySample } from '../entities/slurry-sample.entity';
import { GreenCakeSample } from '../entities/green-cake-sample.entity';
import { AACBlockSample } from '../entities/aac-block-sample.entity';
import { WaterSample } from '../entities/water-sample.entity';
import { LabSampleType } from '../enums/lab-sample-type.enum';
import { LabSampleStatus } from '../enums/lab-sample-status.enum';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class LabSampleFactoryService {
  constructor(private dataSource: DataSource) {}

  async createRawMaterialSample(data: {
    inspectionOrderId?: string;
    supplierId: string;
    materialCode: string;
    materialName: string;
    quantity: number;
    unit: string;
    productionDate: Date;
    expiryDate: Date;
    coaReference?: string;
  }): Promise<LabSample> {
    return this.dataSource.transaction(async (manager) => {
      const sample = manager.create(LabSample, {
        inspectionOrderId: data.inspectionOrderId,
        type: LabSampleType.RAW_MATERIAL,
        matrix: 'raw_material',
        quantity: data.quantity,
        unit: data.unit,
        receivedDate: new Date(),
        status: LabSampleStatus.RECEIVED,
      });
      await manager.save(sample);

      const detail = manager.create(RawMaterialSample, {
        sampleId: sample.id,
        supplierId: data.supplierId,
        materialCode: data.materialCode,
        materialName: data.materialName,
        quantity: data.quantity,
        unit: data.unit,
        productionDate: data.productionDate,
        expiryDate: data.expiryDate,
        coaReference: data.coaReference,
      });
      await manager.save(detail);

      return sample;
    });
  }

  async createSlurrySample(data: {
    inspectionOrderId?: string;
    batchNumber: string;
    density: number;
    temperature: number;
    pH: number;
    viscosity: number;
    mixerId: string;
    samplingTime: Date;
  }): Promise<LabSample> {
    return this.dataSource.transaction(async (manager) => {
      const sample = manager.create(LabSample, {
        inspectionOrderId: data.inspectionOrderId,
        type: LabSampleType.SLURRY,
        matrix: 'slurry',
        quantity: 1,
        unit: 'L',
        receivedDate: new Date(),
        status: LabSampleStatus.RECEIVED,
      });
      await manager.save(sample);

      const detail = manager.create(SlurrySample, {
        sampleId: sample.id,
        batchNumber: data.batchNumber,
        density: data.density,
        temperature: data.temperature,
        pH: data.pH,
        viscosity: data.viscosity,
        mixerId: data.mixerId,
        samplingTime: data.samplingTime,
      });
      await manager.save(detail);

      return sample;
    });
  }

  async createGreenCakeSample(data: {
    inspectionOrderId?: string;
    moldId: string;
    targetDensity: number;
    actualDensity: number;
    expansionRate: number;
    curingTimeMinutes: number;
    castDatetime: Date;
  }): Promise<LabSample> {
    return this.dataSource.transaction(async (manager) => {
      const sample = manager.create(LabSample, {
        inspectionOrderId: data.inspectionOrderId,
        type: LabSampleType.GREEN_CAKE,
        matrix: 'green_cake',
        quantity: 1,
        unit: 'unit',
        receivedDate: new Date(),
        status: LabSampleStatus.RECEIVED,
      });
      await manager.save(sample);

      const detail = manager.create(GreenCakeSample, {
        sampleId: sample.id,
        moldId: data.moldId,
        targetDensity: data.targetDensity,
        actualDensity: data.actualDensity,
        expansionRate: data.expansionRate,
        curingTimeMinutes: data.curingTimeMinutes,
        castDatetime: data.castDatetime,
      });
      await manager.save(detail);

      return sample;
    });
  }

  async createAACBlockSample(data: {
    inspectionOrderId?: string;
    productCode: string;
    compressiveStrength: number;
    dryDensity: number;
    thermalConductivity: number;
    waterAbsorption: number;
    length: number;
    width: number;
    height: number;
    unit: string;
    autoclaveCycleId: string;
  }): Promise<LabSample> {
    return this.dataSource.transaction(async (manager) => {
      const sample = manager.create(LabSample, {
        inspectionOrderId: data.inspectionOrderId,
        type: LabSampleType.AAC_BLOCK,
        matrix: 'aac_block',
        quantity: 1,
        unit: data.unit,
        receivedDate: new Date(),
        status: LabSampleStatus.RECEIVED,
      });
      await manager.save(sample);

      const detail = manager.create(AACBlockSample, {
        sampleId: sample.id,
        productCode: data.productCode,
        compressiveStrength: data.compressiveStrength,
        dryDensity: data.dryDensity,
        thermalConductivity: data.thermalConductivity,
        waterAbsorption: data.waterAbsorption,
        length: data.length,
        width: data.width,
        height: data.height,
        unit: data.unit,
        autoclaveCycleId: data.autoclaveCycleId,
      });
      await manager.save(detail);

      return sample;
    });
  }

  async createWaterSample(data: {
    inspectionOrderId?: string;
    source: string;
    pH: number;
    hardness: number;
    chlorides: number;
    temperature: number;
    conductivity: number;
  }): Promise<LabSample> {
    return this.dataSource.transaction(async (manager) => {
      const sample = manager.create(LabSample, {
        inspectionOrderId: data.inspectionOrderId,
        type: LabSampleType.WATER,
        matrix: 'water',
        quantity: 1,
        unit: 'L',
        receivedDate: new Date(),
        status: LabSampleStatus.RECEIVED,
      });
      await manager.save(sample);

      const detail = manager.create(WaterSample, {
        sampleId: sample.id,
        source: data.source,
        pH: data.pH,
        hardness: data.hardness,
        chlorides: data.chlorides,
        temperature: data.temperature,
        conductivity: data.conductivity,
      });
      await manager.save(detail);

      return sample;
    });
  }
}
```

### LabSampleResolverService

```typescript
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LabSample } from '../entities/lab-sample.entity';
import { RawMaterialSample } from '../entities/raw-material-sample.entity';
import { SlurrySample } from '../entities/slurry-sample.entity';
import { GreenCakeSample } from '../entities/green-cake-sample.entity';
import { AACBlockSample } from '../entities/aac-block-sample.entity';
import { WaterSample } from '../entities/water-sample.entity';
import { LabSampleType } from '../enums/lab-sample-type.enum';
import { LabTest } from '../entities/lab-test.entity';

@Injectable()
export class LabSampleResolverService {
  constructor(private dataSource: DataSource) {}

  async resolve(id: string): Promise<{ base: LabSample; detail: any }> {
    const sample = await this.dataSource
      .getRepository(LabSample)
      .findOne({ where: { id } });

    if (!sample) {
      throw new Error(`LabSample with id ${id} not found`);
    }

    let detail = null;
    const repository = this.getRepositoryForType(sample.type);

    if (repository) {
      detail = await repository.findOne({ where: { sampleId: id } });
    }

    return { base: sample, detail };
  }

  async resolveType(id: string): Promise<LabSampleType> {
    const sample = await this.dataSource
      .getRepository(LabSample)
      .findOne({ where: { id }, select: ['type'] });
    return sample?.type;
  }

  async resolveWithTests(id: string): Promise<{
    base: LabSample;
    detail: any;
    tests: LabTest[];
  }> {
    const result = await this.resolve(id);
    const tests = await this.dataSource
      .getRepository(LabTest)
      .find({
        where: { sampleId: id },
        relations: ['testMethod', 'results'],
      });
    return { ...result, tests };
  }

  private getRepositoryForType(type: LabSampleType) {
    switch (type) {
      case LabSampleType.RAW_MATERIAL:
        return this.dataSource.getRepository(RawMaterialSample);
      case LabSampleType.SLURRY:
        return this.dataSource.getRepository(SlurrySample);
      case LabSampleType.GREEN_CAKE:
        return this.dataSource.getRepository(GreenCakeSample);
      case LabSampleType.AAC_BLOCK:
        return this.dataSource.getRepository(AACBlockSample);
      case LabSampleType.WATER:
        return this.dataSource.getRepository(WaterSample);
      default:
        return null;
    }
  }
}
```