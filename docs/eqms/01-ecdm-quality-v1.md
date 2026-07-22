# 01-ecdm-quality-v1.md
# Modèle de Données Canonique - Qualité (ECDM Quality)

## Constat de départ

Le module eQMS (Enterprise Quality Management System) s'appuie sur le Modèle de Données Canonique (ECDM) v1 existant et étend ce modèle avec des objets spécifiques à la gestion de la qualité conforme aux normes ISA-95/88, ISO 9001 et aux meilleures pratiques de l'industrie manufacturière.

| Niveau | Description | Statut |
|--------|-------------|---------|
| ECDM v1 | Modèle de données canonique de base (52 objets, 20 domaines) | Existante |
| ECDM Quality | Extension qualité avec 44 objets canoniques | À définir |
| Objets réutilisés | Objets ECDM v1 utilisés dans le module qualité | À identifier |
| Nouveaux objets | Objets spécifiques au domaine qualité | À définir |

## Objets ECDM v1 réutilisés dans le module qualité

Le module qualité réutilise les objets suivants du ECDM v1, ce qui les élèvera au statut de "core" (utilisés par ≥ 2 piliers) :

| Objet ECDM v1 | Domaine d'origine | Utilisation dans qualité | Pilier(s) concerné(s) |
|---------------|-------------------|--------------------------|------------------------|
| MaterialLot | Gestion des matières | Traçabilité des lots inspected | QUAL, PROD, LOGI |
| ProductionOrder | Planification de production | Ordre de production à contrôler | QUAL, PROD, PLAN |
| Equipment | Gestion des équipements | Équipements de mesure et de production | QUAL, PROD, MAINT |
| WorkCenter | Gestion des centres de travail | Postes de travail inspectés | QUAL, PROD, PLAN |
| ProductDefinition | Gestion des produits | Spécifications qualité des produits | QUAL, PROD, R&D |
| BusinessPartner | Gestion des tiers | Fournisseurs et clients qualité | QUAL, ACHAT, VENTE |
| Employee | Gestion des ressources humaines | Personnel qualité et opérateurs | QUAL, RH, PROD |
| Document | Gestion documentaire | Documents qualité et procédures | QUAL, DOCU, COMPLIANCE |
| Asset | Gestion des actifs | Actifs de qualité (étalons, références) | QUAL, MAINT, FIN |
| Location | Gestion des emplacements | Zones de contrôle et quarantaine | QUAL, LOGI, PROD |
| Batch | Gestion des lots | Lots de production contrôlés | QUAL, PROD, LOGI |
| Supplier | Gestion des fournisseurs | Évaluation et suivi fournisseurs | QUAL, ACHAT, LOGI |
| Customer | Gestion des clients | Réclamations et suivi client | QUAL, VENTE, LOGI |
| PurchaseOrder | Gestion des achats | Commandes liées aux contrôles fournisseurs | QUAL, ACHAT, FIN |
| SalesOrder | Gestion des ventes | Commandes liées aux contrôles clients | QUAL, VENTE, FIN |
| Inventory | Gestion des stocks | Stock en quarantaine ou libéré | QUAL, LOGI, FIN |
| WorkOrder | Exécution de la production | Ordres de travail liés aux contrôles en ligne | QUAL, PROD, PLAN |
| TestMethod | Gestion de la qualité (éventuel) | Méthodes d'essai et de contrôle | QUAL, R&D, PROD |
| Specification | Gestion de la qualité (éventuel) | Spécifications et tolérances | QUAL, PROD, R&D |
| QualityCharacteristic | Gestion de la qualité (éventuel) | Caractéristiques à contrôler | QUAL, PROD, R&D |
| QualityResult | Gestion de la qualité (éventuel) | Résultats de mesure et d'essai | QUAL, PROD, R&D |

*Note : Certains objets pourraient déjà exister dans ECDM v1 sous d'autres noms ou faire partie d'extensions sectorielles.*

## ISA-95 Part 3 (Quality Operations)

