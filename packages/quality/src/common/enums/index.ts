// ============================================================
// FOUNDATION ENUMS
// ============================================================
export enum QualityConfigStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OBSOLETE = 'OBSOLETE',
}

export enum MasterDataType {
  PRODUCT = 'product',
  MATERIAL = 'material',
  CHARACTERISTIC = 'characteristic',
  SPECIFICATION = 'specification',
  EQUIPMENT = 'equipment',
  SUPPLIER = 'supplier',
  CUSTOMER = 'customer',
}

export enum MasterDataStatus {
  DRAFT = 'DRAFT',
  IN_VALIDATION = 'IN_VALIDATION',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OBSOLETE = 'OBSOLETE',
}

export enum OrgType {
  CORPORATE = 'corporate',
  PLANT = 'plant',
  DEPARTMENT = 'department',
  TEAM = 'team',
  UNIT = 'unit',
}

export enum OrgUnitStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MERGED = 'MERGED',
  DISSOLVED = 'DISSOLVED',
}

export enum StandardOrg {
  ISO = 'ISO',
  EN = 'EN',
  ASTM = 'ASTM',
  NF = 'NF',
  DIN = 'DIN',
  BS = 'BS',
  OTHER = 'OTHER',
}

export enum StandardStatus {
  DRAFT = 'DRAFT',
  IMPORTED = 'IMPORTED',
  ACTIVE = 'ACTIVE',
  UPDATED = 'UPDATED',
  OBSOLETE = 'OBSOLETE',
}

export enum RuleType {
  INSPECTION = 'inspection',
  SAMPLING = 'sampling',
  CAPA = 'capa',
  AUDIT = 'audit',
  COMPLIANCE = 'compliance',
  ALERT = 'alert',
}

export enum AlertLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}
// ============================================================
// PLANNING ENUMS
// ============================================================
export enum QualityPlanType {
  PRODUCT = 'product',
  PROCESS = 'process',
  PROJECT = 'project',
}

export enum QualityPlanStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  IMPLEMENTED = 'IMPLEMENTED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum PhaseType {
  CONCEPT = 'concept',
  DESIGN = 'design',
  PROCESS = 'process',
  VALIDATION = 'validation',
  LAUNCH = 'launch',
  CLOSURE = 'closure',
}

export enum PhaseStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
  CANCELLED = 'cancelled',
}

export enum GateStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  PASSED = 'passed',
  FAILED = 'failed',
  CONDITIONAL = 'conditional',
}

export enum GateDecision {
  PASS = 'PASS',
  FAIL = 'FAIL',
  CONDITIONAL = 'CONDITIONAL',
}

export enum ControlPlanStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OBSOLETE = 'OBSOLETE',
}

export enum ControlPointStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OBSOLETE = 'OBSOLETE',
}
// ============================================================
// INSPECTION ENUMS
// ============================================================
export enum InspectionPlanType {
  INCOMING = 'incoming',
  IN_PROCESS = 'in_process',
  FINAL = 'final',
  SHIPPING = 'shipping',
}

export enum InspectionPlanStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OBSOLETE = 'OBSOLETE',
}

export enum CharacteristicType {
  NUMERIC = 'numeric',
  TEXT = 'text',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ENUM = 'enum',
}

export enum Criticality {
  CRITICAL = 'critical',
  MAJOR = 'major',
  MINOR = 'minor',
}

export enum InspectionType {
  INCOMING = 'incoming',
  IN_PROCESS = 'in_process',
  FINAL = 'final',
  SHIPPING = 'shipping',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum InspectionOrderStatus {
  CREATED = 'CREATED',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum InspectionDecision {
  ACCEPT = 'accept',
  REJECT = 'reject',
  CONDITIONAL = 'conditional',
  PENDING = 'pending',
}

export enum InspectionOperationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
  FAILED = 'FAILED',
}

export enum ResultStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
  WARNING = 'WARNING',
  OUT_OF_SPEC = 'OUT_OF_SPEC',
}

