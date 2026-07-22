# 06-eqms-test-strategy.md

# Stratégie de Test eQMS

Ce document définit la stratégie de test complète pour le module eQMS du BrainERPOS, couvrant les tests unitaires, d'intégration, spécifiques au CTI, de performance, de sécurité et de conformité réglementaire.

## Objectifs de Test

1. **Vérification de la conformité** : S'assurer que l'eQMS répond aux exigences ISO 9001, IATF 16949 et autres normes applicables
2. **Validation fonctionnelle** : Confirmer que toutes les fonctionnalités métier répondent aux spécifications
3. **Assurance de la qualité** : Détecter et éliminer les défauts tôt dans le cycle de développement
4. **Vérification de la performance** : S'assurer que le système répond aux exigences de performance sous charge
5. **Validation de la sécurité** : Confirmer la protection contre les vulnérabilités et les accès non autorisés
6. **Assurance de la traçabilité** : Vérifier la complétude de la traçabilité des exigences aux tests
7. **Validation de l'ergonomie** : Confirmer l'utilisabilité du système par les utilisateurs cibles

## Périmètre de Test

### Composants Testés
- Tous les services backend NestJS (modules qualité, inspection, LIMS, SPC, NC/CAPA, etc.)
- Toutes les entités TypeORM et leurs relations
- Tous les DTOs, validateurs et logique de métier
- Tous les contrôleurs API et leurs endpoints
- Tous les services métier (factory, resolver, workflow, notification)
- Tous les événements et gestionnaires de publication/souscription
- Tous les algorithmes de calcul (SPC, capacité de procédé, prédiction qualité)
- Toutes les intégrations inter-modules
- Toutes les interfaces utilisateur critiques (tableaux de bord, formulaires de saisie)
- Toutes les fonctionnalités de notification et d'alerte
- Toutes les fonctionnalités de reporting et d'export
- Toutes les fonctionnalités d'administration et de configuration

### Types de Tests
- Tests unitaires
- Tests d'intégration
- Tests de bout en bout (e2e)
- Tests de performance et de charge
- Tests de sécurité
- Tests de conformité réglementaire
- Tests d'accessibilité
- Tests d'utilisabilité
- Tests de récupération après sinistre
- Tests de compatibilité

## Approche de Test

### Stratégie de Test par Niveau

#### Niveau 1: Tests Unitaires
- **Objectif** : Valider le comportement individuel des unités de code (fonctions, classes, méthodes)
- **Couverture cible** : ≥ 90% pour les modules critiques, ≥ 80% pour les autres
- **Outils** : Jest, @nestjs/testing
- **Fréquence** : À chaque commit (intégré dans le pipeline CI)
- **Responsabilité** : Développeurs

#### Niveau 2: Tests d'Intégration
- **Objectif** : Valider l'interaction entre composants intégrés
- **Portée** : 
  - Services → Référentiels (base de données)
  - Contrôleurs → Services
  - Services → Services (appels inter-services)
  - Gestionnaires d'événements → Services métier
  - Services → Services externes (mockés)
- **Outils** : Jest, SuperTest, Testcontainers (pour PostgreSQL/Redis)
- **Fréquence** : À chaque pull request
- **Responsabilité** : Développeurs/QA

#### Niveau 3: Tests de Système (Bout en Bout)
- **Objectif** : Valider les flux métier complets du point de vue utilisateur
- **Scénarios couverts** :
  - Flux complet d'inspection (création → exécution → résultats → décision NC/CAPA)
  - Flux LIMS complet (réception échantillon → analyse → résultats → mise à jour inspection)
  - Flux SPC (mesure → mise à jour carte → détection hors contrôle → alerte)
  - Flux NC complet (détection → enquête → cause racine → action → vérification)
  - Flux CAPA complet (création → approbation → implémentation → vérification efficacité)
  - Flux de notification (déclenchement → traitement → livraison)
  - Flux de reporting (génération → distribution → archivage)
