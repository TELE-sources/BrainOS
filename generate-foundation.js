const fs = require('fs');
const path = require('path');

const foundationEntities = [
  {
    name: 'QualityConfig',
    tableName: 'quality_config',
    fields: [
      { name: 'code', type: 'string', unique: true, length: 50 },
      { name: 'name', type: 'string', length: 200 },
      { name: 'description', type: 'string', nullable: true },
      { name: 'parameters', type: 'jsonb' },
      { name: 'integrations', type: 'jsonb' },
      { name: 'version', type: 'string', length: 20 },
      { name: 'effectiveFrom', type: Date },
      { name: 'effectiveTo', type: Date, nullable: true }
    ]
  },
  {
    name: 'QualityRule',
    tableName: 'quality_rule',
    fields: [
      { name: 'code', type: 'string', unique: true, length: 50 },
      { name: 'name', type: 'string', length: 200 },
      { name: 'description', type: 'string', nullable: true },
      { name: 'ruleType', type: 'string' }, // Will be enum
      { name: 'condition', type: 'jsonb' },
      { name: 'action', type: 'jsonb' },
      { name: 'priority', type: 'number', default: 0 }
    ],
    relations: [
      { type: 'ManyToOne', entity: 'QualityConfig', name: 'config', joinColumn: { name: 'config_id' } }
    ]
  },
  {
    name: 'QualityThreshold',
    tableName: 'quality_threshold',
    fields: [
      { name: 'code', type: 'string', unique: true, length: 50 },
      { name: 'name', type: 'string', length: 200 },
      { name: 'description', type: 'string', nullable: true },
      { name: 'metric', type: 'string', length: 100 },
      { name: 'operator', type: 'string' }, // Will be enum
      { name: 'value', type: 'number' },
      { name: 'unit', type: 'string', length: 50 },
      { name: 'enabled', type: 'boolean', default: true }
    ],
    relations: [
      { type: 'ManyToOne', entity: 'QualityConfig', name: 'config', joinColumn: { name: 'config_id' } }
    ]
  },
  {
    name: 'QualityMasterData',
    tableName: 'quality_master_data',
    fields: [
      { name: 'code', type: 'string', unique: true, length: 50 },
      { name: 'name', type: 'string', length: 200 },
      { name: 'description', type: 'string', nullable: true },
      { name: 'category', type: 'string' }, // Will be enum
      { name: 'value', type: 'string' },
      { name: 'parentCode', type: 'string', nullable: true },
      { name: 'sortOrder', type: 'number', default: 0 }
    ]
  },
  {
    name: 'QualityOrganization',
    tableName: 'quality_organization',
    fields: [
      { name: 'code', type: 'string', unique: true, length: 50 },
      { name: 'name', type: 'string', length: 200 },
      { name: 'description', type: 'string', nullable: true },
      { name: 'address', type: 'string' },
      { name: 'city', type: 'string' },
      { name: 'postalCode', type: 'string', length: 20 },
      { name: 'country', type: 'string', length: 2 },
      { name: 'phone', type: 'string', length: 20 },
      { name: 'email', type: 'string', length: 100 },
      { name: 'isActive', type: 'boolean', default: true }
    ]
  },
  {
    name: 'ReferenceStandard',
    tableName: 'reference_standard',
    fields: [
      { name: 'code', type: 'string', unique: true, length: 50 },
      { name: 'name', type: 'string', length: 200 },
      { name: 'description', type: 'string', nullable: true },
      { name: 'standardType', type: 'string' }, // Will be enum
      { name: 'version', type: 'string', length: 20 },
      { name: 'issuedBy', type: 'string', length: 100 },
      { name: 'issueDate', type: Date },
      { name: 'expiryDate', type: Date, nullable: true },
      { name: 'status', type: 'string' }, // Will be enum
      { name: 'url', type: 'string' }
    ]
  }
];

const enums = [
  { name: 'QualityConfigStatus', values: ['DRAFT', 'IN_REVIEW', 'APPROVED', 'ACTIVE', 'INACTIVE', 'OBSOLETE'] },
  { name: 'RuleType', values: ['VALIDATION', 'CALCULATION', 'NOTIFICATION', 'ESCALATION'] },
  { name: 'RuleOperator', values: ['EQ', 'NEQ', 'LT', 'LTE', 'GT', 'GTE', 'IN', 'NOT_IN', 'CONTAINS', 'MATCHES'] },
  { name: 'DataCategory', values: ['MATERIAL', 'PROCESS', 'EQUIPMENT', 'SUPPLIER', 'CUSTOMER'] },
  { name: 'StandardType', values: ['ISO', 'ASTM', 'EN', 'BS', 'JIS', 'INTERNAL'] },
  { name: 'Status', values: ['ACTIVE', 'SUPERSEDED', 'OBSOLETE', 'UNDER_REVIEW'] },
  { name: 'ComparisonOperator', values: ['EQ', 'NEQ', 'LT', 'LTE', 'GT', 'GTE', 'BETWEEN', 'LIKE'] }
];