export enum SampleType {
  RAW_MATERIAL = 'raw_material',
  INTERMEDIATE = 'intermediate',
  FINAL_PRODUCT = 'final_product',
  ENVIRONMENTAL = 'environmental',
}

export enum SampleStatus {
  COLLECTED = 'collected',
  IN_TRANSIT = 'in_transit',
  RECEIVED = 'received',
  IN_ANALYSIS = 'in_analysis',
  ANALYZED = 'analyzed',
  DISPOSED = 'disposed',
}

export enum InspectionEquipmentType {
  GAUGE = 'gauge',
  CALIPER = 'caliper',
  MICROMETER = 'micrometer',
  SCALE = 'scale',
  SPECTROMETER = 'spectrometer',
  THERMOMETER = 'thermometer',
  PRESSURE_GAUGE = 'pressure_gauge',
  VISION_SYSTEM = 'vision_system',
  CUSTOM = 'custom',
}

export enum EquipmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  CALIBRATION = 'calibration',
  RETIRED = 'retired',
}

export enum DecisionType {
  ACCEPT = 'accept',
  REJECT = 'reject',
  CONDITIONAL = 'conditional',
  REWORK = 'rework',
  SCRAP = 'scrap',
}
// ============================================================
// SAMPLING ENUMS
// ============================================================
export enum SamplingStandard {
  ISO2859 = 'ISO2859',
  ANSI_ASQ = 'ANSI_ASQ',
  CUSTOM = 'custom',
}

export enum SamplingType {
  SINGLE = 'single',
  DOUBLE = 'double',
  MULTIPLE = 'multiple',
}

export enum SamplingLevel {
  I = 'I',
  II = 'II',
  III = 'III',
  S1 = 'S-1',
  S2 = 'S-2',
  S3 = 'S-3',
  S4 = 'S-4',
}

export enum SamplingPlanStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
// ============================================================
// LIMS ENUMS
// ============================================================
export enum LabSampleType {
  RAW_MATERIAL = 'raw_material',
  SLURRY = 'slurry',
  GREEN_CAKE = 'green_cake',
  AAC_BLOCK = 'aac_block',
  WATER = 'water',
}

export enum LabSampleStatus {
  RECEIVED = 'RECEIVED',
  REGISTERED = 'REGISTERED',
  IN_STORAGE = 'IN_STORAGE',
  IN_ANALYSIS = 'IN_ANALYSIS',
  ANALYZED = 'ANALYZED',
  DISPOSED = 'DISPOSED',
}

export enum TestMethodType {
  PHYSICAL = 'physical',
  CHEMICAL = 'chemical',
  MECHANICAL = 'mechanical',
  THERMAL = 'thermal',
  ELECTRICAL = 'electrical',
  OPTICAL = 'optical',
}

export enum TestMethodStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OBSOLETE = 'OBSOLETE',
}

export enum LabTestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum COAStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  ISSUED = 'ISSUED',
  CANCELLED = 'CANCELLED',
}
// ============================================================
// SPC ENUMS
// ============================================================
export enum ControlChartType {
  XBAR_R = 'XBAR_R',
  XBAR_S = 'XBAR_S',
  P = 'P',
  NP = 'NP',
  C = 'C',
  U = 'U',
  I_MR = 'I_MR',
}

export enum ControlChartStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum CapabilityStatus {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  ACCEPTABLE = 'ACCEPTABLE',
  POOR = 'POOR',
}

export enum TrendPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}
// ============================================================
// NC ENUMS
// ============================================================
export enum NCType {
  INTERNAL = 'internal',
  SUPPLIER = 'supplier',
  CUSTOMER = 'customer',
}

export enum Severity {
  MINOR = 'minor',
  MAJOR = 'major',
  CRITICAL = 'critical',
}

