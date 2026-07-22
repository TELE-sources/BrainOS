# BrainOS — ECDM v2 : couche MES Enterprise canonique (spécialisation ISA-95/ISA-88, domaine AAC)

> Construit en extension de `ecdm-v1.md` (52 objets, 20 domaines). Objectif : amener la partie **Manufacturing Execution** du catalogue au niveau de parité fonctionnelle des cœurs de données de SAP S/4HANA + SAP Digital Manufacturing, Siemens Opcenter Execution, AVEVA MES et Dassault Apriso — tous construits (explicitement ou non) sur le référentiel **ANSI/ISA-95** (Parts 1-2-3) pour la structure Equipment/Material/Personnel/Process Segment, et **ISA-88** pour la partie batch (mix/cast/autoclave).

---

## 1. Pourquoi une couche MES séparée dans l'ECDM

Les quatre systèmes de référence n'ont pas un modèle "MES" ad hoc : ils implémentent tous, à des degrés divers, le modèle objet ISA-95/B2MML, puis le spécialisent par industrie.

| Système | Fondation modèle | Spécialisation notable |
|---|---|---|
| SAP DM (+ S/4HANA PP/QM/PM) | ISA-95 partiel via *Manufacturing Data Objects* (Resource, Order, Operation) | Fort couplage au module financier (CO-PC) pour le coût de revient |
| Siemens Opcenter Execution (ex-Camstar) | ISA-95 complet, orienté généalogie/WIP | Genealogy Engine très granulaire (semi-conducteurs à l'origine) |
| AVEVA MES (ex-Wonderware) | ISA-95 + ISA-88 batch natif | Recipe/Procedure/Unit Procedure/Operation/Phase hiérarchique |
| Dassault Apriso (DELMIA) | ISA-95 "Business Objects" (Resource/Process/Order) | Orchestration BPM transverse (proche de notre pilier 23 Workflow) |

`ecdm-v1.md` couvre déjà l'essentiel du "quoi" (52 objets). Ce qui manque pour être comparable à ces systèmes, ce n'est pas des objets en plus au hasard, mais **la structure relationnelle ISA-95/88 qui relie ces objets** : hiérarchie d'équipement typée, généalogie matière, Process Segment ↔ Segment Requirement, et le triptyque Definition/Schedule/Response répété sur les 4 domaines (Production, Qualité, Maintenance, Inventaire).

---

## 2. Le référentiel standard (rappel condensé)

**ISA-95 Part 2 — modèles objets :**
- **Personnel Model** : Person, Personnel Class, Person Property
- **Equipment Model** : Equipment, Equipment Class, Equipment Property — hiérarchie stricte `Enterprise > Site > Area > Process Cell/Line > Unit > Equipment Module > Control Module`
- **Material Model** : Material Definition, Material Class, Material Lot, Material Sublot, Material Property
- **Process Segment Model** : Process Segment + Segment Requirement (Personnel/Equipment/Material Segment Specification) — c'est la brique qui relie "ce qu'il faut" (recette/gamme) à "avec quoi" (ressources)

**ISA-95 Part 3 — modèle opérations**, décliné identiquement sur 4 domaines (Production / Qualité / Maintenance / Inventaire) :
`Operations Definition` (ce qui peut être fait) → `Operations Schedule` (ce qui est planifié) → `Operations Performance/Response` (ce qui a réellement été fait)

**ISA-88 (batch)** : `Recipe Procedure > Unit Procedure > Operation > Phase`, exécuté sur une `Unit` (équipement), avec `Recipe Parameter` et `Batch/Unit State Model` (Idle/Running/Held/Aborted...).

C'est ce triptyque et cette hiérarchie que SAP DM, Opcenter, AVEVA et Apriso réutilisent tous sous des noms différents — voir tableau §5.

---

## 3. Diagnostic : ce qui existe déjà dans `ecdm-v1.md` vs ce qui manque

| Brique ISA-95/88 | Couverture ECDM v1 | Écart |
|---|---|---|
| Equipment Model + hiérarchie typée | `Equipment`, `EquipmentClass`, `AssetHierarchy`, `Line` | Niveaux non typés explicitement (Site/Area/ProcessCell/Unit/Module) ; pas d'**EquipmentState** (Running/Idle/Down/Setup/Blocked) formalisé, alors que `DowntimeEvent`+`ReasonCode` en dépendent |
| Material Model + généalogie | `Material`, `MaterialClass`, `Batch/Lot`, `PackagingUnit` | Pas de **généalogie explicite** (quel lot de ciment + quel lot de poudre d'alu → quel Green Cake → quels blocs → quelle palette). C'est l'objet le plus critique pour la traçabilité réglementaire EN 771-4 |
| Process Segment + Segment Requirement | `ProcessSegment`, `Routing` | `Recipe/BOM` existe mais n'est pas explicitement relié à un Process Segment via des Segment Requirements (quel équipement, quel personnel, quelle matière sont *requis*, distinct de ce qui est *réellement utilisé*) |
| Operations Definition/Schedule/Response × 4 domaines | `ProductionOrder/WorkOrder` = Schedule ; rien d'explicite pour **Response** (le "réellement exécuté", distinct du planifié) sur Qualité/Maintenance/Inventaire | Manque un objet transverse **OperationsResponse** réutilisable par les 4 domaines |
| ISA-88 batch (recette AAC = process hybride batch+continu) | `Recipe` (entité propre au pilier 1) | Pas de décomposition Procedure/UnitProcedure/Operation/Phase — nécessaire pour Mixing→Casting→Autoclave qui sont bien des phases batch séquencées sur des Units différentes |
| État transport mobile (wagon) | `Vehicle` générique | Le wagon AAC est un cas ISA-95 particulier : c'est un **Equipment Module mobile** qui change de Process Cell (atelier découpe → parc autoclave → déchargement) — pas un simple véhicule logistique |

**Conclusion** : ECDM v1 a le bon inventaire d'objets (52/20 domaines) mais lui manque la couche relationnelle ISA-95/88 qui fait qu'un MES est un MES et pas juste une base de données de production. Ce document propose les objets et relations à ajouter.

---

## 4. Objets à ajouter/raffiner (delta sur ECDM v1)

### 4.1 Equipment Model — raffinement de "Assets & Equipment" (domaine 4)

| Objet | Rôle | Notes AAC |
|---|---|---|
| `EquipmentHierarchyLevel` (enum typé, pas une table libre) | Fige les niveaux ISA-95 : `Enterprise→Site→Area→ProcessCell→Unit→EquipmentModule→ControlModule` | `Area` = Atelier Mix/Cast, Atelier Découpe, Parc Autoclaves, Chaufferie ; `ProcessCell`/`Unit` = LINE-MIX-01 … LINE-PAL-01 (les 6 lignes déjà définies dans P02) |
| `EquipmentState` | État courant + historique (Running/Idle/Setup/Down/Blocked/Maintenance) | Alimente OEE (Availability) et déclenche `DowntimeEvent` |
| `TransportUnit` (spécialisation d'`Equipment`, pas de `Vehicle`) | Wagon comme Equipment Module mobile, avec position courante (quel Area) | Distinct de `Vehicle` (camions/chariots) déjà dans ECDM v1 — le wagon porte un Batch et change de Process Cell, un camion ne le fait pas au sens MES |

### 4.2 Material Model — généalogie explicite (domaine 5)

| Objet | Rôle |
|---|---|
| `MaterialGenealogyLink` | Table pivot `parent_lot_id / child_lot_id / relation_type (consumed_into / split_from / merged_into) / quantity / timestamp` — c'est l'objet qui manque le plus. Sans lui, `Batch/Lot` reste une liste plate, pas un arbre de traçabilité |
| `MaterialConsumption` | Ce qui a réellement été consommé sur une exécution (Recipe Phase) — distinct de ce que le Recipe *prévoyait* |

Chaîne AAC typique que `MaterialGenealogyLink` doit pouvoir reconstituer en une requête : `Lot ciment + Lot chaux + Lot poudre alu + Lot eau → Batch Mix → Green Cake (Mold N) → Autoclave Cycle (Wagon W) → Blocs découpés → Palette → Livraison Client`.

### 4.3 Process Segment / Segment Requirement (domaines 3 + 6)

| Objet | Rôle |
|---|---|
| `SegmentRequirement` | Lie un `ProcessSegment` à ce qu'il *exige* : `PersonnelSegmentSpec`, `EquipmentSegmentSpec`, `MaterialSegmentSpec` (ex : phase Autoclavage exige Unit=Autoclave, Personnel=Opérateur Cuisson certifié, Matériau=Wagon chargé) |
| `RecipeProcedure` / `UnitProcedure` / `RecipeOperation` / `RecipePhase` (ISA-88) | Décompose `Recipe/BOM` en hiérarchie batch exécutable : Procedure "Fabrication AAC" → Unit Procedures (Pesée, Mixage, Coulée, Cuisson, Découpe) → Operations → Phases paramétrées (température, pression, durée) |

### 4.4 Operations Response — objet transverse (domaine 9 Workflow + domaine 6 Production)

| Objet | Rôle |
|---|---|
| `OperationsResponse` | Objet générique réutilisé par Production (résultat réel d'un WorkOrder), Qualité (résultat réel d'une Inspection), Maintenance (résultat réel d'un MaintenanceWorkOrder), Inventaire (mouvement réel de stock) — chacun avec `planned_ref_id`, `actual_start`, `actual_end`, `actual_quantity`, `variance` |

Ceci évite de recoder 4 fois la même logique planifié-vs-réalisé dans chaque pilier — exactement le pattern qu'Opcenter et SAP DM industrialisent.

---

## 5. Table de correspondance — notre ECDM vs les systèmes de référence

| Objet canonique BrainOS | SAP S/4HANA + DM | Siemens Opcenter Execution | AVEVA MES | Dassault Apriso |
|---|---|---|---|---|
| `Equipment` / `EquipmentHierarchyLevel` | Work Center / Resource | Resource / Equipment | Equipment Model (ISA-95) | Resource (Business Object) |
| `EquipmentState` | Resource Status (PP-PI) | Equipment State Model | Equipment State | Resource State |
| `TransportUnit` (wagon) | Handling Unit (mobile HU) | Carrier/Vehicle Object | Mobile Equipment Module | Mobile Resource |
| `Material` / `Batch/Lot` | Material Master / Batch (LO-BM) | Material Lot | Material Lot | Material Lot |
| `MaterialGenealogyLink` | Batch Where-Used (genealogy) | Genealogy Tree (cœur historique du produit) | Genealogy/Track & Trace | Genealogy Viewer |
| `Recipe/BOM` + `RecipeProcedure/Operation/Phase` | Master Recipe (PP-PI) | Recipe/Routing | ISA-88 Recipe (Procedure/UnitProcedure/Operation/Phase natif) | Process Definition |
| `ProcessSegment` + `SegmentRequirement` | Operation + Resource Assignment | Process Definition + Resource Requirement | Segment Requirement (natif ISA-95) | Process Business Object |
| `ProductionOrder/WorkOrder` (= Operations Schedule) | Production/Process Order | Work Order | Work Order | Manufacturing Order |
| `OperationsResponse` | Confirmation (CO11N) | Operation Response | Operations Response (natif) | Order Response |
| `NonConformance` / `CAPA` | QM Notification / QM Task | NCR / CAPA | Quality Event | Non-Conformance Record |
| `DowntimeEvent` / `ReasonCode` | PM Notification / Downtime | Downtime Event | Downtime Reason | Downtime Event |
| `KpiValue` (OEE) | PP-PI KPI / ME KPI | OEE Module | OEE natif (historique Wonderware) | OEE Dashboard |
| `Device/Gateway` / `TagMapping` | SAP DM Edge / PCo | Opcenter Connect (MII) | AVEVA Historian / OPC | Apriso IoT Gateway |

**Lecture clé** : les quatre systèmes utilisent des noms différents mais la même topologie relationnelle (Equipment↔State, Material↔Genealogy, Recipe↔Segment↔Requirement, Order↔Response). C'est cette topologie — pas le vocabulaire — qu'il faut répliquer pour que BrainERPOS soit "comparable", au sens architecture, à ces plateformes.

---

## 6. Spécialisation AAC par zone de process

| Zone | Nature process (ISA-88/95) | Objets MES dominants |
|---|---|---|
| Pesée/Mixage/Coulée | Batch (ISA-88 classique) | `RecipeProcedure→Phase`, `Batch`, `MaterialConsumption`, `EquipmentState` (Mixeur) |
| Expansion/Green Cake/Pré-durcissement | Batch, temps de repos non instrumenté finement | `Batch`, `ShiftLog`, pas de `Measurement` haute fréquence nécessaire |
| Démoulage/Découpe fil chaud | Discret/répétitif | `ProductionBatch`, `ReasonCode` (fil cassé, dimension hors tolérance) |
| Vapeur/Chaudière | Continu | `Measurement/Parameter`, `TimeSeriesPoint`, `Alarm` — pas de notion de "lot" à ce niveau, alimente l'Autoclave Cycle en amont |
| Autoclave | Batch long (10-12h), le **Wagon = Unit mobile** | `RecipePhase` (montée pression/température, palier, refroidissement), `TransportUnit`, `MaterialGenealogyLink` (Wagon↔GreenCakes↔Cycle) |
| Conditionnement/Palettisation | Discret | `PackagingUnit/Pallet`, `MaterialGenealogyLink` (Blocs→Palette) |

Le point d'attention principal pour AAC (contrairement à un MES discret pur type automobile) : **l'autoclave est le nœud de convergence de la généalogie** — plusieurs Green Cakes de batches de mixage différents peuvent cuire ensemble dans un même cycle, sur un même wagon. `MaterialGenealogyLink` doit donc supporter un modèle many-to-many à ce point précis (plusieurs parents → un cycle → plusieurs enfants), pas juste une chaîne linéaire.

---

## 7. Étapes proposées (non encore exécutées)

1. Valider ce delta d'objets avant génération de code — en particulier `MaterialGenealogyLink` et `SegmentRequirement`, qui sont les deux pièces structurantes manquantes.
2. Modéliser `MaterialGenealogyLink` en priorité absolue (bloquant pour toute conformité EN 771-4 / rappel produit) — proposition de schéma many-to-many avec table de jonction versionnée.
3. Décomposer `Recipe` existant en `RecipeProcedure/UnitProcedure/Operation/Phase` (ISA-88) pour P02 — travail à faire avant tout code TypeORM sur le pilier Production.
4. Ajouter `EquipmentState` et le brancher sur `DowntimeEvent`/`ReasonCode` déjà spécifiés en P02.
5. Une fois ces 4 points validés : mettre à jour `packages/core-domain` et le catalogue `ecdm-v1.md` (fusion en `ecdm-v2.md` définitif).
