# TODO.md — BrainOS

Statut de build du projet, redémarré from scratch. Source de vérité pour la liste des piliers : `dashboard-mockup.html` + `docs/piliers_tree.txt` (25 piliers, 5 couches — strictement alignés, ne pas les faire diverger).

Légende : ⬜ à faire · 🟨 en cours · ✅ fait

---

## P0 — Fondations

- ✅ Décision : monorepo npm workspaces (`apps/web`, `apps/api`, `packages/shared-types`, `packages/core-domain`), sans Docker, sans GitHub
- ✅ Décision : PostgreSQL local uniquement, aucune couche Firebase/mockée
- ✅ Décision : nom du projet — **BrainOS**
- ✅ Décision : 25 piliers, numérotation séquentielle, 5 couches (Core Business, Excellence Industrielle, Pilotage d'Entreprise, Plateforme Digitale, Platform)
- ✅ Décision : pilier 24 (Identity, Security & Access Management) porte l'authentification applicative — pas de pilier Core/Auth séparé
- ✅ Décision : Maintenance reste distribuée (Production, Logistics, Planning) — pas de pilier autonome
- ✅ Scaffolding réel des dossiers `apps/web`, `apps/api`, `packages/shared-types` (npm workspaces, package.json racine)
- ✅ Configuration PostgreSQL locale + première migration TypeORM
- ✅ Configuration `.env` / `.env.local` (`DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_NAME`, `GEMINI_API_KEY`)

## P1 — Enterprise Canonical Data Model (ECDM v1)

- ✅ Catalogue complet ECDM v1 : 20 domaines, 52 objets canoniques (`docs/ecdm/ecdm-v1.md`)
- ✅ Règle de gouvernance validée : objet ECDM = réutilisé par ≥ 2 piliers, sinon reste pillar-local
- ✅ Vague 1 détaillée : Enterprise Organization, People & Identity, Manufacturing Structure, Assets & Equipment, Products & Materials, Production Execution (`docs/ecdm/ecdm-v1-wave1-detail.md`)
- ✅ Vague 2 détaillée : Documents & Knowledge, Measurements & Historian, Workflow & Tasks, Quality Core, Maintenance Core, Supply Chain Core, Finance Core (`docs/ecdm/ecdm-v1-wave2-detail.md`)
- ✅ Vague 3 détaillée : Sustainability Core, Industrial Connectivity, AI & Analytics, Events & Notifications, Security, Locations, KPI & Performance (`docs/ecdm/ecdm-v1-wave3-detail.md`)
- ✅ `packages/core-domain` généré et vérifié (`tsc --noEmit` sans erreur) — ~78 entités TypeORM (52 objets canoniques + tables de jonction)
- ✅ Migrations TypeORM initiales pour `packages/core-domain` exécutées (schéma synchronisé avec 78 entités)
- ⬜ Ré-évaluer `TimeSeriesPoint`/`Event` (TimescaleDB vs table classique) une fois la volumétrie réelle mesurée sur le pilier 1
- ⬜ Ré-évaluer si `Target`/`EsgTarget` doivent fusionner en un objet générique polymorphique (actuellement séparés)

## P2 — Piliers (statut de build)

> Chaque pilier passe par le cycle `superpowers` (clarifier → concevoir → planifier → coder → vérifier) avant tout code non trivial. Entités pillar-local à créer seulement après vérification qu'aucun objet ECDM existant ne convient déjà.

### Core Business

- ✅ 1. Production & Operations *(prioritaire — dépend de la vague 1 ECDM, déjà prête)*
- 🟨 2. Enterprise Financial Management
   - ✅ Budget (submodule)
   - ✅ Cost Center (submodule)
   - ⬜ Chart of Accounts
   - ⬜ Currency
   - ⬜ Financial Statements
   - ⬜ Journal Entry
   - ⬜ Treasury
- ⬜ 3. Enterprise Accounting
- ⬜ 4. Commercial Excellence & Sales Management
- ⬜ 5. Human Capital Management & Workforce Excellence
- ⬜ 6. Planning (Advanced Planning & Scheduling)
- ⬜ 7. Logistics

### Excellence Industrielle

- ⬜ 8. Compliance
- ⬜ 9. Enterprise Quality Excellence
- ⬜ 10. Enterprise HSE
- ⬜ 11. Sustainability & ESG
- ⬜ 12. Operational Excellence (Kaizen)
- ⬜ 13. Business Intelligence & Analytics

### Pilotage d'Entreprise

- ⬜ 14. Enterprise Document Management
- ⬜ 15. Intelligence & Advanced Analytics
- ⬜ 16. Enterprise Reporting & Digital Publishing
- ⬜ 17. Enterprise Digital Platform & Transformation
- ⬜ 18. Enterprise Corporate Management

### Plateforme Digitale

- ⬜ 19. Enterprise Communication & Collaboration
- ⬜ 20. Enterprise AI & Advanced Intelligence
- ⬜ 21. Enterprise Industrial IoT Platform
- ⬜ 22. Enterprise Mobile Workforce Platform

### Platform

- ⬜ 23. Enterprise Workflow & Business Process Automation
- ✅ 24. Enterprise Identity, Security & Access Management *(prioritaire — RBAC/auth nécessaire à tous les autres piliers)*
- ⬜ 25. Enterprise Cybersecurity & Physical Security Platform

## P3 — Frontend / UI

- ✅ Sidebar (`src/components/Sidebar.tsx`) reproduisant `dashboard-mockup.html` avec icônes `lucide-react` (mapping à définir et documenter)
- ✅ `ModuleRenderer` (navigation pilier/module/sous-module)
- ✅ `PillarInsights` (KPIs génériques réutilisables entre piliers)
- ✅ `TreeView` (vue architecture)
- ✅ Toute nouvelle UI passe par le plugin `frontend-design`

## P4 — Documentation

- ✅ `README.md` mis à jour (BrainOS, 25 piliers, référence `core-domain`)
- ✅ `CLAUDE.md` mis à jour (idem + règles ECDM + plugins)
- ✅ `TODO.md` (ce fichier)
- ✅ Déplacer les fichiers `ecdv1*.md` dans `docs/ecdm/` et `piliers_tree.txt` dans `docs/` lors du scaffolding réel du repo (actuellement à la racine des outputs de conversation)

---

## Notes de session (historique des décisions, à ne pas rouvrir sans raison forte)

- Vehicle = sous-type 1:1 d'Equipment (pas de hiérarchie séparée)
- RecipeLine reste pillar-local (Production), pas ECDM
- PackagingUnit : type générique unique, vide/plein via `quantity`/`status`, pas de sous-type dédié
- CAPA promue ECDM (partagée Quality/HSE/Compliance)
- SecurityIncident (pilier 25) ≠ SafetyIncident (pilier 10, pillar-local) — ne jamais fusionner
- HSE (10) = terrain/opérationnel, Sustainability & ESG (11) = reporting stratégique — frontière confirmée, pas de fusion malgré le chevauchement de nom "Environmental Management"
- Chemins de doc : `docs/piliers_tree.txt` (racine docs/) et `docs/ecdm/ecdv1*.md` (sous-dossier dédié à l'ECDM)