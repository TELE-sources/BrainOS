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
import { ControlChartService } from '../services/control-chart.service';
import { CreateControlChartDto, UpdateControlChartDto } from '../dtos';

@ApiTags('spc')
@Controller('api/quality/spc')
@ApiBearerAuth()
export class ControlChartController {
  constructor(private readonly controlChartService: ControlChartService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle carte de contrôle' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créée avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateControlChartDto) {
    return this.controlChartService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les cartes de contrôle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.controlChartService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une carte de contrôle par ID' })
  @ApiParam({ name: 'id', description: 'UUID de la carte de contrôle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Carte de contrôle trouvée' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Carte de contrôle non trouvée' })
  async findOne(@Param('id') id: string) {
    const entity = await this.controlChartService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`ControlChart with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une carte de contrôle' })
  @ApiParam({ name: 'id', description: 'UUID de la carte de contrôle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Carte de contrôle non trouvée' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateControlChartDto) {
    const entity = await this.controlChartService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`ControlChart with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une carte de contrôle' })
  @ApiParam({ name: 'id', description: 'UUID de la carte de contrôle' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Carte de contrôle non trouvée' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.controlChartService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`ControlChart with id ${id} not found`);
    }
  }

  @Post('calculate')
  @ApiOperation({ summary: 'Calculer les limites de contrôle' })
  async calculateLimits(@Body() data: any) {
    return this.controlChartService.calculateLimits(data);
  }

  @Post(':id/points')
  @ApiOperation({ summary: 'Ajouter un point à une carte de contrôle' })
  async addPoint(@Param('id') id: string, @Body() pointData: any) {
    return this.controlChartService.addPoint(id, pointData);
  }

  @Get(':id/capability')
  @ApiOperation({ summary: 'Calculer la capabilité du processus' })
  async calculateCapability(@Param('id') id: string) {
    return this.controlChartService.calculateCapability(id);
  }
}
