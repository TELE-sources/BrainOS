## 23. Analytics & Reports (3 entités)

// QualityMetric
@Entity({ name: 'quality_metrics' })
export class QualityMetric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }}
  metricId: string;

  @Column()
  name: string;

  @Column({ type: 'text' }}
  description: string;

  @Column({ type: 'enum', enum: MetricType }}
  type: MetricType; // PROCESS, PRODUCT, SUPPLIER, CUSTOMER, FINANCIAL, COMPLIANCE

  @Column({ type: 'enum', enum: CalculationMethod }}
  calculationMethod: CalculationMethod; // AVERAGE, SUM, COUNT, PERCENTAGE, RATIO, INDEX, PERCENTILE, STD_DEV

  @Column({ type: 'json' }}
  formula: { 
    numerator: string; 
    denominator: string; 
    multiplier: number; 
    offset: number 
  }; // Formule de calcul

  @Column({ type: 'json' }}
  dataSources: { 
    entity: string; 
    field: string; 
    filter: string 
  }[]; // Sources de données

  @Column({ type: 'enum', enum: CalculationFrequency }}
  frequency: CalculationFrequency; // REAL_TIME, HOURLY, DAILY, WEEKLY, MONTHLY, QUARTERLY, YEARLY

  @Column({ type: 'date' }}
  lastCalculated: Date; // Date du dernier calcul

  @Column({ type: 'date' }}
  nextCalculation: Date; // Date du prochain calcul

  @Column({ type: 'decimal', precision: 10, scale: 4 }}
  targetValue: number; // Valeur cible

  @Column({ type: 'decimal', precision: 10, scale: 4 }}
  warningThreshold: number; // Seuil d'avertissement

  @Column({ type: 'decimal', precision: 10, scale: 4 }}
  criticalThreshold: number; // Seuil critique

  @Column({ type: 'enum', enum: TrendDirection }}
  trendDirection: TrendDirection; // IMPROVING, STABLE, DEGRADING

  @Column({ type: 'boolean' }}
  isActive: boolean; // Indique si la métrique est active

  @Column({ type: 'boolean' }}
  isPublic: boolean; // Indique si la métrique est visible par tous

  @ManyToOne(() => Employee)
  owner: Employee; // Responsable de la métrique

  @Column({ type: 'text' }}
  interpretation: string; // Interprétation de la métrique

  @Column({ type: 'text' }}
  limitations: string; // Limitations de la métrique

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }}
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }}
  updatedAt: Date;
}

export enum MetricType {
  PROCESS = 'PROCESS',
  PRODUCT = 'PRODUCT',
  SUPPLIER = 'SUPPLIER',
  CUSTOMER = 'CUSTOMER',
  FINANCIAL = 'FINANCIAL',
  COMPLIANCE = 'COMPLIANCE',
  SAFETY = 'SAFETY',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  INNOVATION = 'INNOVATION'
}

export enum CalculationMethod {
  AVERAGE = 'AVERAGE',
  SUM = 'SUM',
  COUNT = 'COUNT',
  PERCENTAGE = 'PERCENTAGE',
  RATIO = 'RATIO',
  INDEX = 'INDEX',
  PERCENTILE = 'PERCENTILE',
  STD_DEV = 'STD_DEV',
  MIN = 'MIN',
  MAX = 'MAX',
  MEDIAN = 'MEDIAN',
  MODE = 'MODE',
  VARIANCE = 'VARIANCE',
  RANGE = 'RANGE',
  EWMA = 'EWMA',
  CUSUM = 'CUSUM'
}

export enum CalculationFrequency {
  REAL_TIME = 'REAL_TIME',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
  PER_BATCH = 'PER_BATCH',
  PER_LOT = 'PER_LOT',
  PER_SHIFT = 'PER_SHIFT'
}

export enum TrendDirection {
  IMPROVING = 'IMPROVING',
  STABLE = 'STABLE',
  DEGRADING = 'DEGRADING',
  UNKNOWN = 'UNKNOWN'
}

