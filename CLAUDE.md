# CLAUDE.md - Instructions pour l'IA BrainOS

## Présentation du projet

**BrainOS / BrainERPOS** est un ERP de niveau industriel destiné à une usine de fabrication de blocs AAC (Autoclaved Aerated Concrete) à Gafsa, Tunisie. Inspiré des meilleures pratiques de SAP QM (Quality Management) et Siemens Opcenter Quality, ce système intègre un sous-système complet de gestion de la qualité (eQMS) conforme aux normes ISO 9001, IATF 16949 et aux exigences de l'industrie manufacturière avancée.

## 25 piliers fonctionnels de l'ERP

| Acronyme | Pilier fonctionnel |
|----------|-------------------|
| PROD | Production & MES |
| LOGI | Logistique & Supply Chain |
| MAINT | Maintenance & Asset Management |
| FIN | Finance & Comptabilité |
| HSE | Hygiène, Sécurité & Environnement |
| RH | Ressources Humaines & Paie |
| QUAL | Quality Management (eQMS) |
| ACHAT | Achats & Approvisionnements |
| VENTE | Ventes & CRM |
| R&D | Recherche & Développement |
| PLAN | Planification & Ordonnancement |
| COUT | Calcul des coûts & contrôle de gestion |
| TRAZ | Traçabilité & Lot Control |
| ENER | Gestion de l'énergie |
| QUALIP | Qualité produit & conformité |
| AUDIT | Audit interne & conformité réglementaire |
| METRO | Métrologie & étalonnage |
| FORM | Formation & compétence |
| DOCU | Gestion documentaire |
| CHANGE | Gestion du changement |
| RISK | Gestion des risques & FMEA |
| SUPPLI | Gestion fournisseurs |
| CLIENT | Gestion client & SAV |
| INNOV | Innovation & amélioration continue |
| REPORT | Reporting & tableaux de bord |
| INFRA | Infrastructure technique & DevOps |

## Règles de développement

### Technologies
- **Backend** : Node.js ^20.0.0, NestJS ^10.0.0, TypeORM ^0.3.0
- **Base de données** : PostgreSQL ^14.0.0
- **Frontend** : React 18, TypeScript, Material-UI
- **DevOps** : Docker, Kubernetes, GitHub Actions
- **Testing** : Jest, SuperTest, Playwright, K6

### Convention de nommage
- **Fichiers** : `kebab-case.ts` (ex: `inspection-order.entity.ts`)
- **Classes** : `PascalCase` (ex: `InspectionOrderEntity`)
- **Variables/méthodes** : `camelCase` (ex: `inspectionOrderId`)
- **Constants** : `UPPER_SNAKE_CASE` (ex: `INSPECTION_TYPE_INCOMING`)
- **Interfaces** : Préfixe `I` (ex: `IInspectionOrder`)
- **Enums** : `PascalCase` avec valeurs `UPPER_SNAKE_CASE` (ex: `InspectionType.INCOMING_INSPECTION`)
- **Tables DB** : `snake_case` (ex: `inspection_orders`)
- **Colonnes DB** : `snake_case` (ex: `inspection_order_id`)

## Pattern CTI (Class Table Inheritance)

### Principe
Le CTI permet de modéliser une hiérarchie d'héritage où :
- Une table base contient les colonnes communes
- Chaque table fille contient les colonnes spécifiques + une FK vers la table base
- La PK de la table fille est aussi une FK vers la table base
- Une colonne discriminante (`type`) indique le type concret

### Implémentation TypeORM

```typescript
// Base Entity
@Entity()
export class InspectionOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inspectionOrderNumber: string;

  @Column({ type: 'enum', enum: InspectionType })
  type: InspectionType; // Discriminant Column

  @Column()
  plannedDate: Date;

  @ManyToOne(() => MaterialLot)
  materialLot: MaterialLot;

  // Colonnes communes à tous les types d'inspection
}

// Filles Entities
@Entity()
export class IncomingInspection extends InspectionOrder {
  @Column()
  supplierId: number;

  @Column()
  certificateOfConformity: boolean;

  @OneToOne(() => InspectionOrder)
  @JoinColumn()
  inspectionOrder: InspectionOrder; // PK = FK
}
```

### Services CTI

