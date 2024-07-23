import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(`http://localhost:3000/${page}`);
});

When("o usuário preenche a nova senha com {string}", (newPassword: string) => {
  cy.get('[data-cy="new-password"]').type(newPassword);
});

When("o usuário clica no botão {string}", (button: string) => {
  cy.get(`button[data-cy="${button === 'Redefinir Senha' ? 'submit-button' : 'modal-button'}"]`).click();
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.get('[data-cy="modal-message"]').should('contain.text', message);
});

Then("o modal deve fechar", () => {
  cy.get('[data-cy="modal"]').should('not.exist');
});

Then("o usuário deve ser redirecionado para a página {string}", (page: string) => {
  cy.url().should('include', page);
});
