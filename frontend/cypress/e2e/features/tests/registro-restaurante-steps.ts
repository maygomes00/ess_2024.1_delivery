import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Given
Given('que visito a página CRUD de restaurante', () => {
  cy.visit('/restaurant-crud'); // Página CRUD de restaurante
});

// When
When('preencho o formulário do restaurante', () => {
  cy.get('input[data-cy="restaurant_name"]').type('Novo Restaurante');
  cy.get('input[data-cy="restaurant_address"]').type('Rua Nova, 123');
  cy.get('input[data-cy="email"]').type('novo@restaurante.com');
  cy.get('input[data-cy="password"]').type('SenhaSegura123');
  cy.get('input[data-cy="owner_name"]').type('Novo Dono');
  cy.get('input[data-cy="owner_cpf"]').type('123.456.789-00');
  cy.get('input[data-cy="owner_address"]').type('Rua Velha, 456');
  cy.get('input[data-cy="owner_telephone"]').type('11 1111-1111');
  cy.get('input[data-cy="restaurant_cnpj"]').type('12.345.678/0001-99');
  cy.get('input[data-cy="restaurant_telephone"]').type('22 2222-2222');
});

When('envio o formulário', () => {
  cy.get('button[data-cy="submit-button"]').click();
});

Then('devo ver o novo restaurante na lista', () => {
  cy.get('div[data-cy="restaurant-list"]').should('contain', 'Novo Restaurante');
});

// Edit Scenario
When('clico no botão de editar para um restaurante', () => {
  cy.get('button[data-cy="edit-button"]').first().click();
});

When('atualizo os detalhes do restaurante', () => {
  cy.get('input[data-cy="restaurant_name"]').clear().type('Restaurante Atualizado');
  cy.get('input[data-cy="restaurant_address"]').clear().type('Rua Atualizada, 456');
  cy.get('input[data-cy="email"]').clear().type('atualizado@restaurante.com');
  cy.get('input[data-cy="password"]').clear().type('NovaSenha123');
  cy.get('input[data-cy="owner_name"]').clear().type('Dono Atualizado');
  cy.get('input[data-cy="owner_cpf"]').clear().type('987.654.321-00');
  cy.get('input[data-cy="owner_address"]').clear().type('Rua Nova, 789');
  cy.get('input[data-cy="owner_telephone"]').clear().type('33 3333-3333');
  cy.get('input[data-cy="restaurant_cnpj"]').clear().type('98.765.432/0001-00');
  cy.get('input[data-cy="restaurant_telephone"]').clear().type('44 4444-4444');
});

Then('devo ver o restaurante atualizado na lista', () => {
  cy.get('div[data-cy="restaurant-list"]').should('contain', 'Restaurante Atualizado');
});

// Delete Scenario
When('clico no botão de excluir para um restaurante', () => {
  cy.get('button[data-cy="delete-button"]').first().click();
});

Then('não devo ver o restaurante na lista', () => {
  cy.get('div[data-cy="restaurant-list"]').should('not.contain', 'Restaurante Atualizado');
});
