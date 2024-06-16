Feature: Cadastro e manutenção de itens no cardápio
    As a restaurante
    I want to poder criar, editar e remover itens do meu cardapio
    So that eu possa exibir os itens para os clientes

Scenario: Obter todos os itens de um restaurante
    Given item com id “0” e id de restaurante “123” existe no banco de dados
    And item com id “1” e id de restaurante “123” existe no banco de dados
    When uma requisição GET for enviada para "/restaurant/menu/item/all/123"
    Then o status da resposta retornada é “200”
    And retorna lista que contem item com id “1” e id de restaurante “123”
    And retorna lista que contem item com id “2” e id de restaurante “123”

