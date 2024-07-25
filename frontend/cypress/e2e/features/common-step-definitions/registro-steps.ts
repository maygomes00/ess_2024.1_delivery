import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(`/${page}`);
});
When("o usuário clica o botão {string}", (button: string) => {
  cy.get(`button[data-cy="${button}"]`).click();
});
Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.contains(message).should("be.visible");
});