- **Outils** : Playwright, Cypress
- **Fréquence** : Nightly dans l'environnement de staging
- **Responsabilité** : Équipe QA dédiée

#### Niveau 4: Tests d'Acceptation Utilisateur (UAT)
- **Objectif** : Valider que le système répond aux besoins métier réels
- **Participants** : Utilisateurs clés (qualité, production, laboratoire, maintenance)
- **Méthodologie** : Scénarios basés sur des cas d'utilisation réels
- **Environnement** : Pré-production avec données réalistes anonymisées
- **Fréquence** : Avant chaque release majeure
- **Responsabilité** : Business Analysts + Utilisateurs Métiers

### Spécificités du Test CTI (Class Table Inheritance)

Les tests CTI nécessitent une attention particulière pour valider l'implémentation de l'héritage:

#### 1. Tests de Création d'Entités
- Vérifier que la création d'une entité de base crée correctement l'enregistrement dans la table base
- Vérifier que la création d'une entité fille crée des enregistrements dans les tables base ET fille
- Valider que la PK de l'entité fille est bien une FK vers la table base
- Tester la contrainte d'unicité de la relation un-à-un

#### 2. Tests de Lecture Polymorphe
- Vérifier que la lecture d'une entité de base retourne le bon type concret basé sur le discriminateur
- Valider que les relations spécifiques au type sont correctement chargées
- Tester les scénarios de chargement différé vs eager loading
- Valider les performances des requêtes polymorphes

#### 3. Tests de Mise à Jour
- Vérifier que les mises à jour des attributs communs affectent la table base
- Vérifier que les mises à jour des attributs spécifiques affectent la bonne table fille
- Valider la conservation du discriminateur lors des mises à jour
- Tester les scénarios de conversion de type (si applicable)

#### 4. Tests de Suppression
- Vérifier la suppression en cascade appropriée (si configurée)
- Valider la suppression sécurisée (soft delete) si implémentée
- Tester les contraintes d'intégrité référentielle

#### 5. Tests de Requêtes Spécifiques
- Valider les requêtes filtrant par type de discriminateur
- Tester les jointures avec spécification de type
- Valider les agrégations par type d'entité

#### Exemple de Structure de Test CTI

```
describe('InspectionOrder CTI', () => {
  describe('Creation', () => {
    it('should create base record when creating base entity', async () => { ... });
    it('should create base and child records when creating IncomingInspection', async () => { ... });
    it('should set foreign key correctly from child to parent', async () => { ... });
  });
  
  describe('Polymorphic Retrieval', () => {
    it('should return correct concrete type based on discriminator', async () => { ... });
    it('should load specific relations when querying with type', async () => { ... });
    it('should return base entity when type not recognized', async () => { ... });
  });
  
  describe('Updating', () => {
    it('should update common attributes in base table', async () => { ... });
    it('should update specific attributes in correct child table', async () => { ... });
    it('should preserve discriminator during update', async () => { ... });
  });
});
```

## Approche de Test par Fonctionnalité

### 1. Tests du Module Foundation
Tests couvrant:
- Gestion de la configuration
- Contrôle des documents
- Gestion des utilisateurs et rôles
- Audit et traçabilité
- Paramètres système

### 2. Tests du Module Planification
Tests couvrant:
- Création et gestion des plans de qualité
- Définition des points de contrôle
- Gestion des fréquences d'échantillonnage
- Génération des plannings de contrôle
- Allocation des ressources
- Gestion des écarts de planification

### 3. Tests du Module Inspection
Tests couvrant:
- Création et programmation des inspections
- Exécution et saisie des résultats
- Gestion des différents types d'inspection (entrée, en processus, finale, expédition)
- Détection des résultats hors spécification
- Gestion de la quarantaine
- Libération des lots
- Intégration avec la production MES
- Inspections externalisées

