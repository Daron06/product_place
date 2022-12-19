const path = require("path");

module.exports = {
  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Test setup files
  setupFiles: ["jest-localstorage-mock"],

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/*.test.ts?(x)"],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    // we mock all files that can't be parsed by babel and not useful for testing
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.svg$": "jest-svg-transformer",
  },

  modulePaths: [
    "<rootDir>",
  ],

  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
  },

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,
};
