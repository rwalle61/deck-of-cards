const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiResValidator = require('chai-openapi-response-validator');

const app = require('../../../src/app');
const { pathToApiSpec } = require('../../config');

chai.use(chaiHttp);
chai.use(chaiResValidator(pathToApiSpec));
const { expect } = chai;

describe('/api/v1/persons', () => {
    describe('GET', () => {
        it('returns 200 and a list of all persons', async () => {
            const res = await chai.request(app).get('/api/v1/persons');
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
        });
    });
});