// KPICalculation
@Entity({ name: 'kpi_calculations' })
export class KPICalculation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QualityMetric)
  metric: QualityMetric; // Métrique à laquelle appartient le calcul

  @Column({ unique: true }}
  calculationId: string;

  @Column({ type: 'date' }}
  calculationDate: Date; // Date du calcul

  @Column({ type: 'time' }}
  calculationTime: string; // Heure du calcul (HH:MM:SS)

  @Column({ type: 'json' }}
  inputData: { 
    timestamp: string; 
    value: number; 
    entityId: number; 
    entityType: string 
  }[]; // Données d'entrée utilisées pour le calcul

  @Column({ type: 'decimal', precision: 10, scale: 4 }}
  calculatedValue: number; // Valeur calculée

  @Column({ type: 'boolean' }}
  isWithinTarget: boolean; // Indique si la valeur est dans la cible

  @Column({ type: 'boolean' }}
  isWithinWarning: boolean; // Indique si la valeur est dans le seuil d'avertissement

  @Column({ type: 'boolean' }}
  isWithinCritical: boolean; // Indique si la valeur est dans le seuil critique

  @Column({ type: 'decimal', precision: 10, scale: 4 }}
  deviationFromTarget: number; // Écart par rapport à la cible

  @Column({ type: 'decimal', precision: 10, scale: 4 }}
  percentageFromTarget: number; // Pourcentage d'écart par rapport à la cible

  @Column({ type: 'text' }}
  calculationMethodUsed: string; // Méthode de calcul effectivement utilisée

  @Column({ type: 'text' }}
  dataQuality: string; // Qualité des données utilisées

  @Column({ type: 'integer' }}
  dataPointsCount: number; // Nombre de points de données utilisés

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }}
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }}
  updatedAt: Date;
}

// ReportTemplate
@Entity({ name: 'report_templates' })
export class ReportTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }}
  templateId: string;

  @Column()
  name: string;

  @Column({ type: 'text' }}
  description: string;

  @Column({ type: 'enum', enum: ReportType }}
  type: ReportType; // OPERATIONAL, EXECUTIVE, COMPLIANCE, AUDIT, TREND, DASHBOARD

  @Column({ type: 'enum', enum: ReportFormat }}
  format: ReportFormat; // PDF, EXCEL, POWERPOINT, HTML, JSON

  @Column({ type: 'enum', enum: ReportFrequency }}
  frequency: ReportFrequency; // REAL_TIME, HOURLY, DAILY, WEEKLY, MONTHLY, QUARTERLY, YEARLY, AD_HOC

  @Column({ type: 'json' }}
  layout: { 
    sections: { 
      title: string; 
      type: string; 
      content: string; 
      width: number; 
      order: number 
    }[]; 
    headers: string[]; 
    footers: string[] 
  }; // Mise en page du rapport

  @Column({ type: 'json' }}
  dataSources: { 
    entity: string; 
    fields: string[]; 
    filters: string[]; 
    aggregations: string[] 
  }[]; // Sources de données pour le rapport

  @Column({ type: 'json' }}
  parameters: { 
    name: string; 
    type: string; 
    defaultValue: string; 
    isRequired: boolean; 
    options: string[] 
  }[]; // Paramètres du rapport

  @Column({ type: 'text' }}
  sqlQuery: string; // Requête SQL pour générer le rapport (optionnel)

  @Column({ type: 'text' }}
  jrxmlTemplate: string; // Template JasperReports (optionnel)

  @Column({ type: 'text' }}
  handlebarsTemplate: string; // Template Handlebars (optionnel)

  @Column({ type: 'boolean' }}
  isActive: boolean; // Indique si le modèle est actif

  @Column({ type: 'boolean' }}
  isSystem: boolean; // Indique si c'est un modèle système

  @ManyToOne(() => Employee)
  createdBy: Employee; // Personne qui a créé le modèle

  @ManyToOne(() => Employee, { nullable: true }}
  modifiedBy: Employee; // Personne qui a modifié le modèle

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }}
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }}
  updatedAt: Date;
}

export enum ReportType {
  OPERATIONAL = 'OPERATIONAL',
  EXECUTIVE = 'EXECUTIVE',
  COMPLIANCE = 'COMPLIANCE',
  AUDIT = 'AUDIT',
  TREND = 'TREND',
  DASHBOARD = 'DASHBOARD',
  SUMMARY = 'SUMMARY',
  DETAIL = 'DETAIL',
  EXCEPTION = 'EXCEPTION',
  FORECAST = 'FORECAST'
}

export enum ReportFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  POWERPOINT = 'POWERPOINT',
  HTML = 'HTML',
  JSON = 'JSON',
  CSV = 'CSV',
  XML = 'XML'
}

export enum ReportFrequency {
  REAL_TIME = 'REAL_TIME',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
  AD_HOC = 'AD_HOC',
  PER_BATCH = 'PER_BATCH',
  PER_LOT = 'PER_LOT',
  PER_SHIFT = 'PER_SHIFT'
}

/* 24. Statistical Process Control (SPC) (6 entités) */

