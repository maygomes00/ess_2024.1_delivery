import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page);
});

Given(
  "que eu estou logado como {string} com o login {string} e senha {string}",
  (role: string, email: string, password: string) => {
    cy.visit("/login-client");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[data-cy="Entrar"]').click();
  }
);

Given("eu estou na página {string}", (page: string) => {
  cy.url().should("include", `/${page}`);
});

// clicar em link da Navbar com data-cy="${option}"
When("eu escolho a opção {string} na barra de navegação", (link: string) => {
  cy.get(`a[data-cy="${link}"]`).click();
});

// texto presente na página
Then("eu consigo visualizar o texto {string}", (text: string) => {
  cy.contains(text).should("be.visible");
});

Then(
  "eu estou na página {string} do usuário de id {string}",
  (page: string, userId: string) => {
    cy.url().should("include", `/${userId}/${page}`);
  }
);

// clicar em botão com data-cy="${button}"
Then("eu clico no botão {string}", (button: string) => {
  cy.get(`button[data-cy="${button}"]`).click();
});

Then("eu continuo na página {string}", (page: string) => {
  cy.url().should("include", page);
});