function generateEntityFile(entity) {
  const relationsImport = entity.relations ? 
    entity.relations.map(r => `import { ${r.entity} } from './${r.entity.name}.entity';`).join('\n') : '';
  
  const fieldsContent = entity.fields.map(field => {
    let decorators = [];
    if (field.unique) decorators.push('@Column({ unique: true })');
    else if (field.length) decorators.push(`@Column({ length: ${field.length} })`);
    else if (field.type === 'Date') decorators.push('@Column({ type: \\'timestamp\\' })');
    else if (field.type === 'jsonb') decorators.push('@Column({ type: \\'jsonb\\' })');
    else if (field.type === 'boolean') decorators.push('@Column({ type: \\'boolean\\' })');
    else if (field.type === 'number') decorators.push('@Column({ type: \\'numeric\\' })');
    else decorators.push('@Column()');
    
    if (field.default !== undefined) {
      const decoratorIndex = decorators.length - 1;
      if (decoratorIndex >= 0) {
        const decorator = decorators[decoratorIndex];
        if (decorator.includes('{')) {
          decorators[decoratorIndex] = decorator.replace('})', `, default: ${JSON.stringify(field.default)}})`);
        } else {
          decorators[decoratorIndex] = `@Column({ default: ${JSON.stringify(field.default)} })`;
        }
      }
    }
    
    if (field.nullable) {
      const decoratorIndex = decorators.length - 1;
      if (decoratorIndex >= 0) {
        const decorator = decorators[decoratorIndex];
        if (decorator.includes('{')) {
          decorators[decoratorIndex] = decorator.replace('})', `, nullable: true})`);
        } else {
          decorators[decoratorIndex] = `@Column({ nullable: true })`;
        }
      }
    }
    
    const decorator = decorators.length > 0 ? `${decorators.join('\\n')}\n  ` : '  ';
    return `${decorator}${field.name}: ${field.type === 'string' ? 'string' : field.type === 'boolean' ? 'boolean' : field.type === 'number' ? 'number' : 'Date'};`;
  }).join('\n  ');
  
  const relationsContent = entity.relations ? 
    entity.relations.map(rel => {
      const opts = [];
      if (rel.joinColumn) opts.push(`{ name: '${rel.joinColumn.name}' }`);
      return `  @${rel.type}(${rel.entity.name => rel.entity}, { ${opts.join(', ')} })\n  ${rel.name}: ${rel.entity.name};`;
    }).join('\n\n') : '';
  
  const content = `import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Index,
  Unique 
} from 'typeorm';

${relationsImport}

@Entity('${entity.tableName}')
export class ${entity.name} {
  @PrimaryGeneratedColumn('uuid')
  id: string;

${fieldsContent}

${relationsContent ? `\\n${relationsContent}\\n` : ''}

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}`;
  
  return content;
}

function generateEnumFile() {
  const content = `// ──────────────────────────────────────────────────────────────
// packages/quality/src/common/enums/index.ts
// ──────────────────────────────────────────────────────────────

// ============================================================
// FOUNDATION ENUMS
// ============================================================

${enums.map(e => {
  return `export enum ${e.name} {
  ${e.values.map(v => `${v} = '${v}'`).join('\\n  ')}
}`;
}).join('\\n\\n')}

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

// TODO: Add other enums as per documentation
`;
  return content;
}

// Create directories
const basePath = path.join(__dirname, 'modules');
const foundationPath = path.join(basePath, 'foundation', 'entities');
const enumsPath = path.join(__dirname, 'src', 'common', 'ens');

[foundationPath, enumsPath].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate foundation entities
foundationEntities.forEach(entity => {
  const filePath = path.join(foundationPath, `${entity.name}.entity.ts`);
  fs.writeFileSync(filePath, generateEntityFile(entity));
  console.log(`Created ${filePath}`);
});

// Generate enums
const enumFilePath = path.join(enumsPath, 'index.ts');
fs.writeFileSync(enumFilePath, generateEnumFile());
console.log(`Created ${enumFilePath}`);

console.log('\\n✅ Foundation entities and enums generated successfully!');
