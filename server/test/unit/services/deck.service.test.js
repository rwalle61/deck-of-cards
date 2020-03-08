const chai = require('chai');

const deckService = require('../../../src/v1/services/deck.service');

const { expect } = chai;

const deck = [
    'CA', 'CK', 'CQ', 'CJ', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2',
    'SA', 'SK', 'SQ', 'SJ', 'S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2',
    'HA', 'HK', 'HQ', 'HJ', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2',
    'DA', 'DK', 'DQ', 'DJ', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2',
];

describe('deck.service.js', () => {
    describe('getDeck()', () => {
        it('returns the starting deck', () => {
            const output = deckService.getDeck();
            expect(output).to.be.an('array');
            expect(output).to.deep.equal(deck);
        });
    });
});
