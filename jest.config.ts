const jestConfig = {
  verbose: true,
  testURL: 'http://localhost/',
  testMatch: ['**/tests/**/*.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
}

export default jestConfig