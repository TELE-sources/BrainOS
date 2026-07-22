import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InspectionOrder } from '../entities/inspection-order.entity';
import { IncomingInspection } from '../entities/incoming-inspection.entity';
import { InProcessInspection } from '../entities/in-process-inspection.entity';
import { FinalInspection } from '../entities/final-inspection.entity';
import { ShippingInspection } from '../entities/shipping-inspection.entity';
import { InspectionType, InspectionOrderStatus } from '../../../common/enums';

@Injectable()
export class InspectionOrderFactoryService {
  constructor(private dataSource: DataSource) {}

  async createIncomingInspection(data: {
    inspectionPlanId: string;
    materialLotId?: string;
    productionOrderId?: string;
    supplierId: string;
    purchaseOrderNumber: string;
    deliveryNoteNumber?: string;
    quantityReceived: number;
    unit: string;
    scheduledDate: Date;
    inspector?: string;
    priority?: string;
  }): Promise<InspectionOrder> {
    return this.dataSource.transaction(async (manager) => {
      const order = manager.create(InspectionOrder, {
        inspectionPlanId: data.inspectionPlanId,
        materialLotId: data.materialLotId,
        productionOrderId: data.productionOrderId,
        type: InspectionType.INCOMING,
        priority: data.priority ?? 'medium',
        scheduledDate: data.scheduledDate,
        inspector: data.inspector,
        status: InspectionOrderStatus.CREATED,
      });
      await manager.save(order);

      const detail = manager.create(IncomingInspection, {
        inspectionOrderId: order.id,
        supplierId: data.supplierId,
        purchaseOrderNumber: data.purchaseOrderNumber,
        deliveryNoteNumber: data.deliveryNoteNumber,
        quantityReceived: data.quantityReceived,
        unit: data.unit,
        receptionDate: new Date(),
      });
      await manager.save(detail);

      return order;
    });
  }

  async createInProcessInspection(data: {
    inspectionPlanId: string;
    materialLotId?: string;
    productionOrderId?: string;
    workstationId: string;
    operation: string;
    sampleSize: number;
    samplingMethod: string;
    scheduledDate: Date;
    inspector?: string;
    priority?: string;
  }): Promise<InspectionOrder> {
    return this.dataSource.transaction(async (manager) => {
      const order = manager.create(InspectionOrder, {
        inspectionPlanId: data.inspectionPlanId,
        materialLotId: data.materialLotId,
        productionOrderId: data.productionOrderId,
        type: InspectionType.IN_PROCESS,
        priority: data.priority ?? 'medium',
        scheduledDate: data.scheduledDate,
        inspector: data.inspector,
        status: InspectionOrderStatus.CREATED,
      });
      await manager.save(order);

      const detail = manager.create(InProcessInspection, {
        inspectionOrderId: order.id,
        workstationId: data.workstationId,
        operation: data.operation,
        sampleSize: data.sampleSize,
        samplingMethod: data.samplingMethod,
        quantityInProcess: 0,
      });
      await manager.save(detail);

      return order;
    });
  }

  async createFinalInspection(data: {
    inspectionPlanId: string;
    materialLotId?: string;
    productionOrderId?: string;
    inspectedUnits: number;
    defectiveUnits: number;
    scheduledDate: Date;
    inspector?: string;
    priority?: string;
  }): Promise<InspectionOrder> {
    return this.dataSource.transaction(async (manager) => {
      const order = manager.create(InspectionOrder, {
        inspectionPlanId: data.inspectionPlanId,
        materialLotId: data.materialLotId,
        productionOrderId: data.productionOrderId,
        type: InspectionType.FINAL,
        priority: data.priority ?? 'medium',
        scheduledDate: data.scheduledDate,
        inspector: data.inspector,
        status: InspectionOrderStatus.CREATED,
      });
      await manager.save(order);

      const detail = manager.create(FinalInspection, {
        inspectionOrderId: order.id,
        inspectedUnits: data.inspectedUnits,
        defectiveUnits: data.defectiveUnits,
        inspectionDate: new Date(),
      });
      await manager.save(detail);

      return order;
    });
  }

  async createShippingInspection(data: {
    inspectionPlanId: string;
    materialLotId?: string;
    productionOrderId?: string;
    destination: string;
    carrier: string;
    trackingNumber?: string;
    quantityShipped: number;
    scheduledDate: Date;
    inspector?: string;
    priority?: string;
  }): Promise<InspectionOrder> {
    return this.dataSource.transaction(async (manager) => {
      const order = manager.create(InspectionOrder, {
        inspectionPlanId: data.inspectionPlanId,
        materialLotId: data.materialLotId,
        productionOrderId: data.productionOrderId,
        type: InspectionType.SHIPPING,
        priority: data.priority ?? 'medium',
        scheduledDate: data.scheduledDate,
        inspector: data.inspector,
        status: InspectionOrderStatus.CREATED,
      });
      await manager.save(order);

      const detail = manager.create(ShippingInspection, {
        inspectionOrderId: order.id,
        destination: data.destination,
        carrier: data.carrier,
        trackingNumber: data.trackingNumber,
        quantityShipped: data.quantityShipped,
        inspectionDate: new Date(),
      });
      await manager.save(detail);

      return order;
    });
  }
}