export enum NCStatus {
  CREATED = 'CREATED',
  IN_ANALYSIS = 'IN_ANALYSIS',
  IN_DISPOSITION = 'IN_DISPOSITION',
  IN_ACTION = 'IN_ACTION',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum NCDisposition {
  ACCEPT = 'accept',
  REWORK = 'rework',
  SCRAP = 'scrap',
  RETURN = 'return',
  CONCESSION = 'concession',
}

export enum DispositionType {
  ACCEPT = 'accept',
  REWORK = 'rework',
  SCRAP = 'scrap',
  RETURN = 'return',
  CONCESSION = 'concession',
}

export enum QuarantineStatus {
  ACTIVE = 'ACTIVE',
  RELEASED = 'RELEASED',
  SCRAPPED = 'SCRAPPED',
  TRANSFERRED = 'TRANSFERRED',
}

export enum ReworkStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum ConcessionType {
  PRODUCT = 'product',
  PROCESS = 'process',
  MATERIAL = 'material',
}

export enum DurationUnit {
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  PERMANENT = 'permanent',
}

export enum ConcessionStatus {
  REQUESTED = 'REQUESTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}
// ============================================================
// CAPA ENUMS
// ============================================================
export enum CAPAType {
  CORRECTIVE = 'corrective',
  PREVENTIVE = 'preventive',
}

export enum CAPAStatus {
  CREATED = 'CREATED',
  IN_ANALYSIS = 'IN_ANALYSIS',
  IN_ACTION = 'IN_ACTION',
  IN_VERIFICATION = 'IN_VERIFICATION',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}

export enum Effectiveness {
  EFFECTIVE = 'effective',
  PARTIALLY_EFFECTIVE = 'partially_effective',
  NOT_EFFECTIVE = 'not_effective',
}

export enum ActionType {
  CORRECTIVE = 'corrective',
  PREVENTIVE = 'preventive',
  IMMEDIATE = 'immediate',
}

export enum ActionStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  VERIFIED = 'VERIFIED',
  CANCELLED = 'CANCELLED',
}

export enum RCAMethod {
  FIVE_WHY = '5why',
  ISHIKAWA = 'ishikawa',
  FTA = 'fta',
  PARETO = 'pareto',
  BARRIER = 'barrier',
}

export enum CheckType {
  IMMEDIATE = 'immediate',
  FOLLOW_UP = 'follow_up',
  PERIODIC = 'periodic',
}

export enum CheckStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
// ============================================================
// RISK & FMEA ENUMS
// ============================================================
export enum RiskCategory {
  QUALITY = 'quality',
  SAFETY = 'safety',
  REGULATORY = 'regulatory',
  ENVIRONMENTAL = 'environmental',
  FINANCIAL = 'financial',
  OPERATIONAL = 'operational',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RiskStatus {
  IDENTIFIED = 'identified',
  ASSESSED = 'assessed',
  MITIGATED = 'mitigated',
  MONITORED = 'monitored',
  CLOSED = 'closed',
}

export enum AssessmentType {
  INITIAL = 'initial',
  PERIODIC = 'periodic',
  AFTER_EVENT = 'after_event',
}

export enum AssessmentStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum FMEAStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  OBSOLETE = 'OBSOLETE',
}

export enum FMEAItemStatus {
  IDENTIFIED = 'identified',
  IN_ACTION = 'in_action',
  VERIFIED = 'verified',
  CLOSED = 'closed',
}
// ============================================================
// SUPPLIER ENUMS
// ============================================================
export enum QualificationType {
  INITIAL = 'initial',
  PERIODIC = 'periodic',
  SPECIAL = 'special',
}

export enum QualificationStatus {
  REQUESTED = 'REQUESTED',
  IN_PROGRESS = 'IN_PROGRESS',
  QUALIFIED = 'QUALIFIED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export enum QualificationDecision {
  APPROVED = 'approved',
  CONDITIONAL = 'conditional',
  REJECTED = 'rejected',
}

export enum ScorecardPeriod {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUAL = 'semi_annual',
  ANNUAL = 'annual',
}

export enum SupplierRating {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  SATISFACTORY = 'satisfactory',
  POOR = 'poor',
  CRITICAL = 'critical',
}
// ============================================================
// CUSTOMER ENUMS
// ============================================================
export enum ComplaintType {
  PRODUCT_DEFECT = 'product_defect',
  DELIVERY = 'delivery',
  PACKAGING = 'packaging',
  DOCUMENTATION = 'documentation',
  SERVICE = 'service',
  OTHER = 'other',
}

export enum ComplaintStatus {
  RECEIVED = 'RECEIVED',
  IN_ANALYSIS = 'IN_ANALYSIS',
  IN_PROCESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}

export enum ClaimType {
  FINANCIAL = 'financial',
  REPLACEMENT = 'replacement',
  REPAIR = 'repair',
  OTHER = 'other',
}

export enum ClaimStatus {
  OPEN = 'OPEN',
  IN_APPROVAL = 'IN_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
  CLOSED = 'CLOSED',
}

export enum ReturnReason {
  DEFECTIVE = 'defective',
  DAMAGED = 'damaged',
  WRONG_PRODUCT = 'wrong_product',
  WRONG_QUANTITY = 'wrong_quantity',
  CUSTOMER_REQUEST = 'customer_request',
  OTHER = 'other',
}

export enum ReturnStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  RECEIVED = 'RECEIVED',
  INSPECTED = 'INSPECTED',
  PROCESSED = 'PROCESSED',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}

