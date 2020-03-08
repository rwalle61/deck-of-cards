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
            .contains('Your hand');
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
});
