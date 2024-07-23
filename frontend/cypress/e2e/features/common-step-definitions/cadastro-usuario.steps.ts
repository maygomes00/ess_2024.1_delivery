import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page);
});

When("o usuário preenche o campo {string} com {string}", (field: string, value: string) => {
  cy.get(`[data-cy=${field}]`).type(value);
});

When("o usuário não preenche o campo {string}", (field: string) => {
  cy.get(`[data-cy=${field}]`).should("be.empty");
});

When("o usuário clica no botão deletar", () => {
  cy.get('@firstUserRow').find('[data-cy=deletar]').click();
});

When("o usuário clica no botão {string}", (button: string) => {
  cy.get(`[data-cy=${button}]`).click();
});

When("o usuário seleciona um usuário existente", () => {
  cy.get('tr').first().as('firstUserRow');
});

When("o usuário clica no botão deletar", () => {
  cy.get('@firstUserRow').find('[data-cy=deletar]').first().click();
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(message);
  });
});

Then("o sistema deve atualizar o usuário com sucesso", () => {
  cy.get('.message').should('contain', 'Usuário atualizado com sucesso!');
});