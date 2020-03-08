const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiResValidator = require('chai-openapi-response-validator');

const app = require('../../../src/app');
const { pathToApiSpec } = require('../../config');

chai.use(chaiHttp);
chai.use(chaiResValidator(pathToApiSpec));
const { expect } = chai;

const startingDeck = [
    'CA', 'CK', 'CQ', 'CJ', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2',
    'SA', 'SK', 'SQ', 'SJ', 'S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2',
    'HA', 'HK', 'HQ', 'HJ', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2',
    'DA', 'DK', 'DQ', 'DJ', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2',
];

describe('/api/v1/deck', () => {
    describe('GET', () => {
        it('returns status 200 and the startingDeck', async () => {
            const res = await chai.request(app).get('/api/v1/deck');
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.deep.equal(startingDeck);
        });
    });
});
