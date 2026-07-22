import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============================================================
// FOUNDATION - Entités
// ============================================================
import { QualityConfig } from './modules/foundation/entities/quality-config.entity';
import { QualityRule } from './modules/foundation/entities/quality-rule.entity';
import { QualityThreshold } from './modules/foundation/entities/quality-threshold.entity';
import { QualityMasterData } from './modules/foundation/entities/quality-master-data.entity';
import { QualityOrganization } from './modules/foundation/entities/quality-organization.entity';
import { ReferenceStandard } from './modules/foundation/entities/reference-standard.entity';

// ============================================================
// PLANNING - Entités
// ============================================================
import { QualityPlan } from './modules/planning/entities/quality-plan.entity';
import { QualityPhase } from './modules/planning/entities/quality-phase.entity';
import { QualityGate } from './modules/planning/entities/quality-gate.entity';
import { ControlPlan } from './modules/planning/entities/control-plan.entity';
import { ControlPoint } from './modules/planning/entities/control-point.entity';
import { InspectionPlan } from './modules/planning/entities/inspection-plan.entity';
import { InspectionCharacteristic } from './modules/planning/entities/inspection-characteristic.entity';
import { SamplingPlan } from './modules/planning/entities/sampling-plan.entity';

// ============================================================
// INSPECTION - Entités
// ============================================================
import { InspectionOrder } from './modules/inspection/entities/inspection-order.entity';
import { IncomingInspection } from './modules/inspection/entities/incoming-inspection.entity';
import { InProcessInspection } from './modules/inspection/entities/in-process-inspection.entity';
import { FinalInspection } from './modules/inspection/entities/final-inspection.entity';
import { ShippingInspection } from './modules/inspection/entities/shipping-inspection.entity';
import { InspectionOperation } from './modules/inspection/entities/inspection-operation.entity';
import { InspectionResult } from './modules/inspection/entities/inspection-result.entity';
import { InspectionSample } from './modules/inspection/entities/inspection-sample.entity';
import { InspectionEquipment } from './modules/inspection/entities/inspection-equipment.entity';
import { InspectionDecision } from './modules/inspection/entities/inspection-decision.entity';

// ============================================================
// LIMS - Entités
// ============================================================
import { LabSample } from './modules/lims/entities/lab-sample.entity';
import { TestMethod } from './modules/lims/entities/test-method.entity';
import { LabTest } from './modules/lims/entities/lab-test.entity';
import { LabTestResult } from './modules/lims/entities/lab-test-result.entity';
import { CertificateOfAnalysis } from './modules/lims/entities/certificate-of-analysis.entity';

// ============================================================
// SPC - Entités
// ============================================================
import { ControlChart } from './modules/spc/entities/control-chart.entity';
import { XbarRChart } from './modules/spc/entities/xbar-r-chart.entity';
import { PChart } from './modules/spc/entities/p-chart.entity';
import { NPChart } from './modules/spc/entities/np-chart.entity';
import { CChart } from './modules/spc/entities/c-chart.entity';
import { UChart } from './modules/spc/entities/u-chart.entity';
import { IMRChart } from './modules/spc/entities/imr-chart.entity';
import { ControlChartPoint } from './modules/spc/entities/control-chart-point.entity';
import { ProcessCapability } from './modules/spc/entities/process-capability.entity';
import { QualityTrend } from './modules/spc/entities/quality-trend.entity';

// ============================================================
// NC - Entités
// ============================================================
import { NonConformance } from './modules/nc/entities/non-conformance.entity';
import { InternalNC } from './modules/nc/entities/internal-nc.entity';
import { SupplierNC } from './modules/nc/entities/supplier-nc.entity';
import { CustomerNC } from './modules/nc/entities/customer-nc.entity';
import { NCDisposition } from './modules/nc/entities/nc-disposition.entity';
import { Quarantine } from './modules/nc/entities/quarantine.entity';
import { Scrap } from './modules/nc/entities/scrap.entity';
import { Rework } from './modules/nc/entities/rework.entity';
import { Concession } from './modules/nc/entities/concession.entity';

// ============================================================
// CAPA - Entités
// ============================================================
import { CAPA } from './modules/capa/entities/capa.entity';
import { CorrectiveAction } from './modules/capa/entities/corrective-action.entity';
import { PreventiveAction } from './modules/capa/entities/preventive-action.entity';
import { CAPAAction } from './modules/capa/entities/capa-action.entity';
import { RootCauseAnalysis } from './modules/capa/entities/root-cause-analysis.entity';
import { EffectivenessCheck } from './modules/capa/entities/effectiveness-check.entity';

// ============================================================
// RISK & FMEA - Entités
// ============================================================
import { RiskRegister } from './modules/risk/entities/risk-register.entity';
import { RiskAssessment } from './modules/risk/entities/risk-assessment.entity';
import { ProcessFMEA } from './modules/fmea/entities/process-fmea.entity';
import { FMEAItem } from './modules/fmea/entities/fmea-item.entity';

// ============================================================
// SUPPLIER - Entités
// ============================================================
import { SupplierQualification } from './modules/supplier/entities/supplier-qualification.entity';
import { SupplierAudit } from './modules/supplier/entities/supplier-audit.entity';
import { SupplierScorecard } from './modules/supplier/entities/supplier-scorecard.entity';

// ============================================================
// CUSTOMER - Entités
// ============================================================
import { CustomerComplaint } from './modules/customer/entities/customer-complaint.entity';
import { CustomerClaim } from './modules/customer/entities/customer-claim.entity';
import { ProductReturn } from './modules/customer/entities/product-return.entity';
import { Warranty } from './modules/customer/entities/warranty.entity';

