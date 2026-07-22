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
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos';

@ApiTags('customer')
@Controller('api/quality/customer')
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Créé avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async create(@Body() createDto: CreateCustomerDto) {
    return this.customerService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les clients' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste retournée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: any) {
    return this.customerService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un client par ID' })
  @ApiParam({ name: 'id', description: 'UUID du client' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Client trouvé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Client non trouvé' })
  async findOne(@Param('id') id: string) {
    const entity = await this.customerService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un client' })
  @ApiParam({ name: 'id', description: 'UUID du client' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mise à jour réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Client non trouvé' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateCustomerDto) {
    const entity = await this.customerService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiParam({ name: 'id', description: 'UUID du client' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Suppression réussie' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Client non trouvé' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.customerService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
  }

  @Post(':id/complaint')
  @ApiOperation({ summary: 'Créer une réclamation pour un client' })
  async createComplaint(@Param('id') id: string, @Body() complaintData: any) {
    return this.customerService.createComplaint(id, complaintData);
  }

  @Get(':id/complaints')
  @ApiOperation({ summary: 'Obtenir les réclamations d\'un client' })
  async getComplaints(@Param('id') id: string) {
    return this.customerService.getComplaints(id);
  }
}
