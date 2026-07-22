import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  HttpStatus 
} from '@nestjs/common';
import { QualityConfigService } from '../services/quality-config.service';
import { CreateQualityConfigDto, UpdateQualityConfigDto } from '../dtos';

@Controller('api/quality/foundation')
export class QualityConfigController {
  constructor(private readonly service: QualityConfigService) {}

  @Post()
  async create(@Body() dto: CreateQualityConfigDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}