import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  projects: [
    "<rootDir>/packages/nbn-react-components",
  ],
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
}
export default config