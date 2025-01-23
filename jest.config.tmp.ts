
export default {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    globals: {
        fetch: global.fetch,
    }
};