### 4. Tests du Module LIMS
Tests couvrant:
- Réception et enregistrement des échantillons
- Assignment aux techniciens
- Exécution des analyses
- Saisie et validation des résultats
- Gestion des résultats hors spécification
- Gestion des ré-analyses
- Échantillons contaminés ou invalides
- Intégration avec les inspections

### 5. Tests du Module SPC
Tests couvrant:
- Création des cartes de contrôle
- Calcul des limites de contrôle
- Détection des points hors contrôle (règles WE)
- Détection des tendances
- Calcul de la capacité de procédé (Cp, Cpk, Pp, Ppk)
- Mise à jour automatique des limites
- Intégration avec les données de production
- Gestion des pertes de communication avec instruments

### 6. Tests du Module NC
Tests couvrant:
- Enregistrement des non-conformités
- Classification par type, sévérité, probabilité
- Gestion de la quarantaine
- Assignation aux équipes d'enquête
- Analyse des causes racines (5 pourquoi, Ishikawa)
- Prise de décision de disposition
- Génération des demandes d'action corrective
- Gestion des NC fournisseur et client
- Seuils d'alerte de taux de NC
- Réévaluation des plans de contrôle post-NC

### 7. Tests du Module CAPA
Tests couvrant:
- Création des actions correctives et préventives
- Processus d'approbation
- Suivi de l'implémentation
- Vérification de l'efficacité
- Gestion des extensions de délai
- Annulation/suspension des actions
- Mesure de l'efficacité des actions
- Alertes de retard

### 8. Tests du Module Risque & FMEA
Tests couvrant:
- Création et gestion des FMEA
- Ajout des modes de défaillance, effets, causes
- Calcul du RPN (Gravité × Occurrence × Détectabilité)
- Seuils d'action pour RPN élevé
- Assignation des actions de réduction de risque
- Révision périodique des FMEA
- Identification des risques hors FMEA

### 9. Tests du Module Qualité Fournisseur
Tests couvrant:
- Évaluations initiales des fournisseurs
- Suivi de la performance qualité
- Gestion des certificats d'analyse
- Détection des non-conformités fournisseur
- Planification et réalisation des audits fournisseurs
- Gestion des plans d'amélioration fournisseur
- Portail fournisseur qualité

### 10. Tests du Module Qualité Client
Tests couvrant:
- Gestion des réclamations clients
- Enquêtes de satisfaction
- Analyse des produits retournés
- Suivi des actions correctives liées aux réclamations
- Escalade selon gravité et impact
- Indicateurs de satisfaction (NPS, CSAT)

### 11. Tests du Module Audit
Tests couvrant:
- Planification des audits qualité
- Création des programmes d'audit
- Exécution des audits
- Génération des rapports de constatations
- Suivi des plans d'action
- Vérification de la clôture des actions
- Gestion des écarts de plan d'action

### 12. Tests du Module Conformité
Tests couvrant:
- Veille réglementaire
- Évaluations de conformité
- Identification des écarts de conformité
- Génération des certificats de conformité
- Gestion des renouvellements de certificat
- Analyse d'impact des changements réglementaires
- Traçabilité aux exigences réglementaires

### 13. Tests du Module Traceabilité
Tests couvrant:
- Traçabilité amont/aval des lots
- Analyse d'impact (where-used, where-used)
- Alertes de propagation de non-conformité
- Demandes de traçabilité pour rappels produits
- Enregistrement des événements de traçabilité
- Création de liens de traçabilité entre entités
- Gestion de la complexité de traçabilité

### 14. Tests du Module IA
Tests couvrant:
- Génération des prédictions de qualité
- Détection d'anomalies de procédé
- Recommandations d'ajustement de processus
- Ré-entraînement des modèles
- Détection de dérive de données
- Validation de la performance des modèles
- Génération des recommandations

### 15. Tests du Module d'Étalonnage
Tests couvrant:
- Gestion des échéances d'étalonnage
- Exécution et suivi des étalonnages
- Gestion des résultats hors tolérance
- Génération des certificats d'étalonnage
- Intégration avec la maintenance préventive
- Alertes d'échéance imminente

