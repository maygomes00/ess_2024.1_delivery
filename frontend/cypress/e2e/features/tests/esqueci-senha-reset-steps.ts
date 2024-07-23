import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('o usuário está na página {string}', (page: string) => {
  cy.visit(`/${page}`);
});

When(
  'o usuário preenche o campo {string} com {string} e clica no botão {string}',
  (inputCy: string, value: string, buttonCy: string) => {
    cy.get(`[data-cy=${inputCy}]`).type(value);
    cy.get(`[data-cy=${buttonCy}]`).click();
  }
);

Then('o usuário deve ver a mensagem {string} no modal', (message: string) => {
  cy.get('[data-cy=modal]').should('be.visible');
  cy.get('[data-cy=modal-message]').should('contain', message);
});

Then('o usuário deve ver o botão {string} no modal', (buttonText: string) => {
  cy.get('[data-cy=modal]').should('be.visible');
  cy.get('[data-cy=modal-button]').should('contain', buttonText);
});

When('o usuário clica no botão {string}', (buttonCy: string) => {
  cy.get(`[data-cy=${buttonCy}]`).click();
});

Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  cy.url().should('include', page);
});