#### Factory Service (écriture transactionnelle)
```typescript
@Injectable()
export class InspectionOrderFactoryService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(InspectionOrder)
    private readonly baseRepo: Repository<InspectionOrder>,
    @InjectRepository(IncomingInspection)
    private readonly incomingRepo: Repository<IncomingInspection>,
    // ... autres repositories fille
  ) {}

  async createInspectionOrder(
    dto: CreateInspectionOrderDto
  ): Promise<InspectionOrder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      // Créer l'entité base
      const base = this.baseRepo.create({
        inspectionOrderNumber: dto.inspectionOrderNumber,
        type: dto.type,
        plannedDate: dto.plannedDate,
        materialLot: dto.materialLot,
      });
      
      const savedBase = await queryRunner.manager.save(base);
      
      // Créer l'entité fille selon le type
      let childEntity;
      switch (dto.type) {
        case InspectionType.INCOMING:
          childEntity = this.incomingRepo.create({
            ...dto,
            inspectionOrder: savedBase,
          });
          break;
        // ... autres cas
      }
      
      await queryRunner.manager.save(childEntity);
      await queryRunner.commitTransaction();
      
      // Retourner l'entité complète avec relations
      return this.baseRepo.findOne({
        where: { id: savedBase.id },
        relations: ['materialLot'],
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
```

#### Resolver Service (lecture polymorphe)
```typescript
@Injectable()
export class InspectionOrderResolverService {
  constructor(
    @InjectRepository(InspectionOrder)
    private readonly baseRepo: Repository<InspectionOrder>,
  ) {}

  async findOneWithType(id: number): Promise<InspectionOrder> {
    const base = await this.baseRepo.findOne({
      where: { id },
      relations: ['materialLot'],
    });
    
    if (!base) {
      return null;
    }
    
    // Charger l'entité fille spécifique selon le type
    switch (base.type) {
      case InspectionType.INCOMING:
        return this.baseRepo.findOne({
          where: { id },
          relations: ['materialLot', 'incomingInspection'],
        });
      // ... autres cas
      default:
        return base;
    }
  }
}
```

### Règle de promotion ECDM
Un objet du Canonical Data Model (ECDM) devient **core** s'il est réutilisé par **≥ 2 piliers fonctionnels** de l'ERP. Les objets core sont placés dans `packages/core-domain/`, tandis que les objets spécifiques à un seul pilier restent dans leur package module (ex: `packages/quality/`).

## Structure des packages
```
/packages
  /core-domain          # Entités réutilisées par ≥ 2 piliers
  /shared-types         # DTOs, enums, interfaces partagés
  /quality              # Module eQMS spécifique
  /production           # Module MES/Production
  /logistics            # Module Logistique
  /finance              # Module Financier
  // ... autres modules
```

## Workflow de développement
- **Branching** : Git Flow (main, develop, feature/*, release/*, hotfix/*)
- **Commits** : Conventionnal Commits (feat:, fix:, docs:, style:, refactor:, perf:, test:, chore:)
- **Pull Requests** : Obligatoire avec review obligatoire (≥ 1 approbateur)
- **CI/CD** : Tests automatisés sur chaque PR, déploiement staging sur merge vers develop
- **Releases** : Versionnement sémantique (MAJOR.MINOR.PATCH)

## Standards de code
- **ESLint** : Configuration Airbnb avec règles TypeScript
- **Prettier** : Formatage automatique sur sauvegarde
- **TypeORM** : Naming strategy snake_case, lazy loading évité, index ajoutés stratégiquement
- **Documentation** : JSDoc pour toutes les méthodes publiques, README par module
- **Sécurité** : Validation DTO avec class-validator, protection contre injection SQL, authentification JWT

## Comment contribuer

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/votre-org/brainos.git
cd brainos

# Installer les dépendances
npm ci

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres DB, etc.

# Initialiser la base de données
npm run typeorm:migration:run

# Lancer les tests
npm test

# Démarrer en développement
npm run start:dev
```

### Processus de contribution
1. Créer une issue décrivant le problème ou la fonctionnalité
2. Fork le dépôt et créer une branche feature/
3. Implémenter la solution avec tests unitaires/d'intégration
4. Passer les vérifications de linting et de type
5. Soumettre une Pull Request vers develop
6. Intégrer après revue et approbation