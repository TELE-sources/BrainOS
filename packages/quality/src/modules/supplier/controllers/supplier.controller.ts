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
import { SupplierService } from '../services/supplier.service';
import { CreateSupplierDto, UpdateSupplierDto } from '../dtos';

@ApiTags('supplier')
@Controller('api/quality/supplier')
@ApiBearerAuth()
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau fournisseur' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créé avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateSupplierDto) {
    return this.supplierService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les fournisseurs' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.supplierService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un fournisseur par ID' })
  @ApiParam({ name: 'id', description: 'UUID du fournisseur' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Fournisseur trouvé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Fournisseur non trouvé' })
  async findOne(@Param('id') id: string) {
    const entity = await this.supplierService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un fournisseur' })
  @ApiParam({ name: 'id', description: 'UUID du fournisseur' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Fournisseur non trouvé' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateSupplierDto) {
    const entity = await this.supplierService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un fournisseur' })
  @ApiParam({ name: 'id', description: 'UUID du fournisseur' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Fournisseur non trouvé' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.supplierService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
  }

  @Post(':id/scorecard')
  @ApiOperation({ summary: 'Générer un scorecard pour un fournisseur' })
  async generateScorecard(@Param('id') id: string) {
    return this.supplierService.generateScorecard(id);
  }

  @Get(':id/scorecards')
  @ApiOperation({ summary: 'Obtenir les scorecards d\'un fournisseur' })
  async getScorecards(@Param('id') id: string) {
    return this.supplierService.getScorecards(id);
  }
}
