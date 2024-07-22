import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuario esta na página {string}", (page) => {
  cy.visit(`http://localhost:3000${page}`);
});

When("o usuário clica no botão {string}", (button) => {
  cy.get(`[data-cy=${button}]`).click();
});

When("escreve o nome {string} e aperta o botão {string}", (categoryName: string, button) => {
  cy.get('[data-cy=categoryNameInput]').type(categoryName); // Certifique-se de que o campo de entrada tem o data-cy 'categoryNameInput'
  cy.get(`[data-cy=${button}]`).click();
});

Then("o usuario vai para a pagina {string} e ver a categoria {string}", (page, categoryName) => {
  cy.url().should("include", page);
  cy.get(`[data-cy=category-item-${categoryName}]`).should("contain", categoryName);
});