export enum WarrantyType {
  STANDARD = 'standard',
  EXTENDED = 'extended',
  SPECIAL = 'special',
}

export enum WarrantyUnit {
  DAYS = 'days',
  MONTHS = 'months',
  YEARS = 'years',
}

export enum WarrantyStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  CLAIMED = 'CLAIMED',
}
// ============================================================
// AUDIT ENUMS
// ============================================================
export enum AuditType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  SUPPLIER = 'supplier',
  CUSTOMER = 'customer',
  CERTIFICATION = 'certification',
  REGULATORY = 'regulatory',
}

export enum AuditStatus {
  PLANNED = 'PLANNED',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum AuditReportStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
}

export enum TeamRole {
  LEAD_AUDITOR = 'lead_auditor',
  AUDITOR = 'auditor',
  OBSERVER = 'observer',
  TECHNICAL_EXPERT = 'technical_expert',
}

export enum FindingType {
  NON_CONFORMANCE = 'non_conformance',
  OBSERVATION = 'observation',
  OPPORTUNITY = 'opportunity',
  POSITIVE = 'positive',
}

export enum FindingStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}
// ============================================================
// COMPLIANCE ENUMS
// ============================================================
export enum RequirementType {
  REGULATORY = 'regulatory',
  NORMATIVE = 'normative',
  CUSTOMER = 'customer',
  INTERNAL = 'internal',
}

export enum ComplianceStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant',
  EXEMPTED = 'exempted',
}

export enum ObligationType {
  REPORTING = 'reporting',
  PERMIT = 'permit',
  LICENSE = 'license',
  CERTIFICATION = 'certification',
  NOTIFICATION = 'notification',
  OTHER = 'other',
}

export enum ObligationStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export enum IsoStandard {
  ISO_9001 = 'ISO 9001',
  ISO_14001 = 'ISO 14001',
  ISO_45001 = 'ISO 45001',
  ISO_50001 = 'ISO 50001',
  ISO_27001 = 'ISO 27001',
  ISO_31000 = 'ISO 31000',
  CE_MARKING = 'CE Marking',
  EN_771_4 = 'EN 771-4',
  ASTM = 'ASTM',
}

export enum CertificationStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUSPENDED = 'SUSPENDED',
}
// ============================================================
// TRACEABILITY ENUMS
// ============================================================
export enum QualityGenealogyType {
  INSPECTION = 'inspection',
  TEST = 'test',
  VALIDATION = 'validation',
  AUDIT = 'audit',
  NC = 'nc',
}

