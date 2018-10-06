// https://github.com/facebook/jest/blob/master/packages/jest-config/src/Defaults.js
module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: "jest-extended",
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "src/app/*.{js}"]
};