Le modèle ECDM Quality s'aligne sur la partie 3 de la norme ISA-95 (Intégration des systèmes entreprise-contrôle) qui définit les opérations de qualité :

### Niveaux hiérarchiques ISA-95 applicables à la qualité :
- **Niveau 0** : Processus (mesures, capteurs, actionneurs)
- **Niveau 1** : Commande de procédé (contrôles en ligne, régulations)
- **Niveau 2** : Supervision (SCADA, systèmes de contrôle de qualité)
- **Niveau 3** : Planning et ordonnancement (planification qualité, gestion des inspections)
- **Niveau 4** : Opérations entreprise (gestion de la qualité stratégique, conformité réglementaire)

### Fonctions qualité définies par ISA-95 Part 3 :
1. **Gestion des spécifications qualité** (Quality Specification Management)
2. **Gestion des contrôles qualité** (Quality Test Management)
3. **Gestion des résultats qualité** (Quality Result Management)
4. **Gestion des non-conformités** (Nonconformance Management)
5. **Analyse statistique des procédés** (Statistical Process Control)
6. **Gestion des actions correctives et préventives** (Corrective and Preventive Action Management)
7. **Gestion de l'amélioration continue** (Continuous Improvement Management)
8. **Gestion de la conformité réglementaire** (Regulatory Compliance Management)
9. **Gestion de la traçabilité qualité** (Quality Traceability Management)
10. **Gestion des audits qualité** (Quality Audit Management)

## 44 objets canoniques ECDM Quality

Les 44 objets canoniques sont organisés par domaine fonctionnel :

### 1. Fondation qualité (8 objets)
1. QualityModule - Point d'entrée du module qualité
2. QualityCharacteristic - Caractéristique à contrôler (dimension, propriété, etc.)
3. QualitySpecification - Spécification qualité avec limites et critères
4. TestMethod - Méthode d'essai ou de mesure
5. QualityStandard - Référentiel normatif (ISO, ASTM, EN, etc.)
6. QualityPlan - Plan de contrôle qualité par produit/processus
7. QualityFrequency - Fréquence d'échantillonnage et de contrôle
8. QualitySamplePlan - Plan d'échantillonnage statistique

### 2. Inspection et mesure (6 objets)
9. InspectionOrder - Ordre d'inspection (base CTI)
10. MeasurementPoint - Point de mesure ou de contrôle
11. Measurement - Résultat de mesure individuel
12. MeasurementSeries - Série de mesures liées
13. QualityResult - Résultat d'évaluation qualité (acceptation/rejet)
14. ControlChart - Carte de contrôle statistique (base CTI)

### 3. Laboratoire et échantillonnage (5 objets)
15. LabSample - Échantillon laboratoire (base CTI)
16. SamplePreparation - Préparation de l'échantillon
17. TestExecution - Exécution d'essai en laboratoire
18. TestResult - Résultat d'essai laboratoire
19. ReferenceStandard - Étalon de référence ou de contrôle

### 4. Non-conformités (6 objets)
20. NonConformance - Non-conformité (base CTI)
21. NonConformanceCause - Cause potentielle de non-conformité
22. NonConsequence - Conséquence ou impact de la non-conformité
23. QuarantineOrder - Ordre de mise en quarantaine
24. DispositionAction - Action de disposition (retraiter, rendre, détruire)
25. ReturnAuthorization - Autorisation de retour fournisseur/client

### 5. Actions correctives et préventives (4 objets)
26. CAPA - Action corrective ou préventive (base CTI)
27. RootCauseAnalysis - Analyse des Causes Racines (5 Pourquoi, Ishikawa)
28. EffectivenessCheck - Vérification de l'efficacité des actions
29. PreventiveActionPlan - Plan d'actions préventives

### 6. Gestion des risques (4 objets)
30. FMEA - Analyse des Modes de Défaillance, de leurs Effets et de leur Criticité
31. FailureMode - Mode de défaillance potentiel
32. Effect - Effet d'un mode de défaillance
33. RiskPriorityNumber - Nombre de Priorité de Risque (RPN)