export enum PassportStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  RECALLED = 'RECALLED',
}

export enum RecallReason {
  SAFETY = 'safety',
  QUALITY = 'quality',
  REGULATORY = 'regulatory',
  CUSTOMER_COMPLAINT = 'customer_complaint',
  SUPPLIER_ISSUE = 'supplier_issue',
  OTHER = 'other',
}

export enum RecallStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
// ============================================================
// AI ENUMS
// ============================================================
export enum PredictionType {
  DEFECT = 'defect',
  YIELD = 'yield',
  QUALITY_SCORE = 'quality_score',
  DOWNTIME = 'downtime',
  CAPABILITY = 'capability',
}

export enum PredictionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  VALIDATED = 'VALIDATED',
}

export enum CopilotType {
  CHAT = 'chat',
  ASSISTANT = 'assistant',
  ADVISOR = 'advisor',
  ANALYZER = 'analyzer',
}

export enum CopilotStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}
// ============================================================
// CALIBRATION ENUMS
// ============================================================
export enum CalibrationType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export enum CalibrationStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  OVERDUE = 'OVERDUE',
}

export enum StandardType {
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
  COMPANY = 'company',
  CUSTOMER = 'customer',
}

export enum StandardStatus {
  ACTIVE = 'ACTIVE',
  OBSOLETE = 'OBSOLETE',
  PENDING = 'PENDING',
}
// ============================================================
// QUALIFICATION ENUMS
// ============================================================
export enum QualificationType {
  IQ = 'iq',
  OQ = 'oq',
  PQ = 'pq',
}

export enum QualificationStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ProtocolStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  EXECUTED = 'EXECUTED',
}
// ============================================================
// VALIDATION ENUMS
// ============================================================
export enum ValidationType {
  PROCESS = 'process',
  PRODUCT = 'product',
  CLEANING = 'cleaning',
  COMPUTER_SYSTEM = 'computer_system',
  METHOD = 'method',
}

export enum ValidationStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
// ============================================================
// CHANGE CONTROL ENUMS
// ============================================================
export enum ChangeType {
  PROCESS = 'process',
  PRODUCT = 'product',
  EQUIPMENT = 'equipment',
  MATERIAL = 'material',
  DOCUMENT = 'document',
  PROCEDURE = 'procedure',
  SYSTEM = 'system',
}

export enum ChangePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ChangeStatus {
  DRAFT = 'DRAFT',
  IN_ASSESSMENT = 'IN_ASSESSMENT',
  IN_APPROVAL = 'IN_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IMPLEMENTED = 'IMPLEMENTED',
  CLOSED = 'CLOSED',
}

export enum ImpactArea {
  QUALITY = 'quality',
  SAFETY = 'safety',
  REGULATORY = 'regulatory',
  ENVIRONMENTAL = 'environmental',
  FINANCIAL = 'financial',
  OPERATIONAL = 'operational',
  CUSTOMER = 'customer',
  SUPPLIER = 'supplier',
}

export enum ImpactSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ApprovalDecision {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CONDITIONAL = 'conditional',
}
// ============================================================
// ANALYTICS & REPORTS ENUMS
// ============================================================
export enum DashboardType {
  EXECUTIVE = 'executive',
  OPERATIONAL = 'operational',
  ANALYTICAL = 'analytical',
  CUSTOM = 'custom',
}

export enum ReportType {
  INSPECTION = 'inspection',
  NC = 'nc',
  CAPA = 'capa',
  AUDIT = 'audit',
  SPC = 'spc',
  LIMS = 'lims',
  SUPPLIER = 'supplier',
  CUSTOMER = 'customer',
  COMPLIANCE = 'compliance',
  EXECUTIVE = 'executive',
  REGULATORY = 'regulatory',
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  GENERATED = 'GENERATED',
  DELIVERED = 'DELIVERED',
  ARCHIVED = 'ARCHIVED',
}
// ============================================================
// FIN DES ENUMS
// ============================================================
