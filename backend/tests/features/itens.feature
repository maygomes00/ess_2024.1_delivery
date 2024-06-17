Feature: Cadastro e manutenção de itens no cardápio
    As a restaurante
    I want to poder criar, editar e remover itens do meu cardapio
    So that eu possa exibir os itens para os clientes

Scenario: Obter item por id
    Given item com id “1”, id de restaurante “123”, nome “brigadeiro”, preco “1.00”, descricao “Brigadeiro normal” e categorias “987” existe no banco de dados de itens
    When uma requisição GET for enviada para "/restaurant/menu/item/1"
    Then o status da resposta retornada é “200”
    And o Json retornado contem os parametros id “1”, id de restaurante “123”, nome “brigadeiro”, preco “1.00”, descricao “Brigadeiro normal” e categorias “987”

#Scenario: Tentar obter item que não existe por id
#    Given banco de dados não tem item com id “12”
#    When uma requisição GET for enviada para "/restaurant/menu/item/12"
#    Then o status da resposta retornada é “404"
#    And retorna mensagem de erro “item with id 12 not found”

#Scenario: Adicionar item
#    Given banco de dados tem item com id “0”, id de restaurante “567”, nome “Suco”, preco “3.25”, descricao “Suco tropical” e categorias “1579”
#    And banco de dados tem item com id “1”, id de restaurante “987”, nome “Pastel”, preco “5.50”, descricao “Pastel de sabores a sua escolha” e categorias “2678,4454,1111”
#    When uma requisição POST for enviada para "/restaurant/menu/item" com os parametros id de restaurante “123”, nome “brigadeiro”, preco “1.00”, descricao “Brigadeiro normal” e categorias “987”
#    Then o status da resposta retornada é “201”
#    And banco de dados tem item com id “2”, id de restaurante “123”, nome “brigadeiro”, preco “1.00”, descricao “Brigadeiro normal” e categorias “987”
#
#Scenario: Tentar adicionar item sem preencher todas as informações
#    Given banco de dados tem item com id “0”, id de restaurante “567”, nome “Suco”, preco “3.25”, descricao “Suco tropical” e categorias “1579”
#    And banco de dados tem item com id “1”, id de restaurante “987”, nome “Pastel”, preco “5.50”, descricao “Pastel de sabores a sua escolha” e categorias “2678,4454,1111”
#    When uma requisição POST for enviada para "/restaurant/menu/item" com os parametros id de restaurante, nome, preco, descricao e categorias todos vazios
#    Then o status da resposta retornada é “400"
#    And banco de dados tem “2” itens
#
#Scenario: Remover item
#	Given banco de dados tem item com id “0”, id de restaurante “567”, nome “Suco”, preco “3.25”, descricao “Suco tropical” e categorias “1579”
#    And banco de dados tem item com id “1”, id de restaurante “987”, nome “Pastel”, preco “5.50”, descricao “Pastel de sabores a sua escolha” e categorias “2678,4454,1111”
#    And banco de dados tem item com id “2”, id de restaurante “232”, nome "Torta", preco “10.00”, descricao “Torta media” e categorias “2678, 4664”
#    When uma requisição DELETE for enviada para "/restaurant/menu/item/1"
#    Then o status da resposta retornada é “200”
#    And banco de dados tem item com id “0”, id de restaurante “567”, nome “Suco”, preco “3.25”, descricao “Suco tropical” e categorias “1579”
#    And banco de dados tem item com id “1”, id de restaurante “232”, nome "Torta", preco “10.00”, descricao “Torta media” e categorias “2678, 4664”
#
#Scenario: Tentar remover item que não existe
#    Given banco de dados não tem item com id “123”
#    When uma requisição DELETE for enviada para "/restaurant/menu/item/123"
#    Then o status da resposta retornada é “404”
#    And retorna mensagem de erro “There is no item with id 123”
#
#Scenario: Editar informações de um item
#    Given item com id “0”, id de restaurante “123”, nome “brigadeiro”, preco “1.00”, descricao “Brigadeiro normal” e categorias “987” existe no banco de dados de itens
#    When uma requisição PUT for enviada para "/restaurant/menu/item/0" com os parametros id de restaurante “123”, nome “brigadeiro premium”, preco “3.00”, descricao “Melhor que um brigadeiro normal” e categorias “987, 475”
#    Then o status da resposta retornada é “200”
#    And item com id “0” tem os parametros id de restaurante “123”, nome “brigadeiro premium”, preco “3.00”, descricao “Melhor que um brigadeiro normal” e categorias “987, 475”
#
#Scenario: Tentar editar informações de um item que não existe
#    Given banco de dados não tem item com id “12”
#    When uma requisição PUT for enviada para "/restaurant/menu/item/12" com os parametros id de restaurante “123”, nome “brigadeiro premium”, preco “3.00”, descricao “Melhor que um brigadeiro normal” e categorias “987, 475”
#    Then o status da resposta retornada é “404”
#    And retorna mensagem de erro “item with id 12 not found”
#
#Scenario: Tentar editar informações de um item sem preencher todas as informações
#    Given item com id “0”, id de restaurante “123”, nome “brigadeiro”, preco “1.00”, descricao “Brigadeiro normal” e categorias “987” existe no banco de dados de itens
#    When uma requisição PUT for enviada para "/restaurant/menu/item/0" com os parametros id de restaurante, nome, preco, descricao e categorias todos vazios
#    Then o status da resposta retornada é “400”
#    And item com id “0” tem os parametros id de restaurante “123”, nome “brigadeiro”, preco “1.00”, descricao “Brigadeiro normal” e categorias “987”
#
#    Scenario: Obter todos os itens de um restaurante
#    Given item com id “0” e id de restaurante “123” existe no banco de dados
#    And item com id “1” e id de restaurante “123” existe no banco de dados
#    When uma requisição GET for enviada para "/restaurant/menu/item/all/123"
#    Then o status da resposta retornada é “200”
#    And retorna lista que contem item com id “1” e id de restaurante “123”
#    And retorna lista que contem item com id “2” e id de restaurante “123”
#
#Scenario: Tentar obter os itens de um restaurante que não tem itens
#    Given Banco de dados não tem item com id de restaurante “123”
#    When uma requisição GET for enviada para "/restaurant/menu/item/all/123"
#    Then o status da resposta retornada é “200”
#    And retorna lista vazia
#
#Scenario: Tentar obter os itens de um restaurante que não existe
#    Given restaurante “123” não existe no banco de dados
#    When uma requisição GET for enviada para "/restaurant/menu/item/all/123"
#    Then o status da resposta retornada é “404”
#    And retorna mensagem de erro “restaurant with id 123 not found” """
#