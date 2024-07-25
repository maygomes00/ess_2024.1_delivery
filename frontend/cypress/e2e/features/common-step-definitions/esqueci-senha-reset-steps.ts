import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("o usuário está na página {string}", (page: string) => {
  // Mock 
  if (page.includes('valid-token')) {
    cy.intercept('POST', '/forgot-password/reset/valid-token', {
      statusCode: 200,
      body: { msg: 'Senha nova confirmada! Tente fazer login novamente!', msgCode: 'success', code: 200 }
    }).as('resetPassword');
  }
  // Mock 
  else if (page.includes('invalid-token')) {
    cy.intercept('POST', '/forgot-password/reset/invalid-token', {
      statusCode: 400,
      body: { msg: 'Token is invalid or has expired', msgCode: 'failure', code: 400 }
    }).as('resetPassword');
  }
  cy.visit(`http://localhost:3000/${page}`);
});

When("o usuário preenche a nova senha com {string}", (newPassword: string) => {
  cy.get('[data-cy="new-password"]').type(newPassword);
});

When("o usuário clica no botão {string}", (button: string) => {
  cy.get(`button[data-cy="${button === 'Redefinir Senha' ? 'submit-button' : 'modal-button'}"]`).click();
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.wait('@resetPassword'); // Wait for the mock response
  cy.get('[data-cy="modal-message"]').should('contain.text', message);
});

Then("o modal deve fechar", () => {
  cy.get('[data-cy="modal"]').should('not.exist');
});

Then("o usuário deve ser redirecionado para a página {string}", (page: string) => {
  cy.url().should('include', page);
});
