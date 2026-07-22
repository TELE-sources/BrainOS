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
import { AuditService } from '../services/audit.service';
import { CreateAuditDto, UpdateAuditDto } from '../dtos';

@ApiTags('audit')
@Controller('api/quality/audit')
@ApiBearerAuth()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel audit' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créé avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateAuditDto) {
    return this.auditService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les audits' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.auditService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un audit par ID' })
  @ApiParam({ name: 'id', description: 'UUID de l\'audit' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Audit trouvé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Audit non trouvé' })
  async findOne(@Param('id') id: string) {
    const entity = await this.auditService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Audit with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un audit' })
  @ApiParam({ name: 'id', description: 'UUID de l\'audit' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Audit non trouvé' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateAuditDto) {
    const entity = await this.auditService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`Audit with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un audit' })
  @ApiParam({ name: 'id', description: 'UUID de l\'audit' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Audit non trouvé' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.auditService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Audit with id ${id} not found`);
    }
  }

  @Post(':id/findings')
  @ApiOperation({ summary: 'Ajouter une constatation à un audit' })
  async addFinding(@Param('id') id: string, @Body() findingData: any) {
    return this.auditService.addFinding(id, findingData);
  }

  @Get(':id/findings')
  @ApiOperation({ summary: 'Obtenir les constatations d\'un audit' })
  async getFindings(@Param('id') id: string) {
    return this.auditService.getFindings(id);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Compléter un audit' })
  async complete(@Param('id') id: string) {
    return this.auditService.complete(id);
  }
}
