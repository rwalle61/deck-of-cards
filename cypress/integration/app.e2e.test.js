import { c } from 'compress-tag';
import {
    childrenShouldContainOnlyUniqueCards,
    childrenShouldBeSorted,
    childrenShouldNotBeSorted,
} from '../test-helpers/app.e2e.test-helper';

describe('e2e app test', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('renders the deck, my hand and the controls', () => {
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
    describe(c`Acceptance Criteria 2: I can draw any given number of cards from the deck,
        with the cards being removed from the original deck`, () => {
        it('draws 1 card when clicking the \'draw\' button', () => {
            cy.get('.Cards-in-hand').children()
                .should('have.length', 0);

            cy.get('.Draw-btn')
                .click();

            cy.get('.Cards-in-hand').children()
                .should('have.length', 1)
                .then(childrenShouldContainOnlyUniqueCards);
        });
        it('draws 2 unique cards when clicking the \'draw\' button twice', () => {
            cy.get('.Cards-in-hand').children()
                .should('have.length', 0);

            cy.get('.Draw-btn')
                .click()
                .click();

            cy.get('.Cards-in-hand').children()
                .should('have.length', 2)
                .then(childrenShouldContainOnlyUniqueCards);
        });
        it('draws 52 unique cards when clicking the \'draw\' button 52 times', () => {
            cy.get('.Cards-in-hand').children()
                .should('have.length', 0);

            for (let i = 0; i < 52; i++) {
                cy.get('.Draw-btn').click();
            }

            cy.get('.Cards-in-hand').children()
                .should('have.length', 52)
                .then(childrenShouldContainOnlyUniqueCards);
        });
        it('draws no more cards when I have 52 cards in hand and click the \'draw\' button again', () => {
            cy.get('.Cards-in-hand').children()
                .should('have.length', 0);

            for (let i = 0; i < (52 + 1); i++) {
                cy.get('.Draw-btn').click();
            }

            cy.get('.Cards-in-hand').children()
                .should('have.length', 52)
                .then(childrenShouldContainOnlyUniqueCards);
        });
    });
    describe('Acceptance Criteria 1: I can shuffle the deck of cards', () => {
        it('draws sorted cards before I have shuffled the deck', () => {
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
        it('draws unsorted cards after I have shuffled the deck', () => {
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
        it('does not shuffle my hand when I shuffle the deck and draw a card (regression test)', () => {
            cy.get('.Cards-in-hand').children()
                .should('have.length', 0);

            for (let i = 0; i < 5; i++) {
                cy.get('.Draw-btn').click();
            }

            cy.get('.Cards-in-hand').children()
                .should('have.length', 5)
                .then(childrenShouldContainOnlyUniqueCards)
                .then((children) => {
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
    });
    describe(c`Acceptance Criteria 3: I can draw any given number of cards from the deck
        and then sort the drawn cards, with the cards being removed from the original deck.
        Also, Acceptance Criteria 4: Sorted cards are sorted by suit: Clubs, Spades, Hearts, Diamonds;
        then by value: Ace is high.`, () => {
        it('sorts my hand when I click the \'sort\' button (after drawing cards from a shuffled deck)', () => {
            cy.get('.Cards-in-hand').children()
                .should('have.length', 0);

            cy.get('.Shuffle-btn').click();

            for (let i = 0; i < 3; i++) {
                cy.get('.Draw-btn').click();
            }

            cy.get('.Sort-btn').click();

            cy.get('.Cards-in-hand').children()
                .should('have.length', 3)
                .then(childrenShouldBeSorted);
        });
    });
});
