# BrainOS

Un système ERP/MES (Enterprise Resource Planning / Manufacturing Execution System) pour la gestion de production de béton cellulaire autoclavé (AAC — Autoclaved Aerated Concrete), organisé en **25 piliers** répartis en 5 couches.

## Overview

BrainOS est un ERP conçu spécifiquement pour l'industrie AAC, à la profondeur d'un SAP Digital Manufacturing / Siemens Opcenter / AVEVA MES sur ses piliers cœur de métier. L'architecture repose sur deux fondations :
- **25 piliers métier**, répartis en 5 couches (voir ci-dessous), référence unique : `dashboard-mockup.html` et `docs/piliers_tree.txt`
- Un **Enterprise Canonical Data Model (ECDM)** commun, partagé par tous les piliers via le package `packages/core-domain`

## Fonctionnalités

- **Architecture à 25 piliers**, couvrant l'ensemble des domaines métier AAC (production, finance, qualité, HSE, RH, logistique, cybersécurité...)
- **Modèle de données unifié (ECDM v1)** : 52 objets canoniques réutilisés par tous les piliers, évitant la duplication d'entités
- **IA intégrée** : assistant Google Gemini pour un support contextuel
- **Contrôle d'accès basé sur les rôles** (pilier 24)
- **Analytique avancée** : dashboards, rapports, BI (piliers 13, 15, 16)
- **Suite Cybersécurité & Sécurité Physique** (pilier 25) : SOC, contrôle d'accès, vidéosurveillance, biométrie (RGPD)

## Les 25 Piliers

> Source de vérité unique : `dashboard-mockup.html` (sidebar, icônes, regroupement par couche) et `docs/piliers_tree.txt` (arborescence détaillée des modules/sous-modules de chaque pilier). Numérotation séquentielle 1→25, sans exception.

### Core Business (1-7)
1. **Production & Operations** *(niveau MES industriel)*
2. **Enterprise Financial Management** *(Budget, Chart of Accounts, Cost Center, Currency, Financial Statements, Journal Entry, Treasury)*
3. **Enterprise Accounting**
4. **Commercial Excellence & Sales Management**
5. **Human Capital Management & Workforce Excellence**
6. **Planning (Advanced Planning & Scheduling)**
7. **Logistics**

### Excellence Industrielle (8-13)
8. **Compliance**
9. **Enterprise Quality Excellence**
10. **Enterprise HSE** (Environment, Health, Safety & Sustainability — volet opérationnel/terrain)
11. **Sustainability & ESG** (reporting stratégique — GRI, CSRD, ISSB, TCFD, SASB)
12. **Operational Excellence (Kaizen)**
13. **Business Intelligence & Analytics**

### Pilotage d'Entreprise (14-18)
14. **Enterprise Document Management**
15. **Intelligence & Advanced Analytics**
16. **Enterprise Reporting & Digital Publishing**
17. **Enterprise Digital Platform & Transformation**
18. **Enterprise Corporate Management**

### Plateforme Digitale (19-22)
19. **Enterprise Communication & Collaboration**
20. **Enterprise AI & Advanced Intelligence**
21. **Enterprise Industrial IoT Platform**
22. **Enterprise Mobile Workforce Platform**

