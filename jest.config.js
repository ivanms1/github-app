const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      "^@/components/(.*)$": "<rootDir>/src/components/$1",
      "^@/assets/(.*)$": "<rootDir>/public/assets/$1",
      "^@/helpers/(.*)$": "<rootDir>/helpers/$1",
      "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
      "^@/pages/(.*)$": "<rootDir>/pages/$1",
      "\\.svg": "jest-transformer-svg",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;
