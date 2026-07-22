import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CAPA } from '../entities/capa.entity';
import { CorrectiveAction } from '../entities/corrective-action.entity';
import { PreventiveAction } from '../entities/preventive-action.entity';
import { CAPAType, CAPAStatus } from '../../../common/enums';

@Injectable()
export class CAPAFactoryService {
  constructor(private dataSource: DataSource) {}

  async createCorrectiveAction(data: {
    description: string;
    nonConformanceId?: string;
    auditFindingId?: string;
    rootCause?: string;
    responsible: string;
    dueDate: Date;
    verificationDate?: Date;
    verifiedBy?: string;
    effectiveness?: string; // if enum present
    closureDate?: Date;
    closedBy?: string;
    attachments?: string[];
  }): Promise<CAPA> {
    return this.dataSource.transaction(async (manager) => {
      const capa = manager.create(CAPA, {
        description: data.description,
        type: CAPAType.CORRECTIVE,
        nonConformance: data.nonConformanceId ? { id: data.nonConformanceId } : undefined,
        auditFinding: data.auditFindingId ? { id: data.auditFindingId } : undefined,
        rootCause: data.rootCause,
        responsible: data.responsible,
        dueDate: data.dueDate,
        verificationDate: data.verificationDate,
        verifiedBy: data.verifiedBy,
        // effectiveness: data.effectiveness as any,
        closureDate: data.closureDate,
        closedBy: data.closedBy,
        attachments: data.attachments,
        status: CAPAStatus.CREATED,
      });
      await manager.save(capa);

      const detail = manager.create(CorrectiveAction, {
        capaId: capa.id,
        rootCause: data.rootCause,
        correctiveMeasures: [], // maybe from data
        // metadata etc.
      });
      await manager.save(detail);

      return capa;
    });
  }

  async createPreventiveAction(data: {
    description: string;
    riskAssessment: string;
    potentialFailure: string;
    responsible: string;
    dueDate: Date;
    verificationDate?: Date;
    verifiedBy?: string;
  }): Promise<CAPA> {
    return this.dataSource.transaction(async (manager) => {
      const capa = manager.create(CAPA, {
        description: data.description,
        type: CAPAType.PREVENTIVE,
        responsible: data.responsible,
        dueDate: data.dueDate,
        verificationDate: data.verificationDate,
        verifiedBy: data.verifiedBy,
        status: CAPAStatus.CREATED,
      });
      await manager.save(capa);

      const detail = manager.create(PreventiveAction, {
        capaId: capa.id,
        riskAssessment: data.riskAssessment,
        potentialFailure: data.potentialFailure,
        // preventiveMeasures: [] maybe from data
      });
      await manager.save(detail);

      return capa;
    });
  }
}
