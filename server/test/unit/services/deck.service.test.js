const chai = require('chai');

const deckService = require('../../../src/v1/services/deck.service');

const { expect } = chai;

describe('deck.service.js', () => {
    describe('getCards()', () => {
        it('returns an array', () => {
            const output = deckService.getCards();
            expect(output).to.be.an('array');
        });
    });
});
