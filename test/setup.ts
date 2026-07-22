import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '.env.test') });

// Mock external services
jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn(),
    on: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    quit: jest.fn(),
  })),
}));
