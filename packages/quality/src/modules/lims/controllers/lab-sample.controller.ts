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
import { LabSampleService } from '../services/lab-sample.service';
import { CreateLabSampleDto, UpdateLabSampleDto } from '../dtos';

@ApiTags('lims')
@Controller('api/quality/lims')
@ApiBearerAuth()
export class LabSampleController {
  constructor(private readonly labSampleService: LabSampleService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel échantillon de laboratoire' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créé avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateLabSampleDto) {
    return this.labSampleService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les échantillons de laboratoire' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.labSampleService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un échantillonner un échantillon de laboratoire par ID' })
  @ApiParam({ name: 'id', description: 'UUID de l\'échantillon de laboratoire' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Échantillon de laboratoire trouvé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Échantillon de laboratoire non trouvé' })
  async findOne(@Param('id') id: string) {
    const entity = await this.labSampleService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`LabSample with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un échantillon de laboratoire' })
  @ApiParam({ name: 'id', description: 'UUID de l\'échantillon de laboratoire' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Échantillon de laboratoire non trouvé' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateLabSampleDto) {
    const entity = await this.labSampleService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`LabSample with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un échantillon de laboratoire' })
  @ApiParam({ name: 'id', description: 'UUID de l\'échantillon de laboratoire' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Échantillon de laboratoire non trouvé' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.labSampleService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`LabSample with id ${id} not found`);
    }
  }

  @Post(':id/tests')
  @ApiOperation({ summary: 'Ajouter un test à un échantillon' })
  async addTest(@Param('id') id: string, @Body() testData: any) {
    return this.labSampleService.addTest(id, testData);
  }

  @Get(':id/tests')
  @ApiOperation({ summary: 'Obtenir les tests d\'un échantillon' })
  async getTests(@Param('id') id: string) {
    return this.labSampleService.getTests(id);
  }

  @Post(':id/coa')
  @ApiOperation({ summary: 'Générer un COA pour un échantillon' })
  async generateCOA(@Param('id') id: string) {
    return this.labSampleService.generateCOA(id);
  }
}
