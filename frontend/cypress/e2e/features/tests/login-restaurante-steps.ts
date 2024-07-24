import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(`http://localhost:3000/${page}`);
});

When("o usuário preenche o campo {string} com {string}", (field: string, value: string) => {
  cy.get(`[data-cy="${field}-input"]`).type(value);
});

When("o usuário deixa o campo {string} em branco", (field: string) => {
  cy.get(`[data-cy="${field}-input"]`).clear();
});

When("o usuário clica no botão {string}", (button: string) => {
  cy.get(`[data-cy="${button}"]`).click();
});

Then("o usuário deve ser redirecionado para a página {string}", (page: string) => {
  cy.url().should("include", page);
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.contains(message).should("be.visible");
});
