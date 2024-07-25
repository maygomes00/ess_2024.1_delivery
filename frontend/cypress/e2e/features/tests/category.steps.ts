import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Função para login
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

When("o usuário aperta o botão {string} no menu de navegação", (button: string) => {
  cy.get(`[data-cy="${button}"]`).click();
});

When("o usuário clica no botão de adicionar categoria {string}", (button: string) => {
  cy.get(`[data-cy="${button}"]`).click();
});

When("o usuário preenche o campo {string} com {string}", (field: string, value: string) => {
  cy.get(`[data-cy="${field}-input"]`).type(value);
});

When("o usuário clica no botão {string} do popup", (button: string) => {
  cy.get(`[data-cy="${button}-popup"]`).click();
});

When("o usuário dá refresh na tela de categorias", () => {
  cy.reload();
});

Then("o usuário deve ver a categoria {string} no modal", (category: string) => {
  cy.contains(category).should("be.visible");
});
