const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiResValidator = require('chai-openapi-response-validator');

const app = require('../../../src/app');
const { pathToApiSpec } = require('../../config');

chai.use(chaiHttp);
chai.use(chaiResValidator(pathToApiSpec));
const { expect } = chai;

const fullDeck = [
    'CA', 'CK', 'CQ', 'CJ', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2',
    'SA', 'SK', 'SQ', 'SJ', 'S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2',
    'HA', 'HK', 'HQ', 'HJ', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2',
    'DA', 'DK', 'DQ', 'DJ', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2',
];

describe('/api/v1/deck', () => {
    describe('GET', () => {
        it('returns status 200 and an empty list when req.query does not specify the number of cards', async () => {
            const res = await chai.request(app).get('/api/v1/deck');
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.deep.equal([]);
        });
        it('returns status 200 and 1 card when request asks for 0 cards', async () => {
            const res = await chai.request(app)
                .get('/api/v1/deck')
                .query({ numCards: 0 });
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.deep.equal([]);
        });
        it('returns status 200 and 1 card when request asks for 1 card', async () => {
            const res = await chai.request(app)
                .get('/api/v1/deck')
                .query({ numCards: 1 });
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.have.lengthOf(1);
        });
        it('returns status 200 and 2 cards when request asks for 2 cards', async () => {
            const res = await chai.request(app)
                .get('/api/v1/deck')
                .query({ numCards: 2 });
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.have.lengthOf(2);
        });
        it('returns status 400 and an error message when request asks for more than 52 cards', async () => {
            const res = await chai.request(app)
                .get('/api/v1/deck')
                .query({ numCards: 53 });
            expect(res).to.have.status(400);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.deep.equal({ error: `There aren't 53 cards left in the deck` });
        });
        it('returns status 200 and 52 cards when request asks for 52 cards', async () => {
            const res = await chai.request(app)
                .get('/api/v1/deck')
                .query({ numCards: 52 });
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.have.lengthOf(52);
            expect(res.body).to.have.members(fullDeck);
        });
        it('returns status 200 and 2 sorted cards when request asks for 2 sorted cards', async () => {
            const res = await chai.request(app)
                .get('/api/v1/deck')
                .query({
                    numCards: 2,
                    sorted: true,
                });
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body).to.deep.equal(['CA', 'CK']);
        });
    });
    describe('POST /shuffle', () => {
        it('returns status 204', async () => {
            const res = await chai.request(app).post('/api/v1/deck/shuffle');
            expect(res).to.have.status(204);
        });
        it('shuffles the deck', async () => {
            // gets the deck once
            const resfromFirstGet = await chai.request(app)
                .get('/api/v1/deck')
                .query({ numCards: 52 });
            expect(resfromFirstGet).to.have.status(200);
            expect(resfromFirstGet.body).to.have.members(fullDeck);

            // shuffles the deck
            const resfromPost = await chai.request(app)
                .post('/api/v1/deck/shuffle');
            expect(resfromPost).to.have.status(204);

            // gets the deck a second time
            const resfromSecondGet = await chai.request(app)
                .get('/api/v1/deck')
                .query({ numCards: 52 });
            expect(resfromSecondGet).to.have.status(200);
            expect(resfromSecondGet.body).to.have.members(fullDeck);

            // the first and second decks received should be different
            expect(resfromSecondGet.body).to.not.deep.equal(resfromFirstGet.body);
        });
    });
});