// ControlChart
@Entity({ name: 'control_charts' })
export class ControlChart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  chartNumber: string;

  @Column({ type: 'enum', enum: ControlChartType })
  type: ControlChartType; // Discriminant Column

  @Column()
  characteristicName: string;

  @ManyToOne(() => QualityCharacteristic)
  qualityCharacteristic: QualityCharacteristic;

  @ManyToOne(() => MaterialLot, { nullable: true })
  materialLot: MaterialLot;

  @ManyToOne(() => WorkCenter)
  workCenter: WorkCenter;

  @ManyToOne(() => Equipment, { nullable: true })
  equipment: Equipment;

  @Column()
  subgroupSize: number;

  @Column()
  samplingFrequency: string; // ex: "toutes les 30 min", "toutes les 50 pièces"

  @Column()
  centerLine: number; // Moyenne ou proportion centrale

  @Column()
  upperControlLimit: number; // LSC

  @Column()
  lowerControlLimit: number; // LIC

  @Column({ nullable: true })
  upperWarningLimit: number; // LSA (optionnel)

  @Column({ nullable: true })
  lowerWarningLimit: number; // LIC (optionnel)

  @Column({ type: 'enum', enum: ChartStatus })
  status: ChartStatus;

  @Column()
  lastUpdateDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relations avec spécialisations
  @OneToOne(() => XbarRChart, xbar => xbar.controlChart, { nullable: true, eager: false })
  xbarRChart: XbarRChart;

  @OneToOne(() => PChart, p => p.controlChart, { nullable: true, eager: false })
  pChart: PChart;

  @OneToOne(() => IMRChart, imr => imr.controlChart, { nullable: true, eager: false })
  imrChart: IMRChart;

  @OneToOne(() => CChart, c => c.controlChart, { nullable: true, eager: false })
  cChart: CChart;

  @OneToOne(() => UChart, u => u.controlChart, { nullable: true, eager: false })
  uChart: UChart;

  @OneToOne(() => NPChart, np => np.controlChart, { nullable: true, eager: false })
  npChart: NPChart;

  // Métadonnées
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: date;
}

// Après l'entité ControlChart :
@Entity('xbar_r_chart')
export class XbarRChart {
  @PrimaryColumn('uuid') chartId: string;
  @OneToOne(() => ControlChart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;
  @Column('int') subgroupSize: number;
  @Column('float') averageRange: number;
}

@Entity('p_chart')
export class PChart {
  @PrimaryColumn('uuid') chartId: string;
  @OneToOne(() => ControlChart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;
  @Column('int') sampleSize: number;
  @Column('float') averageProportion: number;
}

@Entity('np_chart')
export class NPChart {
  @PrimaryColumn('uuid') chartId: string;
  @OneToOne(() => ControlChart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;
  @Column('int') sampleSize: number;
  @Column('int') averageDefectives: number;
}

@Entity('c_chart')
export class CChart {
  @PrimaryColumn('uuid') chartId: string;
  @OneToOne(() => ControlChart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;
  @Column('float') averageDefects: number;
}

@Entity('u_chart')
export class UChart {
  @PrimaryColumn('uuid') chartId: string;
  @OneToOne(() => ControlChart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;
  @Column('int') sampleSize: number;
  @Column('float') averageDefectsPerUnit: number;
}

@Entity('imr_chart')
export class IMRChart {
  @PrimaryColumn('uuid') chartId: string;
  @OneToOne(() => ControlChart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;
  @Column('float') movingRangeAverage: number;
}

// Laboratoire & échantillonnage (6 entités)

// LabSample
@Entity({ name: 'lab_samples' })
export class LabSample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  inspectionOrderId: number;

  @Column({ type: 'enum', enum: LabSampleType })
  type: LabSampleType;

  @Column()
  matrix: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column()
  receivedDate: Date;

  @Column({ type: 'enum', enum: LabSampleStatus })
  status: LabSampleStatus;

  // Relations avec spécialisations
  @OneToOne(() => RawMaterialSample, raw => raw.sample, { nullable: true, eager: false })
  rawMaterialSample: RawMaterialSample | null;

  @OneToOne(() => SlurrySample, slurry => slurry.sample, { nullable: true, eager: false })
  slurrySample: SlurrySample | null;

  @OneToOne(() => GreenCakeSample, greenCake => greenCake.sample, { nullable: true, eager: false })
  greenCakeSample: GreenCakeSample | null;

  @OneToOne(() => AACBlockSample, aacBlock => aacBlock.sample, { nullable: true, eager: false })
  aacBlockSample: AACBlockSample | null;

  @OneToOne(() => WaterSample, water => water.sample, { nullable: true, eager: false })
  waterSample: WaterSample | null;

