import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Import services from the package
import { ControlChartFactoryService } from '@brainos/quality/control-chart/control-chart.factory.service';
import { ControlChartResolverService } from '@brainos/quality/control-chart/control-chart.resolver.service';
import { LabSampleFactoryService } from '@brainos/quality/lab-sample/lab-sample.factory.service';
import { LabSampleResolverService } from '@brainos/quality/lab-sample/lab-sample.resolver.service';
// Import controllers
import { ControlChartController } from './control-chart/control-chart.controller';
import { LabSampleController } from './lab-sample/lab-sample.controller';
// Import entities (if we want to register them in the module)
// Note: We are registering entities in the AppModule via TypeOrmModule.forRoot, but we can also do it here for feature modules.
// However, to avoid duplication, we'll register entities in the AppModule.
@Module({
  imports: [
    // If we need to use repositories in this module (e.g., in a controller), we would import entities here.
    // But since our services are self-contained, we don't need to.
    // TypeOrmModule.forFeature([/* entities */]),
  ],
  controllers: [
    ControlChartController,
    LabSampleController,
  ],
  providers: [
    ControlChartFactoryService,
    ControlChartResolverService,
    LabSampleFactoryService,
    LabSampleResolverService,
  ],
  exports: [
    ControlChartFactoryService,
    ControlChartResolverService,
    LabSampleFactoryService,
    LabSampleResolverService,
  ],
})
export class QualityModule {}