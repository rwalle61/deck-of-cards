describe('e2e app test', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('renders the Create React App starter page', () => {
        cy.get('.App')
            .should('exist');
        cy.get('.App-link')
            .should('exist')
            .click();
    });
});
