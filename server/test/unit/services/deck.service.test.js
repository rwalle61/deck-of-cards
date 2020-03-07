const chai = require('chai');

const deckService = require('../../../src/v1/services/deck.service');

const { expect } = chai;

describe('deck.service.js', () => {
    describe('getCards()', () => {
        it('returns undefined', () => {
            const output = deckService.getCards();
            expect(output).to.be.undefined;
        });
    });
});
