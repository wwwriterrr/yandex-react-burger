import type {} from 'cypress';
import type {} from '../support/cypress';

describe('Application', () => {
    it('Drag and drop test', () => {
        cy.dndPrepare();
    })

    it('Create order modal', () => {
        cy.dndPrepare();

        cy.intercept('POST', 'api/orders', {fixture: 'orders'}).as('createOrder');

        cy.get('[data-testid=create_order_btn]').should('exist').trigger('click');

        cy.wait('@createOrder');

        cy.get('[data-testid=order_modal]').should('exist');

        cy.get('[data-testid=order_name]').should('have.text', 'Test burger');
    })
})