### Platform (23-25)
23. **Enterprise Workflow & Business Process Automation**
24. **Enterprise Identity, Security & Access Management** *(porte aussi l'authentification applicative — pas de pilier Core/Auth séparé)*
25. **Enterprise Cybersecurity & Physical Security Platform**

> Note : **Maintenance** n'est pas un pilier autonome — elle est distribuée en sous-modules dans Production & Operations, Logistics et Planning (cohérent avec `docs/piliers_tree.txt`).

## Démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm
- PostgreSQL (installation locale)
- Clé API Gemini (pour les fonctionnalités IA)

### Installation

```bash
cd brainos
npm install
```

Configurer les variables d'environnement :
- Backend (`apps/api/.env`) : `DATABASE_HOST=localhost`, `DATABASE_PORT`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_NAME`
- Frontend : copier `.env.example` vers `.env.local` et renseigner `GEMINI_API_KEY`

Démarrer le backend puis le frontend (deux terminaux) :
```bash
cd apps/api && npm run start:dev   # http://localhost:3000
cd apps/web && npm run dev         # http://localhost:5173
```

### Scripts disponibles

- `npm install` - installe les dépendances (tous les workspaces)
- `npm run dev` - démarre le serveur de développement
- `npm run build` - build de production
- `npm run preview` - preview du build
- `npm run lint` - vérification TypeScript (sans émission)

## Architecture

### Stack technique

**Monorepo (npm workspaces) :**
- `apps/web` — Frontend (React 19 + Vite 6, TypeScript, Tailwind CSS 4)
- `apps/api` — Backend (NestJS 10, PostgreSQL via TypeORM 0.3, auth JWT)
- `packages/shared-types` — Types/DTOs partagés front-back
- `packages/core-domain` — **Enterprise Canonical Data Model (ECDM v1)** : entités TypeORM partagées par les 25 piliers

### Enterprise Canonical Data Model (ECDM)

`packages/core-domain` contient ~52 objets canoniques répartis en 20 domaines (Enterprise Organization, People & Identity, Assets & Equipment, Products & Materials, Production Execution, Documents, Measurements & Historian, Workflow & Tasks, Quality Core, Maintenance Core, Supply Chain Core, Finance Core, Sustainability Core, Industrial Connectivity, AI & Analytics, Events & Notifications, Security, Locations, KPI & Performance, Manufacturing Structure).

**Règle de gouvernance** : un objet n'entre dans l'ECDM que s'il est réutilisé par **au moins 2 piliers** ; sinon il reste une entité locale au pilier propriétaire (ex. `RecipeLine`, `SafetyIncident`, `SalesOrder`). Chaque pilier importe les entités ECDM dont il a besoin et n'ajoute que ses entités spécifiques.

Documentation détaillée : `docs/ecdm/ecdm-v1.md` (catalogue complet) et `docs/ecdm/ecdm-v1-wave{1,2,3}-detail.md` (attributs/relations par domaine).

### Répertoires clés

- `src/components` - composants UI organisés par fonctionnalité
- `src/lib` - contexte de langue, store, utilitaires
- `src/hooks` - hooks React custom (`useCopilot`, etc.)
- `src/services` - logique métier (`aiService`, `dataService`, etc.)
- `src/types` - interfaces et types TypeScript
- `docs/piliers_tree.txt` - arborescence détaillée des 25 piliers
- `docs/ecdm/` - documentation du catalogue ECDM

## Système de modules

- **ModuleRenderer** : navigation pilier/module/sous-module (`src/components/ModuleRenderer.tsx`)
- **PillarInsights** : KPIs et informations spécifiques à un module (`src/components/PillarInsights.tsx`)
- **TreeView** : diagrammes d'architecture (`src/components/ui/TreeView.tsx`)
- **Panneau de recherche globale** : Ctrl/Cmd+K

## State Management

- Store Zustand (`src/lib/store.ts`), `useAppState()` pour l'état global, `useCopilot()` pour l'IA

## Style

- Tailwind CSS 4, couleurs `bg-brain-*`/`text-brain-*`, variables CSS dans `src/index.css`, mobile-first

## Variables d'environnement

- `GEMINI_API_KEY` : fonctionnalités IA
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_NAME` : PostgreSQL local

## Notes importantes

- Backend NestJS + PostgreSQL + TypeORM = seule couche de données (aucune couche mockée/historique)
- Modèle de données unifié via `packages/core-domain` (ECDM v1) — voir règle de gouvernance ci-dessus
- Architecture modulaire par piliers, chaque pilier = modules + sous-modules

## Licence

Logiciel propriétaire. Tous droits réservés.

## Contact

Équipe de développement BrainOS.
