import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LabSampleFactoryService } from '@brainos/quality/lab-sample/lab-sample.factory.service';
import { LabSampleResolverService } from '@brainos/quality/lab-sample/lab-sample.resolver.service';
import { LabSampleType } from '@brainos/quality/enums/lab-sample-type.enum';
import { LabSampleStatus } from '@brainos/quality/enums/lab-sample-status.enum';

// DTOs for creation requests
class CreateRawMaterialSampleDto {
  inspectionOrderId?: string;
  supplierId: string;
  materialCode: string;
  materialName: string;
  quantity: number;
  unit: string;
  productionDate: Date;
  expiryDate: Date;
  coaReference?: string;
}

class CreateSlurrySampleDto {
  inspectionOrderId?: string;
  batchNumber: string;
  density: number;
  temperature: number;
  pH: number;
  viscosity: number;
  mixerId: string;
  samplingTime: Date;
}

class CreateGreenCakeSampleDto {
  inspectionOrderId?: string;
  moldId: string;
  targetDensity: number;
  actualDensity: number;
  expansionRate: number;
  curingTimeMinutes: number;
  castDatetime: Date;
}

class CreateAACBlockSampleDto {
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
}

class CreateWaterSampleDto {
  inspectionOrderId?: string;
  source: string;
  pH: number;
  hardness: number;
  chlorides: number;
  temperature: number;
  conductivity: number;
}

@Controller('lab-samples')
export class LabSampleController {
  constructor(
    private readonly factoryService: LabSampleFactoryService,
    private readonly resolverService: LabSampleResolverService,
  ) {}

  // Raw Material Sample endpoints
  @Post('raw-material')
  async createRawMaterialSample(@Body() dto: CreateRawMaterialSampleDto) {
    return this.factoryService.createRawMaterialSample(dto);
  }

  // Slurry Sample endpoints
  @Post('slurry')
  async createSlurrySample(@Body() dto: CreateSlurrySampleDto) {
    return this.factoryService.createSlurrySample(dto);
  }

  // Green Cake Sample endpoints
  @Post('green-cake')
  async createGreenCakeSample(@Body() dto: CreateGreenCakeSampleDto) {
    return this.factoryService.createGreenCakeSample(dto);
  }

  // AAC Block Sample endpoints
  @Post('aac-block')
  async createAACBlockSample(@Body() dto: CreateAACBlockSampleDto) {
    return this.factoryService.createAACBlockSample(dto);
  }

  // Water Sample endpoints
  @Post('water')
  async createWaterSample(@Body() dto: CreateWaterSampleDto) {
    return this.factoryService.createWaterSample(dto);
  }

  // Generic resolution endpoints
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resolverService.resolve(id);
  }

  @Get(':id/type')
  async getType(@Param('id', ParseIntPipe) id: number): Promise<{ type: LabSampleType }> {
    const type = await this.resolverService.resolveType(id);
    return { type };
  }

  @Get(':id/with-tests')
  async findWithTests(@Param('id', ParseIntPipe) id: number) {
    return this.resolverService.resolveWithTests(id);
  }
}