### 7. Qualité fournisseur (3 objets)
34. SupplierEvaluation - Évaluation et scoring fournisseur
35. SupplierAudit - Audit qualité fournisseur
36. SupplierCorrectiveRequest - Demande d'action corrective fournisseur

### 8. Qualité client (4 objets)
37. CustomerComplaint - Réclamation client
38. CustomerSatisfaction - Mesure de satisfaction client
39. CustomerReturn - Retour marchandise client (RMA)
40. FieldReport - Rapport de terrain ou de service après-vente

### 9. Audit et conformité (3 objets)
41. QualityAudit - Audit qualité interne ou externe
42. AuditFinding - Constat d'audit
43. AuditActionPlan - Plan d'action suite à audit
44. RegulatoryRequirement - Exigence réglementaire applicable

## Tables de base (synthèse)

La mise en œuvre physique suit le pattern CTI (Class Table Inheritance) tel que défini dans `material-lot-cti-design.md` :

### Pattern CTI appliqué :
- **Tables de base** : Contiennent les attributs communs à tous les spécialisations
- **Tables filles** : Contiennent les attributs spécifiques + FK vers la table base
- **Discriminant** : Colonne `type` dans la table base indiquant la spécialisation concrète
- **Contraintes** : PK de la table base = PK et FK de la table fille

### Exemple de structure pour InspectionOrder :

```sql
-- Table base
inspection_orders (
    id SERIAL PRIMARY KEY,
    inspection_order_number VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL, -- Discriminant: INCOMING, IN_PROCESS, FINAL, SHIPPING
    planned_date TIMESTAMP,
    material_lot_id INTEGER REFERENCES material_lots(id),
    production_order_id INTEGER REFERENCES production_orders(id),
    work_center_id INTEGER REFERENCES work_centers(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table fille: IncomingInspection
incoming_inspections (
    id INTEGER PRIMARY KEY REFERENCES inspection_orders(id),
    supplier_id INTEGER REFERENCES business_partners(id),
    certificate_of_conformity BOOLEAN,
    inspection_level VARCHAR(10), -- Niveau d'inspection (II, III, etc.)
    acceptance_quality_limit DECIMAL(5,4) -- AQL
);

-- Table fille: InProcessInspection
in_process_inspections (
    id INTEGER PRIMARY KEY REFERENCES inspection_orders(id),
    process_step VARCHAR(50),
    sample_size INTEGER,
    subgroup_size INTEGER
);

-- ... autres tables filles similaires
```

## Relations principales