// ============================================================
// AUDIT - Entités
// ============================================================
import { Audit } from './modules/audit/entities/audit.entity';
import { AuditTeam } from './modules/audit/entities/audit-team.entity';
import { AuditFinding } from './modules/audit/entities/audit-finding.entity';

// ============================================================
// COMPLIANCE - Entités
// ============================================================
import { ComplianceRequirement } from './modules/compliance/entities/compliance-requirement.entity';
import { RegulatoryObligation } from './modules/compliance/entities/regulatory-obligation.entity';
import { IsoCertification } from './modules/compliance/entities/iso-certification.entity';

// ============================================================
// TRACEABILITY - Entités
// ============================================================
import { QualityGenealogyLink } from './modules/traceability/entities/quality-genealogy-link.entity';
import { DigitalProductPassport } from './modules/traceability/entities/digital-product-passport.entity';
import { Recall } from './modules/traceability/entities/recall.entity';

// ============================================================
// AI - Entités
// ============================================================
import { QualityPrediction } from './modules/ai/entities/quality-prediction.entity';
import { QualityCopilot } from './modules/ai/entities/quality-copilot.entity';
import { QualityCopilotMessage } from './modules/ai/entities/quality-copilot-message.entity';

// ============================================================
// CONTROLEURS (8)
// ============================================================
import { InspectionOrderController } from './modules/inspection/controllers/inspection-order.controller';
import { NonConformanceController } from './modules/nc/controllers/non-conformance.controller';
import { CAPAController } from './modules/capa/controllers/capa.controller';
import { ControlChartController } from './modules/spc/controllers/control-chart.controller';
import { LabSampleController } from './modules/lims/controllers/lab-sample.controller';
import { SupplierController } from './modules/supplier/controllers/supplier.controller';
import { CustomerController } from './modules/customer/controllers/customer.controller';
import { AuditController } from './modules/audit/controllers/audit.controller';

// ============================================================
// SERVICES CTI (8)
// ============================================================
import { InspectionOrderFactoryService } from './modules/inspection/services/inspection-order-factory.service';
import { InspectionOrderResolverService } from './modules/inspection/services/inspection-order-resolver.service';
import { NonConformanceFactoryService } from './modules/nc/services/non-conformance-factory.service';
import { NonConformanceResolverService } from './modules/nc/services/non-conformance-resolver.service';
import { CAPAFactoryService } from './modules/capa/services/capa-factory.service';
import { CAPAResolverService } from './modules/capa/services/capa-resolver.service';
import { ControlChartFactoryService } from './modules/spc/services/control-chart-factory.service';
import { ControlChartResolverService } from './modules/spc/services/control-chart-resolver.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Foundation
      QualityConfig,
      QualityRule,
      QualityThreshold,
      QualityMasterData,
      QualityOrganization,
      ReferenceStandard,
      // Planning
      QualityPlan,
      QualityPhase,
      QualityGate,
      ControlPlan,
      ControlPoint,
      InspectionPlan,
      InspectionCharacteristic,
      SamplingPlan,
      // Inspection
      InspectionOrder,
      IncomingInspection,
      InProcessInspection,
      FinalInspection,
      ShippingInspection,
      InspectionOperation,
      InspectionResult,
      InspectionSample,
      InspectionEquipment,
      InspectionDecision,
      // LIMS
      LabSample,
      TestMethod,
      LabTest,
      LabTestResult,
      CertificateOfAnalysis,
      // SPC
      ControlChart,
      XbarRChart,
      PChart,
      NPChart,
      CChart,
      UChart,
      IMRChart,
      ControlChartPoint,
      ProcessCapability,
      QualityTrend,
      // NC
      NonConformance,
      InternalNC,
      SupplierNC,
      CustomerNC,
      NCDisposition,
      Quarantine,
      Scrap,
      Rework,
      Concession,
      // CAPA
      CAPA,
      CorrectiveAction,
      PreventiveAction,
      CAPAAction,
      RootCauseAnalysis,
      EffectivenessCheck,
      // Risk & FMEA
      RiskRegister,
      RiskAssessment,
      ProcessFMEA,
      FMEAItem,
      // Supplier
      SupplierQualification,
      SupplierAudit,
      SupplierScorecard,
      // Customer
      CustomerComplaint,
      CustomerClaim,
      ProductReturn,
      Warranty,
      // Audit
      Audit,
      AuditTeam,
      AuditFinding,
      // Compliance
      ComplianceRequirement,
      RegulatoryObligation,
      IsoCertification,
      // Traceability
      QualityGenealogyLink,
      DigitalProductPassport,
      Recall,
      // AI
      QualityPrediction,
      QualityCopilot,
      QualityCopilotMessage,
    ]),
  ],
  controllers: [
    InspectionOrderController,
    NonConformanceController,
    CAPAController,
    ControlChartController,
    LabSampleController,
    SupplierController,
    CustomerController,
    AuditController,
  ],
  providers: [
    // Inspection
    InspectionOrderFactoryService,
    InspectionOrderResolverService,
    // NC
    NonConformanceFactoryService,
    NonConformanceResolverService,
    // CAPA
    CAPAFactoryService,
    CAPAResolverService,
    // SPC
    ControlChartFactoryService,
    ControlChartResolverService,
  ],
  exports: [
    TypeOrmModule,
    InspectionOrderFactoryService,
    InspectionOrderResolverService,
    NonConformanceFactoryService,
    NonConformanceResolverService,
    CAPAFactoryService,
    CAPAResolverService,
    ControlChartFactoryService,
    ControlChartResolverService,
  ],
})
export class QualityModule {}
