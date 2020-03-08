const regExpForValidCard = /[CSHD][AKQJ0-9]{1,2}/;

const checkElementsAreValidCards = (elements) => {
    elements.forEach((card) => {
        expect(card).to.match(regExpForValidCard, 'not all elements are valid cards');
    });
};

const checkElementsAreUnique = (elements) => {
    const uniqueElements = [...(new Set(elements))];
    expect(elements.length).to.equal(uniqueElements.length, 'not all elements are unique');
};

const childrenShouldContainOnlyUniqueCards = (children) => {
    const cards = children.toArray().map((el) => el.id);
    checkElementsAreValidCards(cards);
    checkElementsAreUnique(cards);
};

const sortedDeck = [
    'CA', 'CK', 'CQ', 'CJ', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2',
    'SA', 'SK', 'SQ', 'SJ', 'S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2',
    'HA', 'HK', 'HQ', 'HJ', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2',
    'DA', 'DK', 'DQ', 'DJ', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2',
];

const childrenShouldBeSorted = (children) => {
    const cards = children.toArray().map((el) => el.id);
    const cardIndexes = cards.map((card) => sortedDeck.indexOf(card));
    const sortedCardsIndexes = [...cardIndexes].sort((a, b) => a - b);
    expect(cardIndexes).to.deep.equal(sortedCardsIndexes, 'cards are not sorted but should be sorted');
};

const childrenShouldNotBeSorted = ($els) => {
    const cards = $els.toArray().map((el) => el.innerText);
    const cardIndexes = cards.map((card) => sortedDeck.indexOf(card));
    const sortedCardsIndexes = [...cardIndexes].sort((a, b) => a - b);
    expect(cardIndexes).to.not.deep.equal(sortedCardsIndexes, 'cards are sorted but should not be sorted');
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
        cy.get('.Shuffle-btn')
            .should('exist')
            .should('contain', 'Shuffle deck');
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
    it('sorts your hand of 1 when clicking the sort button', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        cy.get('.Draw-btn').click();

        cy.get('.Cards-in-hand').children()
            .should('have.length', 1)
            .then(childrenShouldContainOnlyUniqueCards);

        cy.get('.Sort-btn').click();
        cy.get('.Cards-in-hand').children()
            .then(childrenShouldBeSorted);
    });
    it('sorts your hand of 5 when clicking the sort button', () => {
        cy.get('.Cards-in-hand').children()
            .should('have.length', 0);

        for (let i = 0; i < 5; i++) {
            cy.get('.Draw-btn').click();
        }
        cy.get('.Cards-in-hand').children()
            .should('have.length', 5)
            .then(childrenShouldContainOnlyUniqueCards);

        cy.get('.Sort-btn').click();

        cy.get('.Cards-in-hand').children()
            .then(childrenShouldBeSorted);
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
});
