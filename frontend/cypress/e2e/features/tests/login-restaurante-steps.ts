import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(`http://localhost:3000/${page}`);
});

When("o usuário preenche o campo {string} com {string}", (field: string, value: string) => {
  cy.get(`input[name="${field}"]`).type(value);
});

When("o usuário deixa o campo {string} em branco", (field: string) => {
  cy.get(`input[name="${field}"]`).clear();
});

When("o usuário clica no botão {string}", (button: string) => {
  cy.contains("button", button).click();
});

Then("o usuário deve ser redirecionado para a página {string}", (page: string) => {
  cy.url().should("include", page);
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.get("body").then(($body) => {
    if ($body.find(`[class*="message"]`).length) {
      cy.get(`[class*="message"]`).should("contain.text", message);
    } else {
      cy.contains(message).should("be.visible");
    }
  });
});
