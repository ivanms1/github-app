const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/assets/(.*)$": "<rootDir>/public/assets/$1",
    "^@/helpers/(.*)$": "<rootDir>/helpers/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
};

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      "\\.svg": "<rootDir>/__mocks__/svg.js",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;
