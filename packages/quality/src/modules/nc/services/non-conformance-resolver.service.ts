import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NonConformance } from '../entities/non-conformance.entity';
import { InternalNC } from '../entities/internal-nc.entity';
import { SupplierNC } from '../entities/supplier-nc.entity';
import { CustomerNC } from '../entities/customer-nc.entity';
import { CAPA } from '../../capa/entities/capa.entity';
import { NCType } from '../../../common/enums';

@Injectable()
export class NonConformanceResolverService {
  constructor(private dataSource: DataSource) {}

  async resolve(id: string): Promise<{ base: NonConformance; detail: any }> {
    const base = await this.dataSource.getRepository(NonConformance).findOne({ where: { id } });
    if (!base) {
      throw new NotFoundException(`NonConformance with id ${id} not found`);
    }
    let detail = null;
    switch (base.type) {
      case NCType.INTERNAL:
        detail = await this.dataSource.getRepository(InternalNC).findOne({ where: { ncId: id } });
        break;
      case NCType.SUPPLIER:
        detail = await this.dataSource.getRepository(SupplierNC).findOne({ where: { ncId: id } });
        break;
      case NCType.CUSTOMER:
        detail = await this.dataSource.getRepository(CustomerNC).findOne({ where: { ncId: id } });
        break;
    }
    return { base, detail };
  }

  async resolveType(id: string): Promise<NCType> {
    const nc = await this.dataSource.getRepository(NonConformance).findOne({ where: { id }, select: ['type'] });
    if (!nc) {
      throw new NotFoundException(`NonConformance with id ${id} not found`);
    }
    return nc.type;
  }

  async resolveWithCAPA(id: string): Promise<{ base: NonConformance; detail: any; capas: CAPA[] }> {
    const { base, detail } = await this.resolve(id);
    const capas = await this.dataSource.getRepository(CAPA).find({ where: { nonConformance: { id } } });
    return { base, detail, capas };
  }
}
