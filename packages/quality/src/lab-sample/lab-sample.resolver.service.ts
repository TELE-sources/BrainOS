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