### 16. Tests des Modules de Qualification et Validation
Tests couvrant:
- Gestion des protocoles IQ/OQ/PQ
- Exécution des phases de qualification
- Évaluation des résultats de qualification
- Génération des certificats de qualification
- Gestion des protocoles de validation
- Exécution des étapes de validation
- Analyse des résultats de validation
- Génération des rapports de validation

### 17. Tests du Module de Gestion du Changement
Tests couvrant:
- Soumission des demandes de changement
- Évaluation d'impact
- Processus d'approbation (CCB)
- Suivi de l'implémentation
- Vérification de la réussite de l'implémentation
- Gestion des retards
- Clôture des changements

### 18. Tests du Module d'Analytics et Reporting
Tests couvrant:
- Génération des rapports programmés
- Calcul des KPI et métriques
- Détection des écarts de tendance
- Alertes de seuil KPI
- Gestion des échecs de génération
- Export vers différents formats
- Intégration avec les systèmes BI

### 19. Tests du Module Système
Tests couvrant:
- Monitoring de la performance
- Alertes d'utilisation des ressources
- Gestion des tâches d'arrière-plan
- Mises à jour de sécurité
- Gestion des incidents
- Disponibilité et résilience
- Scalabilité

## Stratégie de Données de Test

### Principes
- **Isolation** : Chaque test exécute dans sa propre transaction de base de données qui est rollbacked
- **Réalisme** : Les données de test représentent des scénarios réels d'usine AAC
- **Variabilité** : Couverture des cas normaux, limites et d'erreur
- **Consistance** : Utilisation de factories et de builders pour création cohérente d'objets liés
- **Masquage** : Données de test anonymisées lorsqu'elles représentent des données sensibles

### Approches de Génération de Données
1. **Factories** : Utilisation de @nestjs/testing et de librairies comme Factory.ts ou @mikro-orm/seeder
2. **Builders** : Pour création d'objets complexes avec relations
3. **Fixtures** : Jeux de données prédéfinis pour scénarios spécifiques
4. **Data Seeding** : Pour initialiser les environnements de test avec des référentiels communs

### Jeux de Données de Test
- **Données de Référence** : Unités de mesure, grades de matériaux, types d'inspection, etc.
- **Scénarios de Base** : Opérations normales sans anomalies
- **Scénarios de Limite** : Valeurs aux frontières des spécifications
- **Scénarios d'Erreur** : Conditions d'échec, entrées invalides
- **Scénarios de Charge** : Grandes quantités de données pour tests de performance
- **Scénarios de Régression** : Jeux de données spécifiques pour reproduire des bugs connus
- **Scénarios de Conformité** : Données alignées avec exigences réglementaires spécifiques

### Gestion des Données Sensibles
- **Masquage dynamique** : Remplacement des PII et données sensibles pendant les tests
- **Environnements séparés** : Données de test jamais mélangées avec données de production
- **Consentement et anonymisation** : Lorsque des données réelles sont utilisées (avec autorisation)

## Environnements de Test

### 1. Environnement de Développement Local
- **Objectif** : Tests unitaires et d'intégration rapides pendant le développement
- **Caractéristiques** : 
  - Base de données SQLite en mémoire ou PostgreSQL local
  - Services externes mockés
  - Déploiement rapide
  - Utilisé par les développeurs en temps réel

### 2. Environnement d'Intégration Continue (CI)
- **Objectif** : Validation automatisée à chaque commit et pull request
- **Caractéristiques** :
  - Base de données PostgreSQL isolée
  - Services externes mockés ou simulés
  - Exécution complète de la suite de tests
  - Génération de rapports de couverture
  - Blocage du merge si seuil de couverture non atteint
  - Déploiement dans environnement éphémère

### 3. Environnement de Test Fonctionnel (QA)
- **Objectif** : Tests d'intégration et de système approfondis
- **Caractéristiques** :
  - Base de données PostgreSQL dédiée
  - Services externes répliqués (versions simulées)
  - Jeux de données de test enrichis
  - Exécution des tests de performance légers
  - Validation des intégrations inter-services
  - Utilisé par l'équipe QA

