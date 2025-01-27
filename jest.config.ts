const jestConfig = {
  verbose: true,
  testURL: 'http://localhost/',
  testMatch: ['**/tests/*.js'],
  extensionsToTreatAsEsm: ['.ts']
}

export default jestConfig
