module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    verbose: true
}
