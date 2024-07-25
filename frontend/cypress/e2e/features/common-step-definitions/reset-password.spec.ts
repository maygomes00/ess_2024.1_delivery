import '../../../support/commands';
import '@badeball/cypress-cucumber-preprocessor/steps';

describe('Reset Password', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/forgot-password/reset/valid-token', {
        statusCode: 200,
        body: { msg: 'Senha redefinida com sucesso' },
      }).as('resetPasswordSuccess');
      cy.intercept('POST', '**/forgot-password/reset/invalid-token', {
        statusCode: 400,
        body: { msg: 'Token inválido ou expirado' },
      }).as('resetPasswordFailure');
    });
  
    it('Redefinição de senha com token válido', () => {
      cy.visit('http://localhost:3000/forgot-password/reset/valid-token');
      cy.get('[data-cy="new-password"]').type('novaSenhaSegura123');
      cy.get('[data-cy="submit-button"]').click();
      cy.wait('@resetPasswordSuccess');
      cy.get('[data-cy="modal-message"]').should('contain.text', 'Senha redefinida com sucesso');
      cy.get('[data-cy="modal-button"]').click();
      cy.url().should('include', 'login-client');
    });
  
    it('Redefinição de senha com token inválido', () => {
      cy.visit('http://localhost:3000/forgot-password/reset/invalid-token');
      cy.get('[data-cy="new-password"]').type('novaSenhaSegura123');
      cy.get('[data-cy="submit-button"]').click();
      cy.wait('@resetPasswordFailure');
      cy.get('[data-cy="modal-message"]').should('contain.text', 'Token inválido ou expirado');
      cy.get('[data-cy="modal-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
  