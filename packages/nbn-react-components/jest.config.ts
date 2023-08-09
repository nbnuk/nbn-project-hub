import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  verbose: true, 
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
}
export default config