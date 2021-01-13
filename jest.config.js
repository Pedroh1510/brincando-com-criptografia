const { defaults: tsjPreset } = require('ts-jest/presets')
const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
module.exports = {
  // preset: '@shelf/jest-mongodb',
  preset: 'ts-jest',
  transform: tsjPreset.transform,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/mocks/**',
    '!src/**/config/**'
  ],
  coverageReporters: ['json', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
}