### 4. Environnement de Staging / Pré-Production
- **Objectif** : Tests de bout en bout, UAT, validation de performance
- **Caractéristiques** :
  - Architecture identique à la production (sauf échelle)
  - Base de données avec données réalistes anonymisées
  - Intégration avec vraies versions des services externes (sandbox)
  - Exécution des scénarios UAT
  - Tests de charge et de performance
  - Validation de la sécurité
  - Utilisé par QA, Business Analysts et utilisateurs métiers

### 5. Environnement de Production
- **Objectif** : Surveillance post-déploiement et tests en production limitée
- **Caractéristiques** :
  - Monitoring en temps réel
  - Tests de fumée post-déploiement
  - Feature flags pour déploiements progressifs
  - Tests A/B pour fonctionnalités expérimentales
  - Rollback automatique en cas de détection d'anomalie

## Exigences d'Environnement de Test

### Infrastructure
- **Base de données** : PostgreSQL 14+ avec mêmes paramètres que production
- **Cache** : Redis 7+ pour tests de mise en cache
- **Message Queue** : RabbitMQ 3.12+ pour tests d'événements asynchrones
- **Stockage** : MinIO ou similaire pour tests de stockage d'objets
- **Recherche** : Elasticsearch pour tests de fonctionnalités de recherche
- **Monitoring** : Stack Prometheus/Grafana pour validation des métriques

### Outils et Frameworks
- **Backend** : NestJS 10, TypeORM 0.3, TypeScript 5
- **Testing** : Jest 29+, @nestjs/testing, SuperTest 6
- **E2E** : Playwright 1.40+, Cypress 13+
- **Mobile** : Appium (si applicable)
- **Performance** : k6 0.50+, Artillery 2.0+
- **Sécurité** : OWASP ZAP, Snyk, SonarQube
- **CI/CD** : GitHub Actions, Docker, Kubernetes
- **Gestion de configurations** : ConfigMaps, Secrets (simulés en test)

### Données de Test
- **Volume minimum** : 
  - 10,000+ ordres de fabrication
  - 50,000+ lots de matériaux
  - 100,000+ enregistrements d'inspection
  - 10,000+ échantillons LIMS
  - 1,000+ dossiers NC
  - 500+ dossiers CAPA
  - 10,000+ points de mesure SPC
  - 1,000+ notifications
- **Actualisation** : Rafraîchissement hebdomadaire des jeux de données
- **Sauvegarde** : Snapshots quotidiens pour restauration rapide

## Types de Spécifiques de Tests

### 1. Tests de Performance et de Charge
#### Objectifs
- Valider les temps de réponse sous charge normale et de pointe
- Identifier les goulets d'étranglement dans l'architecture
- Vérifier la scalabilité horizontale
- S'assurer que le système répond aux SLAs définis

#### Scénarios de Test
- **Charge de base** : Utilisation normale quotidienne (100 utilisateurs concurrents)
- **Heure de pointe** : Activité maximale (500 utilisateurs concurrents)
- **Scénario de lot** : Traitement par batch important (ex: génération de rapports nocturne)
- **Pic de trafic** : Augmentation soudaine de charge (2x normale pendant 5 min)
- **Test de trempage** : Charge constante modérée sur période étendue (24h)
- **Test de pointe** : Burst extrême pour valider limites du système

#### Métriques Clés
- Temps de réponse moyen, p95, p99
- Débit (requêtes/secondes, transactions/secondes)
- Utilisation CPU, mémoire, I/O disque, réseau
- Temps de réponse de la base de données
- Longueur des files d'attente de messages
- Taux d'erreur (5xx, exceptions non gérées)
- disponibilité du système