```mermaid
erDiagram
    %% Entités de base réutilisées
    MATERIAL_LOT ||..|| INSPECTION_ORDER : "contrôle"
    MATERIAL_LOT ||..|| LAB_SAMPLE : "échantillonnage"
    PRODUCTION_ORDER ||..|| INSPECTION_ORDER : "contrôle de production"
    EQUIPMENT ||..|| MEASUREMENT_POINT : "point de mesure"
    EQUIPMENT ||..|| LAB_SAMPLE : "analyse"
    BUSINESS_PARTNER ||..|| SUPPLIER_EVALUATION : "fournisseur"
    BUSINESS_PARTNER ||..|| CUSTOMER_COMPLAINT : "client"
    EMPLOYEE ||..|| QUALITY_AUDIT : "auditeur"
    EMPLOYEE ||..|| NONCONFORMANCE : "responsable"
    DOCUMENT ||..|| QUALITY_SPECIFICATION : "référencement"
    DOCUMENT ||..|| TEST_METHOD : "procédure"
    LOCATION ||..|| QUARANTINE_ORDER : "emplacement"

    %% Entités qualité spécifiques
    QUALITY_MODULE }|..|{ QUALITY_CHARACTERISTIC : "définit"
    QUALITY_CHARACTERISTIC }|..|{ QUALITY_SPECIFICATION : "spécifie"
    QUALITY_SPECIFICATION }|..|{ TEST_METHOD : "mesure avec"
    TEST_METHOD }|..|{ LAB_SAMPLE : "appliqué à"
    LAB_SAMPLE }|..|{ TEST_EXECUTION : "résulte en"
    TEST_EXECUTION }|..|{ TEST_RESULT : "produit"
    QUALITY_SPECIFICATION }|..|{ QUALITY_RESULT : "évalue contre"
    QUALITY_PLAN }|..|{ INSPECTION_ORDER : "génère"
    QUALITY_PLAN }|..|{ QUALITY_FREQUENCY : "définit fréquence"
    QUALITY_PLAN }|..|{ QUALITY_SAMPLE_PLAN : "définit échantillonnage"

    %% Relations principales CTI
    INSPECTION_ORDER ||..o{ INCOMING_INSPECTION : "spécialisation"
    INSPECTION_ORDER ||..o{ IN_PROCESS_INSPECTION : "spécialisation"
    INSPECTION_ORDER ||..o{ FINAL_INSPECTION : "spécialisation"
    INSPECTION_ORDER ||..o{ SHIPPING_INSPECTION : "spécialisation"

    NONCONFORMANCE ||..o{ INTERNAL_NC : "spécialisation"
    NONCONFORMANCE ||..o{ SUPPLIER_NC : "spécialisation"
    NONCONFORMANCE ||..o{ CUSTOMER_NC : "spécialisation"

    CAPA ||..o{ CORRECTIVE_ACTION : "spécialisation"
    CAPA ||..o{ PREVENTIVE_ACTION : "spécialisation"

    CONTROL_CHART ||..o{ XBAR_R_CHART : "spécialisation"
    CONTROL_CHART ||..o{ P_CHART : "spécialisation"
    CONTROL_CHART ||..o{ IMR_CHART : "spécialisation"
    CONTROL_CHART ||..o{ C_CHART : "spécialisation"
    CONTROL_CHART ||..o{ U_CHART : "spécialisation"

    LAB_SAMPLE ||..o{ RAW_MATERIAL_SAMPLE : "spécialisation"
    LAB_SAMPLE ||..o{ SLURRY_SAMPLE : "spécialisation"
    LAB_SAMPLE ||..o{ AAC_BLOCK_SAMPLE : "spécialisation"
    LAB_SAMPLE ||..o{ WATER_SAMPLE : "spécialisation"

    %% Relations transversales
    INSPECTION_ORDER }|..||{ MEASUREMENT : "produit"
    MEASUREMENT }|..||{ QUALITY_RESULT : "évalue"
    NONCONFORMANCE }|..||{ QUALITY_RESULT : "résulte de"
    QUALITY_RESULT }|..||{ DISPOSITION_ACTION : "détermine"
    CAPA }|..||{ ROOT_CAUSE_ANALYSE : "analyse cause"
    ROOT_CAUSE_ANALYSE }|..||{ EFFECTIVENESS_CHECK : "vérifie efficacité"
    FMEA }|..||{ FAILURE_MODE : "contient"
    FAILURE_MODE }|..||{ EFFECT : "entraîne"
    FAILURE_MODE }|o..||{ EFFECT : "lié à"
    QUALITY_AUDIT }|..||{ AUDIT_FINDING : "découvre"
    AUDIT_FINDING }|..||{ AUDIT_ACTION_PLAN : "génère"
    REGULATORY_REQUIREMENT }|..||{ QUALITY_SPECIFICATION : "impose"
    SUPPLIER_EVALUATION }|..||{ SUPPLIER_AUDIT : "inclut"
    CUSTOMER_COMPLAINT }|..||{ FIELD_REPORT : "peut mener à"
```

## Détail des entités CTI

### 1. InspectionOrder (base CTI)

**Objet** : Ordre d'inspection - Définit une opération de contrôle à effectuer  
**Type** : Entité de base avec spécialisations par type d'inspection  
**Discriminant** : `type` (INCOMING, IN_PROCESS, FINAL, SHIPPING)

