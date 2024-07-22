import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Given
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(`/${page}`);
});

// When
When(
  'o usuário preenche o campo {string} com {string} e clica no botão {string}',
  (field: string, value: string, button: string) => {
    cy.get(`input[data-cy=${field}]`).type(value); // Campo de input com data-cy
    cy.get(`button[data-cy=${button}]`).click(); // Botão com data-cy
  }
);

When(
  'o usuário não preenche o campo {string} e clica no botão {string}',
  (field: string, button: string) => {
    cy.get(`input[data-cy=${field}]`).should('be.empty'); // Campo de input com data-cy
    cy.get(`button[data-cy=${button}]`).click(); // Botão com data-cy
  }
);

// Then
Then('o usuário deve ver a mensagem {string} no modal', (message: string) => {
  cy.get('[data-cy=modal]').should('be.visible'); // Modal visível com data-cy
  cy.get('[data-cy=modal-content] p').should('contain', message); // Mensagem no modal
});

Then('o usuário deve ver o botão {string} no modal', (buttonText: string) => {
  cy.get('[data-cy=modal]').should('be.visible'); // Modal visível com data-cy
  cy.get(`[data-cy=modal-content] button[data-cy=${buttonText}]`).should('be.visible'); // Botão com data-cy dentro do modal
});

When('o usuário clica no botão {string}', (buttonText: string) => {
  cy.get(`button[data-cy=${buttonText}]`).click(); // Botão com data-cy
});

Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  cy.url().should('include', page);
});
