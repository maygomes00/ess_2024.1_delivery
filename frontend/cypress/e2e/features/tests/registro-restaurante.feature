Feature: Operações CRUD de Restaurante

  Scenario: Criar um novo restaurante
    Given que visito a página CRUD de restaurante
    When preencho o formulário do restaurante
    And envio o formulário
    Then devo ver o novo restaurante na lista

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
