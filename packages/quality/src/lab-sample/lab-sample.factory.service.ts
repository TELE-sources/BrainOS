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