```typescript
@Entity()
export class InspectionOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  inspectionOrderNumber: string;

  @Column({ type: 'enum', enum: InspectionType })
  type: InspectionType; // Discriminant Column

  @Column()
  plannedDate: Date;

  @Column({ nullable: true })
  actualStartDate: Date;

  @Column({ nullable: true })
  actualEndDate: Date;

  @ManyToOne(() => MaterialLot)
  materialLot: MaterialLot;

  @ManyToOne(() => ProductionOrder, { nullable: true })
  productionOrder: ProductionOrder;

  @ManyToOne(() => WorkCenter)
  workCenter: WorkCenter;

  @ManyToOne(() => Employee)
  inspector: Employee;

  @Column({ type: 'enum', enum: InspectionStatus })
  status: InspectionStatus;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relations avec spécialisations (lazy loading)
  @OneToOne(() => IncomingInspection, incoming => incoming.inspectionOrder, { nullable: true, eager: false })
  incomingInspection: IncomingInspection;

  @OneToOne(() => InProcessInspection, inProcess => inProcess.inspectionOrder, { nullable: true, eager: false })
  inProcessInspection: InProcessInspection;

  @OneToOne(() => FinalInspection, final => final.inspectionOrder, { nullable: true, eager: false })
  finalInspection: FinalInspection;

  @OneToOne(() => ShippingInspection, shipping => shipping.inspectionOrder, { nullable: true, eager: false })
  shippingInspection: ShippingInspection;

  // Métadonnées
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export enum InspectionType {
  INCOMING = 'INCOMING',
  IN_PROCESS = 'IN_PROCESS',
  FINAL = 'FINAL',
  SHIPPING = 'SHIPPING'
}

export enum InspectionStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD'
}
```

#### Tables filles spécialisées

**IncomingInspection** :
- supplierId: number (référence businessPartner)
- certificateOfConformity: boolean
- inspectionLevel: string (Niveau I, II, III selon norme)
- acceptanceQualityLimit: number (AQL)
- lotSize: number
- sampleSize: number
- numberOfNonConformingUnits: number

**InProcessInspection** :
- processStep: string (étape de procédé)
- sampleSize: number
- subgroupSize: number (pour cartes Xbar-R)
- samplingFrequency: string (toutes les X pièces, toutes les Y minutes)

**FinalInspection** :
- customerId: number (optionnel, si lié à commande spécifique)
- packagingInspection: boolean
- labelingVerification: boolean
- functionalityTestRequired: boolean
- aestheticInspectionRequired: boolean

**ShippingInspection** :
- destination: string
- carrier: string
- trackingNumber: string
- shippingDocumentsVerified: boolean
- temperatureControlled: boolean
- specialHandlingRequired: boolean

### 2. NonConformance (base CTI)

**Objet** : Non-conformité - Écart aux exigences spécifiées  
**Type** : Entité de base avec spécialisations par origine  
**Discriminant** : `type` (INTERNAL, SUPPLIER, CUSTOMER)

