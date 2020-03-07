const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const Logger = require('../../../src/utils/Logger.js');

chai.use(sinonChai);
const { expect } = chai;

describe('Logger.js', () => {
    let sandbox;
    before(() => {
        sandbox = sinon.createSandbox();
    });
    beforeEach(() => {
        sandbox.restore();
    });
    describe('logRequest(req)', () => {
        it('logs nothing at info level when log level is info', () => {
            const logInfoSpy = sandbox.spy(Logger.prototype, 'info');
            const log = new Logger('foo.js');
            Logger.setLoggingLevel('info');
            const req = {
                method: 'GET',
                path: '/',
                body: { foo: 'mockBody' },
            };

            log.logRequest(req);

            expect(logInfoSpy).to.not.have.been.called;
        });
        it('logs the route called at debug level when log level is debug', () => {
            const logDebugSpy = sandbox.spy(Logger.prototype, 'debug');
            const log = new Logger('foo.js');
            Logger.setLoggingLevel('debug');
            const req = {
                method: 'GET',
                path: '/',
                body: { foo: 'mockBody' },
            };

            log.logRequest(req);

            expect(logDebugSpy).to.have.been.calledOnceWithExactly('GET / called');
        });
        it('logs the route called and the body at trace level when log level is trace and req has no query', () => {
            const logDebugSpy = sandbox.spy(Logger.prototype, 'debug');
            const logTraceSpy = sandbox.spy(Logger.prototype, 'trace');
            const log = new Logger('foo.js');
            Logger.setLoggingLevel('trace');
            const req = {
                method: 'GET',
                path: '/',
                body: { foo: 'mockBody' },
            };

            log.logRequest(req);

            expect(logDebugSpy).to.not.have.been.called;
            expect(logTraceSpy).to.have.been.calledOnceWithExactly('GET / called with \n req.body { foo: \'mockBody\' }');
        });
        it('logs the route called and the body at trace level when log level is trace and req.query is empty', () => {
            const logDebugSpy = sandbox.spy(Logger.prototype, 'debug');
            const logTraceSpy = sandbox.spy(Logger.prototype, 'trace');
            const log = new Logger('foo.js');
            Logger.setLoggingLevel('trace');
            const req = {
                method: 'GET',
                path: '/',
                body: { foo: 'mockBody' },
                query: {},
            };

            log.logRequest(req);

            expect(logDebugSpy).to.not.have.been.called;
            expect(logTraceSpy).to.have.been.calledOnceWithExactly('GET / called with \n req.body { foo: \'mockBody\' }');
        });
        it('logs the route called, body and query at trace level when log level is trace and req has a query', () => {
            const logDebugSpy = sandbox.spy(Logger.prototype, 'debug');
            const logTraceSpy = sandbox.spy(Logger.prototype, 'trace');
            const log = new Logger('foo.js');
            Logger.setLoggingLevel('trace');
            const req = {
                method: 'GET',
                path: '/',
                body: { foo: 'mockBody' },
                query: { bar: 'mockQuery' },
            };

            log.logRequest(req);

            expect(logDebugSpy).to.not.have.been.called;
            expect(logTraceSpy).to.have.been.calledOnceWithExactly('GET / called with \n req.body { foo: \'mockBody\' }, and \n req.query { bar: \'mockQuery\' }');
        });
    });
});
