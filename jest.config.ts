/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    // множество разных настроек
        transform: {
          // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью ts-jest
          // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью ts-jest
          '^.+\\.tsx?$': [
            'ts-jest',
            {
              // настройки для ts-jest
            },
          ],
        },
        moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
  '^@utils-types$': '<rootDir>/src/utils/types.ts',
  '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src//*.{ts,tsx}",
    "!/node_modules/",
    "!/vendor/**"
  ]
};

export default config;