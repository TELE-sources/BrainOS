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
import { NonConformanceService } from '../services/non-conformance.service';
import { CreateNonConformanceDto, UpdateNonConformanceDto } from '../dtos';

@ApiTags('nc')
@Controller('api/quality/nc')
@ApiBearerAuth()
export class NonConformanceController {
  constructor(private readonly nonConformanceService: NonConformanceService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle non-conformité' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créée avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateNonConformanceDto) {
    return this.nonConformanceService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les non-conformités' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.nonConformanceService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une non-conformité par ID' })
  @ApiParam({ name: 'id', description: 'UUID de la non-conformité' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Non-conformité trouvée' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Non-conformité non trouvée' })
  async findOne(@Param('id') id: string) {
    const entity = await this.nonConformanceService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`NonConformance with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une non-conformité' })
  @ApiParam({ name: 'id', description: 'UUID de la non-conformité' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Non-conformité non trouvée' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateNonConformanceDto) {
    const entity = await this.nonConformanceService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`NonConformance with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une non-conformité' })
  @ApiParam({ name: 'id', description: 'UUID de la non-conformité' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Non-conformité non trouvée' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.nonConformanceService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`NonConformance with id ${id} not found`);
    }
  }

  @Post(':id/disposition')
  @ApiOperation({ summary: 'Appliquer une disposition à une non-conformité' })
  async applyDisposition(@Param('id') id: string, @Body() dispositionData: any) {
    return this.nonConformanceService.applyDisposition(id, dispositionData);
  }

  @Get(':id/capas')
  @ApiOperation({ summary: 'Obtenir les CAPA d\'une non-conformité' })
  async getCAPAs(@Param('id') id: string) {
    return this.nonConformanceService.getCAPAs(id);
  }
}
