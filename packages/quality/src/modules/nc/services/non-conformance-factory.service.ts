import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NonConformance } from '../entities/non-conformance.entity';
import { InternalNC } from '../entities/internal-nc.entity';
import { SupplierNC } from '../entities/supplier-nc.entity';
import { CustomerNC } from '../entities/customer-nc.entity';
import { NCType, Severity, NCStatus, NCDisposition } from '../../../common/enums';

@Injectable()
export class NonConformanceFactoryService {
  constructor(private dataSource: DataSource) {}

  async createInternalNC(data: {
    description: string;
    severity: Severity;
    materialLotId?: string;
    batchId?: string;
    productionOrderId?: string;
    inspectionOrderId?: string;
    inspectionDecisionId?: string;
    quantity?: number;
    unit?: string;
    detectedDate: Date;
    detectedBy: string;
    department: string;
    processStep: string;
    machineId?: string;
  }): Promise<NonConformance> {
    return this.dataSource.transaction(async (manager) => {
      const nc = manager.create(NonConformance, {
        description: data.description,
        type: NCType.INTERNAL,
        severity: data.severity,
        materialLotId: data.materialLotId,
        batchId: data.batchId,
        productionOrderId: data.productionOrderId,
        inspectionOrderId: data.inspectionOrderId,
        inspectionDecisionId: data.inspectionDecisionId,
        quantity: data.quantity,
        unit: data.unit,
        detectedDate: data.detectedDate,
        detectedBy: data.detectedBy,
        status: NCStatus.CREATED,
      });
      await manager.save(nc);

      const detail = manager.create(InternalNC, {
        ncId: nc.id,
        department: data.department,
        processStep: data.processStep,
        machineId: data.machineId,
      });
      await manager.save(detail);

      return nc;
    });
  }

  async createSupplierNC(data: {
    description: string;
    severity: Severity;
    materialLotId?: string;
    batchId?: string;
    productionOrderId?: string;
    inspectionOrderId?: string;
    inspectionDecisionId?: string;
    quantity?: number;
    unit?: string;
    detectedDate: Date;
    detectedBy: string;
    supplierId: string;
    purchaseOrderNumber: string;
    deliveryNoteNumber?: string;
  }): Promise<NonConformance> {
    return this.dataSource.transaction(async (manager) => {
      const nc = manager.create(NonConformance, {
        description: data.description,
        type: NCType.SUPPLIER,
        severity: data.severity,
        materialLotId: data.materialLotId,
        batchId: data.batchId,
        productionOrderId: data.productionOrderId,
        inspectionOrderId: data.inspectionOrderId,
        inspectionDecisionId: data.inspectionDecisionId,
        quantity: data.quantity,
        unit: data.unit,
        detectedDate: data.detectedDate,
        detectedBy: data.detectedBy,
        status: NCStatus.CREATED,
      });
      await manager.save(nc);

      const detail = manager.create(SupplierNC, {
        ncId: nc.id,
        supplierId: data.supplierId,
        purchaseOrderNumber: data.purchaseOrderNumber,
        deliveryNoteNumber: data.deliveryNoteNumber,
      });
      await manager.save(detail);

      return nc;
    });
  }

  async createCustomerNC(data: {
    description: string;
    severity: Severity;
    materialLotId?: string;
    batchId?: string;
    productionOrderId?: string;
    inspectionOrderId?: string;
    inspectionDecisionId?: string;
    quantity?: number;
    unit?: string;
    detectedDate: Date;
    detectedBy: string;
    customerId: string;
    complaintNumber: string;
    complaintDate?: Date;
  }): Promise<NonConformance> {
    return this.dataSource.transaction(async (manager) => {
      const nc = manager.create(NonConformance, {
        description: data.description,
        type: NCType.CUSTOMER,
        severity: data.severity,
        materialLotId: data.materialLotId,
        batchId: data.batchId,
        productionOrderId: data.productionOrderId,
        inspectionOrderId: data.inspectionOrderId,
        inspectionDecisionId: data.inspectionDecisionId,
        quantity: data.quantity,
        unit: data.unit,
        detectedDate: data.detectedDate,
        detectedBy: data.detectedBy,
        status: NCStatus.CREATED,
      });
      await manager.save(nc);

      const detail = manager.create(CustomerNC, {
        ncId: nc.id,
        customerId: data.customerId,
        complaintNumber: data.complaintNumber,
        complaintDate: data.complaintDate,
      });
      await manager.save(detail);

      return nc;
    });
  }
}
