import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(`/${page}`);
});

When("o usuário clica no botão {string}", (button: string) => {
  cy.get(`button[data-cy="${button}"]`).click();
});

When("o usuário preenche o campo {string} com {string}", (field: string, value: string) => {
  cy.get(`[data-cy=${field}]`).type(value);
});

When("o usuário não preenche o campo {string}", (field: string) => {
  cy.get(`[data-cy=${field}]`).should("be.empty");
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(message);
  });
});

Then("Todos os campos devem ser limpos", () => {
  cy.get('input[data-cy="restaurant_name"]').should("be.empty");
  cy.get('input[data-cy="restaurant_address"]').should("be.empty");
  cy.get('input[data-cy="email"]').should("be.empty");
  cy.get('input[data-cy="password"]').should("be.empty");
  cy.get('input[data-cy="owner_name"]').should("be.empty");
  cy.get('input[data-cy="owner_cpf"]').should("be.empty");
  cy.get('input[data-cy="owner_address"]').should("be.empty");
  cy.get('input[data-cy="owner_telephone"]').should("be.empty");
  cy.get('input[data-cy="restaurant_cnpj"]').should("be.empty");
  cy.get('input[data-cy="restaurant_telephone"]').should("be.empty");
});

Then("o sistema deve redirecionar o usuário para a página {string}", (page: string) => {
  cy.wait(3500);
  cy.url().should("include", page);
});