const regExpForValidCard = /[CSHD][AKQJ0-9]{1,2}/;

const checkElementsAreValidCards = (elsText) => {
    elsText.forEach((card) => {
        expect(card).to.match(regExpForValidCard);
    });
};

const checkElementsAreUnique = (elements) => {
    const uniqueElements = [...(new Set(elements))];
    expect(elements.length).to.equal(uniqueElements.length);
};

const shouldContainOnlyUniqueCards = ($els) => {
    const cards = $els.toArray().map((el) => el.innerText);
    checkElementsAreValidCards(cards);
    checkElementsAreUnique(cards);
};

const orderedDeck = [
    'CA', 'CK', 'CQ', 'CJ', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2',
    'SA', 'SK', 'SQ', 'SJ', 'S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2',
    'HA', 'HK', 'HQ', 'HJ', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2',
    'DA', 'DK', 'DQ', 'DJ', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2',
];

const shouldBeOrderedCorrectly = ($els) => {
    const cards = $els.toArray().map((el) => el.innerText);
    const sortedCards = [];
    orderedDeck.forEach((card) => {
        if (cards.includes(card)) {
            sortedCards.push(card);
        }
    });
    expect(cards).to.deep.equal(sortedCards);
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
        cy.get('.Draw-btn')
            .should('exist')
            .should('contain', 'Draw card');
        cy.get('.Hand')
            .should('exist')
            .should('contain', 'Your hand');
        cy.get('.Sort-btn')
            .should('exist')
            .should('contain', 'Sort hand');
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
            .each(shouldContainOnlyUniqueCards);
    });
    it('adds 2 (unique) cards to your hand when clicking the \'draw\' button twice', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Draw-btn')
            .click()
            .click();

        cy.get('.Cards-in-hand').children()
            .should('have.length', 2)
            .each(shouldContainOnlyUniqueCards);
    });
    it('adds 52 (unique) cards to your hand when clicking the \'draw\' button 52 times', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < 52; i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 52)
            .each(shouldContainOnlyUniqueCards);
    });
    it('adds no more cards to your hand when you already have 52 cards', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < (52 + 1); i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 52)
            .each(shouldContainOnlyUniqueCards);
    });
    it('sorts your hand of 1 when clicking the sort button', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Draw-btn').click();

        cy.get('.Cards-in-hand').children()
            .should('have.length', 1)
            .each(shouldContainOnlyUniqueCards);

        cy.get('.Sort-btn').click();
        cy.get('.Cards-in-hand').children()
            .each(shouldBeOrderedCorrectly);
    });
    it('sorts your hand of 5 when clicking the sort button', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < 5; i++) {
            cy.get('.Draw-btn').click();
        }

        cy.get('.Cards-in-hand').children()
            .should('have.length', 5)
            .each(shouldContainOnlyUniqueCards);

        cy.get('.Sort-btn').click();
        cy.get('.Cards-in-hand').children()
            .each(shouldBeOrderedCorrectly);
    });
});
