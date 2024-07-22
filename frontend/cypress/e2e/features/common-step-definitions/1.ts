// e.g Given("o usuário "tal" está logado", (page: string) => {});
import { Given } from 'cypress-cucumber-preprocessor/steps';

Given("o usuário está na página {string}", (page) => {
  cy.visit(`/${page}`);
});