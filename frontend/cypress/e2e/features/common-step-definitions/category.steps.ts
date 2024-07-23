import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Função auxiliar para login
const login = (email: string, password: string) => {
  cy.visit('http://localhost:3000/login-restaurant');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains("button", "Entrar").click();
};


Given("o usuário está logado com email {string} e password {string}", (email: string, password: string) => {
  login(email, password);
});

Given("está na página {string}", (page: string) => {
  cy.url().should("include", page);
});


Given("o usuário esta na página {string}", (page: string) => {
  cy.visit(`http://localhost:3000${page}`);
});

When("o usuário preenche o campo de {string} com {string}", (field: string, value: string) => {
  cy.get(`input[name="${field}"]`).type(value);
});

When("o usuário clica no botão de adicionar categoria {string}", (buttonDataCy: string) => {
  cy.get(`[data-cy=${buttonDataCy}]`, { timeout: 10000 }).should("be.visible").click();
});

When("o usuário preenche o campo {string} com {string}", (fieldName: string, value: string) => {
  cy.get(`input[name="${fieldName}"]`).type(value);
});

When("o usuário aperta o botão {string}", (buttonText: string) => {
  cy.contains("button", buttonText).click();
});

Then("o usuário vai para a pagina {string}", (page: string) => {
  cy.url().should("include", page);
});
