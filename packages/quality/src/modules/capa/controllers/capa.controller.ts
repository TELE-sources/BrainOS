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
import { CAPAService } from '../services/capa.service';
import { CreateCAPADto, UpdateCAPADto } from '../dtos';

@ApiTags('capa')
@Controller('api/quality/capa')
@ApiBearerAuth()
export class CAPAController {
  constructor(private readonly capaService: CAPAService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle CAPA' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créée avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateCAPADto) {
    return this.capaService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les CAPA' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.capaService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une CAPA par ID' })
  @ApiParam({ name: 'id', description: 'UUID de la CAPA' })
  @ApiResponse({ status: HttpStatus.OK, description: 'CAPA trouvée' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'CAPA non trouvée' })
  async findOne(@Param('id') id: string) {
    const entity = await this.capaService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`CAPA with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une CAPA' })
  @ApiParam({ name: 'id', description: 'UUID de la CAPA' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'CAPA non trouvée' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateCAPADto) {
    const entity = await this.capaService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`CAPA with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une CAPA' })
  @ApiParam({ name: 'id', description: 'UUID de la CAPA' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'CAPA non trouvée' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.capaService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`CAPA with id ${id} not found`);
    }
  }

  @Post(':id/verify')
  @ApiOperation({ summary: 'Vérifier l\'efficacité d\'une CAPA' })
  async verify(@Param('id') id: string, @Body() verificationData: any) {
    return this.capaService.verify(id, verificationData);
  }

  @Get(':id/actions')
  @ApiOperation({ summary: 'Obtenir les actions d\'une CAPA' })
  async getActions(@Param('id') id: string) {
    return this.capaService.getActions(id);
  }
}
