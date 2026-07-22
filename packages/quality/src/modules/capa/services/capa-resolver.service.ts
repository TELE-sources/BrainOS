import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CAPA } from '../entities/capa.entity';
import { CorrectiveAction } from '../entities/corrective-action.entity';
import { PreventiveAction } from '../entities/preventive-action.entity';
import { CAPAAction } from '../entities/capa-action.entity';
import { CAPAType } from '../../../common/enums';

@Injectable()
export class CAPAResolverService {
  constructor(private dataSource: DataSource) {}

  async resolve(id: string): Promise<{ base: CAPA; detail: any }> {
    const base = await this.dataSource.getRepository(CAPA).findOne({ where: { id } });
    if (!base) {
      throw new NotFoundException(`CAPA with id ${id} not found`);
    }
    let detail = null;
    switch (base.type) {
      case CAPAType.CORRECTIVE:
        detail = await this.dataSource.getRepository(CorrectiveAction).findOne({ where: { capaId: id } });
        break;
      case CAPAType.PREVENTIVE:
        detail = await this.dataSource.getRepository(PreventiveAction).findOne({ where: { capaId: id } });
        break;
    }
    return { base, detail };
  }

  async resolveType(id: string): Promise<CAPAType> {
    const capa = await this.dataSource.getRepository(CAPA).findOne({ where: { id }, select: ['type'] });
    if (!capa) {
      throw new NotFoundException(`CAPA with id ${id} not found`);
    }
    return capa.type;
  }

  async resolveWithActions(id: string): Promise<{ base: CAPA; detail: any; actions: CAPAAction[] }> {
    const { base, detail } = await this.resolve(id);
    const actions = await this.dataSource.getRepository(CAPAAction).find({ where: { capa: { id } } });
    return { base, detail, actions };
  }
}
