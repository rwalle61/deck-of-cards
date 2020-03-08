const regExpForValidCard = /[CSHD][AKQJ0-9]{1,2}/;

const containOnlyUniqueCards = ($els) => {
    const elsText = $els.toArray().map((el) => el.innerText);

    elsText.forEach((card) => {
        expect(card).to.match(regExpForValidCard);
    });

    const uniqueCards = [...(new Set(elsText))];
    expect(elsText.length).to.equal(uniqueCards.length);
};

describe('e2e app test', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('renders the deck and your hand', () => {
        cy.get('.App')
            .should('exist');
        cy.get('.App-header')
            .contains('Deck of Cards');
        cy.get('.Deck')
            .should('exist');
        cy.get('.Hand')
            .should('exist')
            .contains('Your hand');
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);
    });
    it('adds 1 card to your hand when clicking the deck', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Deck')
            .click();

        cy.get('.Cards-in-hand').children()
            .should('have.length', 1)
            .each(containOnlyUniqueCards);
    });
    it('adds 2 (unique) cards to your hand when clicking the deck twice', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Deck')
            .click()
            .click();

        cy.get('.Cards-in-hand').children()
            .should('have.length', 2)
            .each(containOnlyUniqueCards);
    });
    it('adds 52 (unique) cards to your hand when clicking the deck 52 times', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < 52; i++) {
            cy.get('.Deck').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 52)
            .each(containOnlyUniqueCards);
    });
    it('adds no more cards to your hand when you already have 52 cards', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < (52 + 1); i++) {
            cy.get('.Deck').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 52)
            .each(containOnlyUniqueCards);
    });
});
