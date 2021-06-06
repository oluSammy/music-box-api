module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/index.spec.ts)",
  testEnvironment: "node",
  testTimeout: 60000,
};
