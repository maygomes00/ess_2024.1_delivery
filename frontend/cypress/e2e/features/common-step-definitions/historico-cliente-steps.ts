import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("eu vou para a página {string} do usuário de id {string}", (page: string, userId: string) => {
  cy.visit(`/${userId}/${page}`);
});

Then("eu consigo visualizar a lista {string}", (lista: string) => {
  cy.get(`[data-cy="${lista}"]`).should("be.visible");
});

When("eu clico no nome {string} no primeiro pedido da lista {string}", (restaurantName: string, lista: string) => {
  cy.get(`[data-cy="${lista}"]`).find("li").first().contains(restaurantName).click();
});

When("eu clico no item {string} no primeiro pedido da lista {string}", (itemName: string, lista: string) => {
  cy.get(`[data-cy="${lista}"]`).find("li").first().contains(itemName).click();
});

When("eu clico no item {string} no pedido da lista {string}", (itemName: string, lista: string) => {
  cy.get(`[data-cy="${lista}"]`).find("li").contains(itemName).click();
});

Then("eu estou na página {string} do restaurante id {string}", (page: string, restaurantId: string) => {
  cy.url().should("include", `/${page}/${restaurantId}`);
});

Then(
  "eu estou na página {string} do restaurante de id {string} no item de id {string}",
  (page: string, restaurantId: string, itemId: string) => {
    cy.url().should("include", `/restaurant/${restaurantId}/${page}/${itemId}`);
  }
);
