/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('dndPrepare', () => {
    // const login = 'login';
    // const passwd = 'test';

    cy.intercept('POST', 'api/auth/login', {fixture: 'login'}).as('postlogin');
    cy.intercept('POST', 'api/auth/token', {fixture: 'token'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user'});
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients'}).as('ingredientsReady');

    window.localStorage.setItem('accessToken', 'token1');
    window.localStorage.setItem('refreshToken', 'token2');

    // cy.visit('http://localhost:5173/login');
    // cy.get('[data-testid=login_input]').type(`${login}{enter}`);
    // cy.get('[data-testid=password_input]').type(`${passwd}{enter}`);

    // cy.wait('@postlogin').its('request.body').should('deep.equal', {
    //     email: 'login',
    //     password: 'test',
    // })

    cy.visit('http://localhost:5173');

    cy.wait('@ingredientsReady').should('exist');

    cy.get('[data-testid=main1]').should('exist').trigger('dragstart');

    cy.get('[data-testid=constructor]').should('exist').trigger('drop');
})
