import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { InspectionOrderService } from '../services/inspection-order.service';
import { CreateInspectionOrderDto, UpdateInspectionOrderDto } from '../dtos';

@ApiTags('inspection')
@Controller('api/quality/inspection')
@ApiBearerAuth()
export class InspectionOrderController {
  constructor(private readonly inspectionOrderService: InspectionOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel ordre d\'inspection' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créé avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateInspectionOrderDto) {
    return this.inspectionOrderService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les ordres d\'inspection' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.inspectionOrderService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un ordre d\'inspection par ID' })
  @ApiParam({ name: 'id', description: 'UUID de l\'ordre d\'inspection' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ordre d\'inspection trouvé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Ordre d\'inspection non trouvé' })
  async findOne(@Param('id') id: string) {
    const entity = await this.inspectionOrderService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`InspectionOrder with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un ordre d\'inspection' })
  @ApiParam({ name: 'id', description: 'UUID de l\'ordre d\'inspection' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Ordre d\'inspection non trouvé' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateInspectionOrderDto) {
    const entity = await this.inspectionOrderService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`InspectionOrder with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un ordre d\'inspection' })
  @ApiParam({ name: 'id', description: 'UUID de l\'ordre d\'inspection' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Ordre d\'inspection non trouvé' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.inspectionOrderService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`InspectionOrder with id ${id} not found`);
    }
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Exécuter une inspection' })
  async execute(@Param('id') id: string, @Body() data: any) {
    return this.inspectionOrderService.execute(id, data);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Compléter une inspection' })
  async complete(@Param('id') id: string) {
    return this.inspectionOrderService.complete(id);
  }

  @Get(':id/operations')
  @ApiOperation({ summary: 'Obtenir les opérations d\'une inspection' })
  async getOperations(@Param('id') id: string) {
    return this.inspectionOrderService.getOperations(id);
  }
}