```typescript
@Entity()
export class NonConformance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ncNumber: string;

  @Column({ type: 'enum', enum: NCType })
  type: NCType; // Discriminant Column

  @Column()
  detectionDate: Date;

  @ManyToOne(() => InspectionOrder, { nullable: true })
  inspectionOrder: InspectionOrder;

  @ManyToOne(() => LabSample, { nullable: true })
  labSample: LabSample;

  @ManyToOne(() => MaterialLot, { nullable: true })
  materialLot: MaterialLot;

  @ManyToOne(() => ProductionOrder, { nullable: true })
  productionOrder: ProductionOrder;

  @ManyToOne(() => BusinessPartner)
  businessPartner: BusinessPartner; // Fournisseur ou client selon type

  @ManyToOne(() => Employee)
  reportedBy: Employee;

  @ManyToOne(() => Employee, { nullable: true })
  assignedTo: Employee;

  @Column({ type: 'enum', enum: NCSeverity })
  severity: NCSeverity;

  @Column({ type: 'enum', enum: NCProbability })
  probability: NCProbability;

  @Column()
  description: string;

  @Column({ type: 'text' })
  requirementsNotMet: string;

  @Column({ type: 'enum', enum: NCStatus })
  status: NCStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  estimatedCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actualCost: number;

  // Relations avec spécialisations
  @OneToOne(() => InternalNC, internal => internal.nonConformance, { nullable: true, eager: false })
  internalNC: InternalNC;

  @OneToOne(() => SupplierNC, supplier => supplier.nonConformance, { nullable: true, eager: false })
  supplierNC: SupplierNC;

  @OneToOne(() => CustomerNC, customer => customer.nonConformance, { nullable: true, eager: false })
  customerNC: CustomerNC;

  // Métadonnées
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export enum NCType {
  INTERNAL = 'INTERNAL',
  SUPPLIER = 'SUPPLIER',
  CUSTOMER = 'CUSTOMER'
}

export enum NCSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum NCProbability {
  RARE = 'RARE',
  UNLIKELY = 'UNLIKELY',
  POSSIBLE = 'POSSIBLE',
  LIKELY = 'LIKELY',
  FREQUENT = 'FREQUENT'
}

export enum NCStatus {
  OPEN = 'OPEN',
  INVESTIGATION = 'INVESTIGATION',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  IMPLEMENTED = 'IMPLEMENTED',
  VERIFIED = 'VERIFIED',
  CLOSED = 'CLOSED'
}
```

#### Tables filles spécialisées

