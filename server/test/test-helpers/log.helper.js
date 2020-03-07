const sinon = require('sinon');

/**
 * To help unit testing.
 * Use in a Mocha `describe` block to suppress logger output.
 * @param rewiredModule instantiate one via something like:
 * `const rewiredModule = rewire('path/to/module');`
 */
const suppressLogOutput = (rewiredModule) => {
    const log = rewiredModule.__get__('log'); // eslint-disable-line no-underscore-dangle
    const logLevels = ['error', 'warn', 'info', 'debug', 'trace'];
    let sandbox;
    before(() => { // eslint-disable-line mocha/no-top-level-hooks
        sandbox = sinon.createSandbox();
    });
    beforeEach(() => { // eslint-disable-line mocha/no-top-level-hooks
        sandbox.restore();
        logLevels.forEach((level) => sandbox.stub(log, level));
    });
};

module.exports = {
    suppressLogOutput,
};
