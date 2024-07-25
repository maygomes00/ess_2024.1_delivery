Feature: Edição e Remoção de Restaurante
  As a proprietário de um restaurante
  I want to editar ou remover um restaurante
  So that para que eu possa manter as informações do meu negócio atualizadas

Scenario: Editar um restaurante existente
    Given que visito a página CRUD de restaurante
    And há um restaurante na lista
    When clico no botão de editar para um restaurante
    And atualizo os detalhes do restaurante
    And envio o formulário
    Then devo ver o restaurante atualizado na lista

Scenario: Excluir um restaurante
    Given que visito a página CRUD de restaurante
    And há um restaurante na lista
    When clico no botão de excluir para um restaurante
    Then não devo ver o restaurante na lista