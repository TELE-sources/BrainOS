import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InspectionOrder } from '../entities/inspection-order.entity';
import { IncomingInspection } from '../entities/incoming-inspection.entity';
import { InProcessInspection } from '../entities/in-process-inspection.entity';
import { FinalInspection } from '../entities/final-inspection.entity';
import { ShippingInspection } from '../entities/shipping-inspection.entity';
import { InspectionType, InspectionOrderStatus } from '../../../common/enums';

@Injectable()
export class InspectionOrderResolverService {
  constructor(private dataSource: DataSource) {}

  async getInspectionOrderWithDetails(id: string): Promise<InspectionOrder & { detail?: any }> {
    const order = await this.dataSource.getRepository(InspectionOrder).findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`InspectionOrder with id ${id} not found`);
    }
    let detail = null;
    switch (order.type) {
      case InspectionType.INCOMING:
        detail = await this.dataSource.getRepository(IncomingInspection).findOne({ where: { inspectionOrderId: id } });
        break;
      case InspectionType.IN_PROCESS:
        detail = await this.dataSource.getRepository(InProcessInspection).findOne({ where: { inspectionOrderId: id } });
        break;
      case InspectionType.FINAL:
        detail = await this.dataSource.getRepository(FinalInspection).findOne({ where: { inspectionOrderId: id } });
        break;
      case InspectionType.SHIPPING:
        detail = await this.dataSource.getRepository(ShippingInspection).findOne({ where: { inspectionOrderId: id } });
        break;
    }
    return { ...order, detail };
  }

  async getInspectionOrdersByType(type: InspectionType): Promise<InspectionOrder[]> {
    return this.dataSource.getRepository(InspectionOrder).find({ where: { type } });
  }

  async getInspectionOrdersByStatus(status: InspectionOrderStatus): Promise<InspectionOrder[]> {
    return this.dataSource.getRepository(InspectionOrder).find({ where: { status } });
  }
}