#### Outils
- **k6** : Tests de charge scriptables en JavaScript
- **Artillery** : Framework de test de charge moderne
- **Gatling** : Pour scénarios complexes (si nécessaire)
- **Prometheus + Grafana** : Monitoring et visualisation des métriques

#### Seuils de Performance Acceptables
- API REST GET simple : < 100ms p95
- API REST POST complexe : < 500ms p95
- Requête de base de données simple : < 50ms
- Requête de base de données complexe avec jointures : < 200ms
- Génération de rapport standard : < 5 secondes
- Notification critique envoyée : < 2 secondes
- Recherche dans catalogue : < 300ms

### 2. Tests de Sécurité
#### Objectifs
- Identifier et corriger les vulnérabilités de sécurité
- Valider l'implémentation des contrôles de sécurité
- S'assurer de la conformité aux standards de sécurité
- Protéger contre les accès non autorisés et les fuites de données

#### Types de Tests
- **Analyse de code statique (SAST)** : SonarQube, Snyk pour détecter les vulnérabilités dans le code source
- **Analyse de dépendance** : Snyk, npm audit pour détecter les vulnérabilités dans les dépendances
- **Tests de pénétration dynamique (DAST)** : OWASP ZAP, Burp Suite pour tester l'application déployée
- **Tests d'authentification et d'autorisation** : Vérification des mécanismes de connexion, gestion des sessions, contrôle d'accès basé sur les rôles (RBAC)
- **Tests de validation d'entrée** : Vérification de la protection contre injections (SQL, NoSQL, XSS, CSRF)
- **Tests de configuration de sécurité** : Vérification des en-têtes de sécurité CSP, HSTS, etc.
- **Tests de chiffrement** : Vérification du chiffrement des données au repos et en transit
- **Tests de journalisation et de monitoring** : Vérification que les événements de sécurité sont correctement journalisés

#### Cadence
- **SAST** : À chaque pull request
- **DAST** : Hebdomadaire sur environnement de staging
- **Tests de pénétration manuels** : Trimestriels par équipe spécialisée
- **Analyse de dépendance** : Hebdomadaire

#### Standards de Référence
- OWASP Top 10
- SANS 25
- CWE Top 25
- ISO 27001/27002
- NIST Cybersecurity Framework

### 3. Tests de Conformité Réglementaire
#### Objectifs
- S'assurer que l'eQMS respecte les exigences réglementaires applicables
- Valider la traçabilité et l'auditabilité des opérations
- Confirmer l'implémentation des contrôles spécifiques aux normes
- Préparer l'organisation aux audits réglementaires

#### Normes Cibles
- **ISO 9001:2015** : Système de gestion de la qualité
- **IATF 16949:2016** : Système de gestion de la qualité pour l'industrie automobile
- **ISO 14001:2015** : Système de gestion environnementale (si applicable)
- **ISO 45001:2018** : Système de gestion de la santé et sécurité au travail (si applicable)
- **21 CFR Part 11** : Registres et signatures électroniques (si applicable aux dispositifs médicaux)
- **GMP** : Bonnes pratiques de fabrication (si applicable)
- **GLP** : Bonnes pratiques de laboratoire (si applicable)

#### Domaines de Test
- **Contrôle des documents** : Gestion, approbation, distribution, révision
- **Enregistrement des données** : Intégrité, traçabilité, conservation, récupération
- **Contrôle des changements** : Évaluation d'impact, approbation, mise en œuvre, vérification
- **Actions correctives et préventives** : Processus complet de détection à vérification d'efficacité
- **Audit interne** : Planification, réalisation, reporting, suivi
- **Gestion des fournisseurs** : Évaluation, sélection, suivi, réévaluation
- **Formation et compétence** : Gestion des formations, suivi des compétences, évaluation de l'efficacité
- **Gestion de l'équipement** : Étalonnage, maintenance, historique, traçabilité
- **Gestion de l'environnement** : Contrôles, monitoring, plans d'urgence (si applicable)
- **Sécurité des produits** : Évaluation des risques, essais, traçabilité, rappel
- **Échantillonnage et essais** : Méthodes validées, calibration des équipements, contrôle de l'environnement
- **Stabilité et durée de conservation** : Études de stabilité, protocoles, évaluations
- **Gestion des plaintes** : Réception, enquête, réponse, suivi, analyse de tendance
- **Gestion des rappels de produits** : Décision, exécution, communication, efficacité
- **Gestion des données électroniques** : Intégrité, confidentialité, disponibilité, traçabilité (21 CFR Part 11)
- **Validation des systèmes informatiques** : Qualification, périodicité de la réévaluation, gestion des changements

