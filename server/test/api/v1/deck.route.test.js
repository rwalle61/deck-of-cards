const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../../src/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('/api/v1/deck', () => {
    describe('GET', () => {
        it('returns status 200', async () => {
            const res = await chai.request(app).get('/api/v1/deck');
            expect(res).to.have.status(200);
        });
    });
});
