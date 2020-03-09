const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('/health', () => {
    describe('GET', () => {
        it('returns status 204', async () => {
            const res = await chai.request(app).get('/health');
            expect(res).to.have.status(204);
        });
    });
});
