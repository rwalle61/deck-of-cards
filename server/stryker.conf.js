module.exports = (config) => {
    config.set({
        mutate: [
            'src/**/*.js',
            '!src/**/routes/*.js',
            '!src/**/controllers/*.js',
            '!src/**/config/*.js',
            '!src/**/Logger.js',
            '!src/app.js',
        ],
        mutator: 'javascript',
        packageManager: 'npm',
        reporters: ['clear-text', 'dots'],
        testRunner: 'mocha',
        mochaOptions: {
            // skip api tests because they are slower than our unit tests, and
            // our unit test coverage should be high anyway
            // remember to include (above) any new files that should be unit-tested
            spec: ['./test/unit/**/*.test.js'],
        },
        transpilers: [],
        testFramework: 'mocha',
        coverageAnalysis: 'all',
        thresholds: { high: 100, low: 85, break: 85 },
    });
};
