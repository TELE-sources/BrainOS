import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ControlChartFactoryService } from '@brainos/quality/control-chart/control-chart.factory.service';
import { ControlChartResolverService } from '@brainos/quality/control-chart/control-chart.resolver.service';
import { ControlChartType } from '@brainos/quality/enums/control-chart-type.enum';
import { ChartStatus } from '@brainos/quality/enums/chart-status.enum';

// DTOs for creation requests
class CreateXbarRChartDto {
  processSegmentId: string;
  characteristicId: string;
  subgroupSize: number;
  averageRange: number;
  ucl: number;
  lcl: number;
  centerLine: number;
  sigma: number;
}

class CreatePChartDto {
  processSegmentId: string;
  characteristicId: string;
  sampleSize: number;
  averageProportion: number;
  ucl: number;
  lcl: number;
  centerLine: number;
  sigma: number;
}

class CreateNPChartDto {
  processSegmentId: string;
  characteristicId: string;
  sampleSize: number;
  averageDefectives: number;
  ucl: number;
  lcl: number;
  centerLine: number;
  sigma: number;
}

class CreateCChartDto {
  processSegmentId: string;
  characteristicId: string;
  averageDefects: number;
  ucl: number;
  lcl: number;
  centerLine: number;
  sigma: number;
}

class CreateUChartDto {
  processSegmentId: string;
  characteristicId: string;
  sampleSize: number;
  averageDefectsPerUnit: number;
  ucl: number;
  lcl: number;
  centerLine: number;
  sigma: number;
}

class CreateIMRChartDto {
  processSegmentId: string;
  characteristicId: string;
  movingRangeAverage: number;
  ucl: number;
  lcl: number;
  centerLine: number;
  sigma: number;
}

@Controller('control-charts')
export class ControlChartController {
  constructor(
    private readonly factoryService: ControlChartFactoryService,
    private readonly resolverService: ControlChartResolverService,
  ) {}

  // Xbar-R Chart endpoints
  @Post('xbar-r')
  async createXbarRChart(@Body() dto: CreateXbarRChartDto) {
    return this.factoryService.createXbarRChart(dto);
  }

  // P Chart endpoints
  @Post('p')
  async createPChart(@Body() dto: CreatePChartDto) {
    return this.factoryService.createPChart(dto);
  }

  // NP Chart endpoints
  @Post('np')
  async createNPChart(@Body() dto: CreateNPChartDto) {
    return this.factoryService.createNPChart(dto);
  }

  // C Chart endpoints
  @Post('c')
  async createCChart(@Body() dto: CreateCChartDto) {
    return this.factoryService.createCChart(dto);
  }

  // U Chart endpoints
  @Post('u')
  async createUChart(@Body() dto: CreateUChartDto) {
    return this.factoryService.createUChart(dto);
  }

  // IMR Chart endpoints
  @Post('imr')
  async createIMRChart(@Body() dto: CreateIMRChartDto) {
    return this.factoryService.createIMRChart(dto);
  }

  // Generic resolution endpoints
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resolverService.resolve(id);
  }

  @Get(':id/type')
  async getType(@Param('id', ParseIntPipe) id: number): Promise<{ type: ControlChartType }> {
    const type = await this.resolverService.resolveType(id);
    return { type };
  }

  @Get(':id/with-points')
  async findWithPoints(@Param('id', ParseIntPipe) id: number) {
    return this.resolverService.resolveWithPoints(id);
  }
}