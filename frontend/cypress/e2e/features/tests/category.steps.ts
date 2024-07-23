import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está logado com email {string} e password {string}", (email: string, password: string) => {
  cy.visit("http://localhost:3000/login-restaurant");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains("button", "Entrar").click();
  cy.url().should("include", "/home-restaurant");
});

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(`http://localhost:3000/${page}`);
});

When("o usuário clica no botão {string}", (button: string) => {
  cy.contains("button", button).click();
});

When("o usuário clica no botão de adicionar categoria {string}", (button: string) => {
  cy.get(`[data-cy=${button}]`).click();
});

When("o usuário preenche o campo {string} com {string}", (field: string, value: string) => {
  cy.get(`input[placeholder="${field}"]`).type(value);
});

When("o usuário aperta o botão 'Adicionar'", () => {
  // Primeiro, certifique-se de que o popup está visível
  cy.get('[data-cy="popup-add-category-button"]').click({ force: true });
});

Then("o usuário deve ser redirecionado para a página {string}", (page: string) => {
  cy.url().should("include", page);
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.contains(message).should("be.visible");
});

// Passo para verificar a mensagem de erro
Then("o usuário vê a mensagem {string}", (message: string) => {
  cy.contains(message).should('be.visible');
});

// Passo para verificar se o popup foi fechado
Then("o popup é fechado", () => {
  cy.get('.ReactModal__Overlay').should('not.exist');
});

When("o usuário aperta o botão de {string} no popup", (buttonText: string) => {
  // Certifique-se de que o popup está visível antes de clicar
  cy.get(`[data-cy="${buttonText}"]`).click({ force: true });
});
