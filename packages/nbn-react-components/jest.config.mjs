export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        '\\.test\\.js$',
        '\\.spec\\.js$',
    ],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    },
};
