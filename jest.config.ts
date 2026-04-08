import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  transformIgnorePatterns: [
    '/node_modules/(?!(bson|mongodb|mongoose)/)'
  ],

  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    }
  },

  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/layout.tsx',
    '!app/api/**/*',
    '!app/hooks/**/*',
  ],
}

export default createJestConfig(config)