**InternalNC** :
- department: string (département d'origine)
- processArea: string (zone de procédé)
- equipmentInvolved: string[] (liste des équipements)
- deviationType: string (dimensionnelle, apparence, fonctionnelle, etc.)
- immediateActionTaken: string
- containmentEffectiveness: string

**SupplierNC** :
- supplierLotNumber: string
- purchaseOrderNumber: string
- deliveryNoteNumber: string
- certificateNumber: string
- quarantineLocation: string
- dispositionRequired: string (return, scrap, concession)
- supplierResponseRequiredBy: Date

**CustomerNC** :
- salesOrderNumber: string
- deliveryNoteNumber: string
- complaintNumber: string (lié à CustomerComplaint)
- fieldFailure: boolean
- safetyImpact: boolean
- recallPotential: boolean
- customerResponseRequiredBy: Date
- warrantyImplication: boolean

### 3. CAPA (base CTI)

**Objet** : Action Corrective ou Préventive - Mesure pour éliminer la cause d'une non-conformité ou potentielle  
**Type** : Entité de base avec spécialisations par intention  
**Discriminant** : `type` (CORRECTIVE, PREVENTIVE)

```typescript
@Entity()
export class CAPA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  capaNumber: string;

  @Column({ type: 'enum', enum: CAPAType })
  type: CAPAType; // Discriminant Column

  @Column()
  initiationDate: Date;

  @ManyToOne(() => NonConformance, { nullable: true })
  nonConformance: NonConformance;

  @ManyToOne(() => FMEA, { nullable: true })
  fmea: FMEA;

  @ManyToOne(() => Employee)
  owner: Employee;

  @ManyToOne(() => Employee, { nullable: true })
  approver: Employee;

  @Column()
  problemStatement: string;

  @Column({ type: 'text' })
  rootCause: string;

  @Column({ type: 'text' })
  proposedAction: string;

  @Column()
  targetCompletionDate: Date;

  @Column({ nullable: true })
  actualCompletionDate: Date;

  @Column({ type: 'enum', enum: CAPAStatus })
  status: CAPAStatus;

  @Column({ type: 'enum', enum: EffectivenessStatus })
  effectivenessStatus: EffectivenessStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  estimatedCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actualCost: number;

  // Relations avec spécialisations
  @OneToOne(() => CorrectiveAction, corrective => corrective.capa, { nullable: true, eager: false })
  correctiveAction: CorrectiveAction;

  @OneToOne(() => PreventiveAction, preventive => preventive.capa, { nullable: true, eager: false })
  preventiveAction: PreventiveAction;

  // Métadonnées
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export enum CAPAType {
  CORRECTIVE = 'CORRECTIVE',
  PREVENTIVE = 'PREVENTIVE'
}

export enum CAPAStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD'
}

export enum EffectivenessStatus {
  NOT_EVALUATED = 'NOT_EVALUATED',
  EFFECTIVE = 'EFFECTIVE',
  PARTIALLY_EFFECTIVE = 'PARTIALLY_EFFECTIVE',
  INEFFECTIVE = 'INEFFECTIVE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION'
}
```

#### Tables filles spécialisées

**CorrectiveAction** :
- ncId: number (référence nonConformance pour traçabilité)
- immediateAction: string (action immédiate prise)
- containmentAction: string (action de confinement)
- preventiveAction: string (action préventive dérivée)
- verificationMethod: string (méthode de vérification)
- verificationResults: string
- effectivenessCheckDate: Date

**PreventiveAction** :
- fmeaId: number (référence FMEA source)
- riskPriorityNumberBefore: number
- riskPriorityNumberAfter: number (cible)
- preventiveMeasure: string
- implementationPlan: string
- monitoringPlan: string
- reviewDate: Date

### 4. ControlChart (base CTI)

**Objet** : Carte de contrôle statistique - Outil pour surveiller la stabilité d'un procédé  
**Type** : Entité de base avec spécialisations par type de carte  
**Discriminant** : `type` (XBAR_R, P, IMR, C, U)

```typescript
@Entity()
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

  // Métadonnées
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
  U = 'U'
}

export enum ChartStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNDER_REVIEW = 'UNDER_REVIEW',
  OBSOLETE = 'OBSOLETE'
}
```

#### Tables filles spécialisées

**XbarRChart** :
- subgroupMean: number (Xbar moyen)
- subgroupRange: number (R moyen)
- upperControlLimitRange: number (LSC pour R)
- lowerControlLimitRange: number (LIC pour R)
- sigmaEstimated: number (écart-type estimé)
- cp: number (capacité de procédé)
- cpk: number (capacité de procédé centrée)

**PChart** :
- proportionCenterLine: number (proportion moyenne)
- upperControlLimitP: number (LSC pour proportion)
- lowerControlLimitP: number (LIC pour proportion)
- npBar: number (nombre moyen de non-conformes)

**IMRChart** :
- individualMean: number (moyenne des valeurs individuelles)
- movingRangeMean: number (moyenne des étendues mobiles)
- upperControlLimitIndividual: number (LSC pour individuelles)
- lowerControlLimitIndividual: number (LIC pour individuelles)
- upperControlLimitMR: number (LSC pour étendues mobiles)
- lowerControlLimitMR: number (LIC pour étendues mobiles)

**CChart** :
- countCenterLine: number (moyenne du nombre de défauts)
- upperControlLimitC: number (LSC pour compte)
- lowerControlLimitC: number (LIC pour compte)
- poissonLambda: number (paramètre de distribution de Poisson)

**UChart** :
- unitsPerSubgroup: number (nombre moyen d'unités par sous-groupe)
- countCenterLineU: number (moyenne du nombre de défauts par unité)
- upperControlLimitU: number (LSC pour défauts par unité)
- lowerControlLimitU: number (LIC pour défauts par unité)
- poissonLambdaU: number (paramètre de distribution de Poisson ajusté)

## Prochaines étapes

1. **Validation du modèle** : Revue technique avec les experts qualité et les architectes données
2. **Implémentation base de données** : Génération des scripts SQL pour création des tables
3. **Développement services CTI** : Factory et Resolver pour chaque hiérarchie CTI
4. **Création des DTOs et contrôleurs** : API REST pour manipulation des objets qualité
5. **Écriture des tests unitaires** : Validation du comportement des entités et services
6. **Intégration avec ECDM v1** : Vérification des références croisées et des contraintes d'intégrité
7. **Documentation détaillée** : Spécifications fonctionnelles et techniques pour chaque objet
8. **Prototype fonctionnel** : Implémentation d'un workflow complet (inspection → résultat → NC éventuel → CAPA)