  // Métadonnées
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// RawMaterialSample
@Entity('raw_material_sample')
@Index(['sampleId'])
@Index(['supplierId'])
@Index(['materialCode'])
export class RawMaterialSample {
  @PrimaryColumn('uuid')
  sampleId: string;

  @OneToOne(() => LabSample, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sampleId' })
  sample: LabSample;

  @Column()
  supplierId: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column()
  materialCode: string;

  @Column()
  materialName: string;

  @Column('decimal', { precision: 15, scale: 3 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: 'date' })
  productionDate: Date;

  @Column({ type: 'date' })
  expiryDate: Date;

  @Column({ nullable: true })
  coaReference: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// SlurrySample
@Entity('slurry_sample')
@Index(['sampleId'])
@Index(['batchNumber'])
export class SlurrySample {
  @PrimaryColumn('uuid')
  sampleId: string;

  @OneToOne(() => LabSample, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sampleId' })
  sample: LabSample;

  @Column()
  batchNumber: string;

  @Column('decimal', { precision: 10, scale: 3 })
  density: number;

  @Column('decimal', { precision: 5, scale: 2 })
  temperature: number;

  @Column('decimal', { precision: 5, scale: 2 })
  pH: number;

  @Column('decimal', { precision: 10, scale: 3 })
  viscosity: number;

  @Column()
  mixerId: string;

  @Column({ type: 'timestamp' })
  samplingTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// GreenCakeSample
@Entity('green_cake_sample')
@Index(['sampleId'])
@Index(['moldId'])
export class GreenCakeSample {
  @PrimaryColumn('uuid')
  sampleId: string;

  @OneToOne(() => LabSample, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sampleId' })
  sample: LabSample;

  @Column()
  moldId: string;

  @Column('decimal', { precision: 10, scale: 3 })
  targetDensity: number;

  @Column('decimal', { precision: 10, scale: 3 })
  actualDensity: number;

  @Column('decimal', { precision: 10, scale: 3 })
  expansionRate: number;

  @Column('int')
  curingTimeMinutes: number;

  @Column({ type: 'timestamp' })
  castDatetime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// AACBlockSample
@Entity('aac_block_sample')
@Index(['sampleId'])
@Index(['productCode'])
export class AACBlockSample {
  @PrimaryColumn('uuid')
  sampleId: string;

  @OneToOne(() => LabSample, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sampleId' })
  sample: LabSample;

  @Column()
  productCode: string;

  @Column('decimal', { precision: 10, scale: 3 })
  compressiveStrength: number;

  @Column('decimal', { precision: 10, scale: 3 })
  dryDensity: number;

  @Column('decimal', { precision: 10, scale: 3 })
  thermalConductivity: number;

  @Column('decimal', { precision: 10, scale: 3 })
  waterAbsorption: number;

  @Column('decimal', { precision: 10, scale: 3 })
  length: number;

  @Column('decimal', { precision: 10, scale: 3 })
  width: number;

  @Column('decimal', { precision: 10, scale: 3 })
  height: number;

  @Column()
  unit: string;

  @Column()
  autoclaveCycleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// WaterSample
@Entity('water_sample')
@Index(['sampleId'])
@Index(['source'])
export class WaterSample {
  @PrimaryColumn('uuid')
  sampleId: string;

  @OneToOne(() => LabSample, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sampleId' })
  sample: LabSample;

  @Column()
  source: string; // 'tap', 'well', 'recycled'

  @Column('decimal', { precision: 5, scale: 2 })
  pH: number;

  @Column('decimal', { precision: 10, scale: 3 })
  hardness: number;

  @Column('decimal', { precision: 10, scale: 3 })
  chlorides: number;

  @Column('decimal', { precision: 5, scale: 2 })
  temperature: number;

  @Column('decimal', { precision: 10, scale: 3 })
  conductivity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export enum ControlChartType {
  XBAR_R = 'XBAR_R',
  P = 'P',
  IMR = 'IMR',
  C = 'C',
  U = 'U',
  NP = 'NP'
}

export enum ChartStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNDER_REVIEW = 'UNDER_REVIEW',
  OBSOLETE = 'OBSOLETE'
}

export enum LabSampleType {
  RAW_MATERIAL = 'RAW_MATERIAL',
  SLURRY = 'SLURRY',
  GREEN_CAKE = 'GREEN_CAKE',
  AAC_BLOCK = 'AAC_BLOCK',
  WATER = 'WATER'
}

export enum LabSampleStatus {
  RECEIVED = 'RECEIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
}