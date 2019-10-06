/* eslint-disable @typescript-eslint/no-var-requires */
require("./envs");

const projects = [{
    displayName: `src:nodejs`,
    roots: [
        `<rootDir>/src`
    ],
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    moduleNameMapper: {
        "@@src/(.*)": `<rootDir>/src/$1`,
        "@@graphql/(.*)": `<rootDir>/_@graphql_types/$1`
    },
    setupFiles: ["<rootDir>/jest.setup.js"],
    collectCoverage: true,
    verbose: false
}];

process.env.APPS.split(",").map((app) => {
    if (process.env[`${app}_WWW_NEXTJS`] === "true") {
        projects.push({
            displayName: `www:nextjs:${app}`,
            roots: [
                `<rootDir>/www/nextjs/${app}`
            ],
            transform: {
                "^.+\\.tsx?$": "babel-jest"
            },
            testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
            moduleFileExtensions: [
                "ts",
                "tsx",
                "js",
                "jsx"
            ],
            moduleNameMapper: {
                "@@components/(.*)": `<rootDir>/www/${app}/components/$1`,
                "@@static/(.*)": `<rootDir>/www/${app}/static/$1`,
                "@@utils/(.*)": `<rootDir>/www/${app}/utils/$1`
            },
            setupFiles: ["<rootDir>/jest.setup.js"],
            collectCoverage: true,
            verbose: false
        });
    }
    return {};
});

const exporting = {
    projects
};

module.exports = exporting;