import { PartialType } from '@nestjs/mapped-types';
export class UpdateControlChartDto extends PartialType(CreateControlChartDto) {}