#### Approche de Test
- **Matrice de traçabilité** : Lier chaque exigence réglementaire à un ou plusieurs cas de test
- **Preuves de conformité** : Générer des artefacts documentés lors des tests (logs, rapports, captures d'écran)
- **Revue par des experts** : Faire valider les scénarios de test par des experts en conformité
- **Simulation d'audit** : Conduire des exercices d'audit interne selon les règles des organismes certificateurs
- **Documentation** : Maintenir à jour les spécifications, les procédures de test, et les rapports de résultat

### 4. Tests d'Accessibilité
#### Objectifs
- S'assurer que le système est utilisable par des personnes en situation de handicap
- Se conformer aux standards d'accessibilité internationaux
- Améliorer l'expérience utilisateur pour tous

#### Standards Cibles
- **WCAG 2.1 Niveau AA** : Standard d'accessibilité web international
- **Section 508** : Standard américain d'accessibilité pour les technologies électroniques
- **EN 301 549** : Standard européen d'accessibilité pour les TIC

#### Domaines de Test
- **Perceptible** : 
  - Alternatives textuelles pour le contenu non textuel
  - Sous-titres et transcription pour le contenu multimédia
  - Adaptabilité du contenu (présentation différente sans perte d'information)
  - Distinguabilité (contraste, redimensionnement du texte, contrôle du fond sonore)
- **Opérable** :
  - Accessibilité clavier
  - Temps suffisant pour lire et utiliser le contenu
  - Prévention des crises (pas de contenu clignotant dangereux)
  - Navigabilité (méthodes pour aider les utilisateurs à naviguer, trouver du contenu, déterminer où ils sont)
- **Compréhensible** :
  - Lisibilité et compréhensibilité du texte
  - Prédictibilité des mécanismes de fonctionnement
  - Aide à la saisie et à la correction
- **Robuste** :
  - Compatibilité avec les technologies d'assistance actuelles et futures

#### Outils de Test
- **Outils automatisés** : axe-core, Lighthouse, pa11y
- **Tests manuels** : Navigation au clavier uniquement, utilisation de lecteurs d'écran (NVDA, JAWS, VoiceOver)
- **Tests avec utilisateurs** : Sessions avec personnes en situation de handicap
- **Extensions de navigateur** : WAVE, Axe, Lighthouse

### 5. Tests d'Utilisabilité
#### Objectifs
- Évaluer dans quelle mesure le système peut être utilisé par des utilisateurs spéciaux pour atteindre des objectifs spécifiques avec efficacité, efficience et satisfaction dans un contexte d'utilisation donné
- Identifier les problèmes d'utilisabilité
- Recueillir des recommandations pour l'amélioration

#### Méthodologie
- **Tests avec utilisateurs réels** : Participants représentatifs des rôles utilisateurs cibles
- **Scénarios de tâches** : Basés sur des workflows réels du système
- **Mesure des métriques** : 
  - Taux de réussite des tâches
  - Temps moyen de réalisation
  - Nombre d'erreurs
  - Subjective satisfaction (échelles SUS, NASA-TLX, etc.)
  - Nombre d. - **Observation comportementale** : Hesitation, retours en arrière, erreurs de séquence

#### Cadence
- **Formative** : Durant le développement (maquettes, prototypes)
- **Summative** : Avant release majeure (version quasi-finale)
- **Post-livraison** : Après déploiement pour valider en contexte réel