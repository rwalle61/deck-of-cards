import {
    childrenShouldContainOnlyUniqueCards,
    childrenShouldBeSorted,
    childrenShouldNotBeSorted,
} from '../test-helpers/app.e2e.test-helper';

describe('e2e app test', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('renders the deck and your hand', () => {
        cy.get('.App')
            .should('exist');
        cy.get('.title')
            .should('contain', 'Magic Deck');
        cy.get('.Deck')
            .should('exist');
        cy.get('.Hand-title')
            .should('exist')
            .should('contain', 'Your Hand');
        cy.get('.Shuffle-btn')
            .should('exist')
            .should('contain', 'Shuffle Deck');
        cy.get('.Draw-btn')
            .should('exist')
            .should('contain', 'Draw Card');
        cy.get('.Sort-btn')
            .should('exist')
            .should('contain', 'Sort Hand');
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);
    });
    it('adds 1 card to your hand when clicking the \'draw\' button', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Draw-btn')
            .click();

        cy.get('.Cards-in-hand').children()
            .should('have.length', 1)
            .then(childrenShouldContainOnlyUniqueCards);
    });
    it('adds 2 (unique) cards to your hand when clicking the \'draw\' button twice', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Draw-btn')
            .click()
            .click();

        cy.get('.Cards-in-hand').children()
            .should('have.length', 2)
            .then(childrenShouldContainOnlyUniqueCards);
    });
    it('adds 52 (unique) cards to your hand when clicking the \'draw\' button 52 times', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < 52; i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 52)
            .then(childrenShouldContainOnlyUniqueCards);
    });
    it('adds no more cards to your hand when you already have 52 cards', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < (52 + 1); i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 52)
            .then(childrenShouldContainOnlyUniqueCards);
    });
    it('adds sorted cards to your hand when you draw cards before shuffling the deck', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < 5; i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 5)
            .then(childrenShouldContainOnlyUniqueCards)
            .then(childrenShouldBeSorted);
    });
    it('adds shuffled cards to your hand when you draw cards after shuffling the deck', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Shuffle-btn').click();

        for (let i = 0; i < 5; i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 5)
            .then(childrenShouldContainOnlyUniqueCards)
            .then(childrenShouldNotBeSorted);
    });
    it('does not shuffle your hand when you shuffle the deck and draw a card', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < 5; i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 5)
            .then(childrenShouldContainOnlyUniqueCards)
            .then((children) => {
                childrenShouldBeSorted(children);
                const originalHand = children.toArray().map((el) => el.id);

                cy.get('.Shuffle-btn').click();
                cy.get('.Draw-btn').click();
                cy.get('.Cards-in-hand').children()
                    .should('have.length', 6)
                    .then((newChildren) => {
                        const newHand = newChildren.toArray().map((el) => el.id);
                        expect(newHand.slice(0, 5)).to.deep.equal(originalHand);
                    });
            });
    });
    it('sorts your hand if you click the sort button (after drawing cards from a shuffled deck)', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Shuffle-btn').click();

        for (let i = 0; i < 3; i++) {
            cy.get('.Draw-btn').click();
        }
        cy.get('.Cards-in-hand').children()
            .should('have.length', 3)
            .then(childrenShouldContainOnlyUniqueCards);

        cy.get('.Sort-btn').click();

        cy.get('.Cards-in-hand').children()
            .then(childrenShouldBeSorted);
    });
});
