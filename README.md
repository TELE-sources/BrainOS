# BrainERPOS / BrainOS - Enterprise Resource Planning System

An industrial-grade ERP system for AAC (Autoclaved Aerated Concrete) manufacturing, inspired by SAP QM and Siemens Opcenter Quality, with a comprehensive Enterprise Quality Management System (eQMS).

## 🏗️ Architecture Overview

BrainERPOS follows a modular architecture with 25 functional pillars organized into packages:

- **Core Domain** (`packages/core-domain`) - Shared entities and business logic
- **Shared Types** (`packages/shared-types`) - Common DTOs, enums, interfaces
- **Feature Modules** - Each pillar as a separate package (QUAL, PROD, LOGI, etc.)

## 🛠️ Development Environment Setup

### Prerequisites

- Node.js >= 20.0.0
- Docker & Docker Compose
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brainos
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm ci

   # Install backend dependencies
   cd apps/api
   npm ci
   cd ../..

   # Install frontend dependencies
   cd apps/web
   npm ci
   cd ../..
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   cp apps/api/.env.example apps/api/.env
   # Edit apps/api/.env if needed
   ```

4. **Start the development stack**
   ```bash
   # Start infrastructure services (PostgreSQL, Redis, TimescaleDB)
   docker-compose up -d

   # Run database migrations (if using TypeORM migrations)
   # npx typeorm migration:run

   # Start the backend API
   cd apps/api
   npm run start:dev
   # In another terminal:
   cd apps/web
   npm run dev
   ```

### Development Commands

#### Backend (`apps/api`)
```bash
npm run start:dev    # Start in watch mode
npm run build        # Build for production
npm start            # Start built application
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:cov     # Run tests with coverage
npm run typecheck    # TypeScript type checking
```

#### Frontend (`apps/web`)
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run serve        # Preview production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run test         # Run Vitest tests
npm run test:coverage # Run tests with coverage
npm run typecheck    # TypeScript type checking
```

### Project Structure
```
brainos/
├── apps/
│   ├── api/            # NestJS backend
│   └── web/            # React frontend
├── packages/
│   ├── core-domain/    # Shared entities and business logic
│   ├── shared-types/   # Common DTOs, enums, interfaces
│   ├── QUAL/           # Quality Management (eQMS) - Focus of this setup
│   ├── PROD/           # Production & MES
│   ├── LOGI/           # Logistics & Supply Chain
│   └── ... (22 more pillars)
├── docker-compose.yml  # Development infrastructure
├── .env.example        # Environment variables template
└README.md              # This file
```

## 🧪 Testing Strategy

- **Unit Tests**: Jest (backend), Vitest (frontend)
- **Integration Tests**: Supertest (API), React Testing Library (components)
- **End-to-End Tests**: Cypress (planned)
- **Performance Tests**: k6 (planned)
- **Test Coverage Target**: 80%+ for critical paths

## 📦 Deployment

The system is designed for deployment via:
- Docker Compose (development/staging)
- Kubernetes (production)
- Helm charts (available in `deploy/` directory)

CI/CD pipelines are configured via GitHub Actions (see `.github/workflows/`).

## 🔧 Key Technologies

### Backend
- **Node.js** ^20.0.0
- **NestJS** ^10.0.0
- **TypeORM** ^0.3.0
- **PostgreSQL** ^14.0.0
- **Redis** ^7.0.0
- **TimescaleDB** (for time-series data)

### Frontend
- **React** ^18.0.0
- **TypeScript** ^5.0.0
- **Material-UI** ^6.0.0
- **React Query** ^4.0.0
- **Zustand** ^4.0.0 (state management)

### DevOps
- **Docker** & **Docker Compose**
- **GitHub Actions** for CI/CD
- **Kubernetes** manifests for production

## 📚 Documentation

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Detailed architecture decisions
- [API_REFERENCE.md](./docs/API_REFERENCE.md) - Auto-generated API docs
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Deployment guides
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- Each package contains its own README with specific details

## 🎯 Current Focus: eQMS Module

The Enterprise Quality Management System (QUAL) module has been thoroughly designed and documented, featuring:

- **Complete CTI Implementation**: Class Table Inheritance pattern for all quality entities
- **All 25 Functional Pillars** structured as independent packages
- **Factory & Resolver Services** for polymorphic data handling
- **Full API Contract** with DTOs, validation, and error handling
- **Frontend Components** ready for implementation

See `/docs/eqms/` for detailed eQMS documentation.

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is proprietary software. All rights reserved.

---
*BrainERPOS - Built for industrial excellence*
