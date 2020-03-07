const chai = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const rewire = require('rewire');

const { suppressLogOutput } = require('../../test-helpers/log.helper');

const errorHandler = rewire('../../../src/middleware/errorHandler');

chai.use(sinonChai);
const { expect } = chai;

describe('errorHandler.js', () => {
    suppressLogOutput(errorHandler);
    describe('handleErrors(error, req, res, next)', () => {
        it('returns status 500 and sends the error if the error does not have a status code', () => {
            const error = Error('foo');
            const req = mockReq();
            const res = mockRes();

            errorHandler.handleErrors(error, req, res, 'next');

            expect(res.status).to.have.been.calledOnceWithExactly(500);
            expect(res.send).to.have.been.calledOnceWithExactly({ error: 'foo' });
        });
        it('returns the status code of error and sends the error if the error has a status code', () => {
            const error = Error('foo');
            error.statusCode = 499;
            const req = mockReq();
            const res = mockRes();

            errorHandler.handleErrors(error, req, res, 'next');

            expect(res.status).to.have.been.calledOnceWithExactly(499);
            expect(res.send).to.have.been.calledOnceWithExactly({ error: 'foo' });
        });
    });
});
