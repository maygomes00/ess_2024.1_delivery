import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("eu vou para a página {string} do usuário de id {string}", (page: string, userId: string) => {
  cy.visit(`/${userId}/${page}`);
});

// Given("o sistema não possui nenhum pedido associado a meu perfil", () => {
//   // Intercepta a chamada para garantir que não há pedidos
//   cy.intercept('GET', '/api/orders', {
//     statusCode: 200,
//     body: []
//   }).as('getOrders');
// });

// Given("o sistema tem registrado, associado a meu perfil, o pedido {string} o pedido {string}", (pedido1: string, pedido2: string) => {
//   // Intercepta a chamada para garantir que há pedidos específicos
//   cy.intercept('GET', '/api/orders', {
//     statusCode: 200,
//     body: [
//       { id: pedido1, details: 'Detalhes do pedido 3091' },
//       { id: pedido2, details: 'Detalhes do pedido 4001' }
//     ]
//   }).as('getOrders');
// });

// Given("o sistema tem registrado, associado a meu perfil, o pedido de número {string} com o item {string}, restaurante {string} valor {string}, status {string}, data {string} e o pedido de número {string} com o item {string}, restaurante {string} valor {string}, status {string}, data {string}",
// (pedido1: string, item1: string, restaurante1: string, valor1: string, status1: string, data1: string, pedido2: string, item2: string, restaurante2: string, valor2: string, status2: string, data2: string) => {
//   // Intercepta a chamada para garantir que há pedidos específicos
//   cy.intercept('GET', '/api/orders', {
//     statusCode: 200,
//     body: [
//       { id: pedido1, item: item1, restaurant: restaurante1, value: valor1, status: status1, date: data1 },
//       { id: pedido2, item: item2, restaurant: restaurante2, value: valor2, status: status2, date: data2 }
//     ]
//   }).as('getOrders');
// });

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
