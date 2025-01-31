import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
	moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Mapea imports de archivos .js a .ts
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true, // Habilita el soporte para ESM
      },
    ],
  },
	extensionsToTreatAsEsm: [".ts"], // Trata los archivos .ts como ESM
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
  coveragePathIgnorePatterns: ["/node_modules/", "config/env.ts"],
	verbose: true,
};

export default config;
