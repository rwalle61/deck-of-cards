const chai = require('chai');

const personsService = require('../../../src/v1/services/persons.service');

const { expect } = chai;

describe('persons.service.js', () => {
    describe('getPersons()', () => {
        it('returns a list of all persons', () => {
            const output = personsService.getPersons();
            expect(output).to.deep.equal([{ name: 'richard' }]);
        });
    });
});
