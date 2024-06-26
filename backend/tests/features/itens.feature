Feature: Cadastro e manutenção de itens no cardápio
    As a restaurante
    I want to poder criar, editar e remover itens do meu cardapio
    So that eu possa exibir os itens para os clientes

Scenario: Obter item por id
    Given banco de dados tem item com id '1', active '1', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    When uma requisição GET for enviada para "/restaurant/menu/item/1"
    Then o status da resposta retornada é '200'
    And o Json retornado contem o item com id '1', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'

Scenario: Tentar obter item que não existe por id
    Given banco de dados não tem item com id '1'
    When uma requisição GET for enviada para "/restaurant/menu/item/1"
    Then o status da resposta retornada é '404'
    And retorna mensagem de erro 'item with id 1 not found'

Scenario: Obter item que não é mais ativo por id
    Given banco de dados tem item com id '1', active '0', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    When uma requisição GET for enviada para "/restaurant/menu/item/1"
    Then o status da resposta retornada é '400'
    And retorna mensagem de erro 'item is deactivated'

Scenario: Adicionar item
    Given banco de dados tem item com id '0', active '1', id de restaurante '567', nome 'Suco', preco '3.25', descricao 'Suco tropical', categorias 'Bebida' e imagem 'foto_suco'
    And banco de dados tem item com id '1', active '1', id de restaurante '654', nome 'Pastel', preco '5.50', descricao 'Pastel de sabores a sua escolha', categorias 'Salgado,Mais vendidos' e imagem 'foto_pastel'
    When uma requisição POST for enviada para "/restaurant/menu/item" com os parametros id de restaurante '123', nome 'brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    Then o status da resposta retornada é '201'
    And banco de dados tem '3' itens
    And item com id '2', active '1', id de restaurante '123', nome 'brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro' está no banco de dados

Scenario: Tentar adicionar item sem preencher todas as informações
    Given banco de dados tem item com id '0', active '1', id de restaurante '567', nome 'Suco', preco '3.25', descricao 'Suco tropical', categorias 'Bebida' e imagem 'foto_suco'
    And banco de dados tem item com id '1', active '1', id de restaurante '654', nome 'Pastel', preco '5.50', descricao 'Pastel de sabores a sua escolha', categorias 'Salgado,Mais vendidos' e imagem 'foto_pastel'
    When uma requisição POST for enviada para "/restaurant/menu/item" com os parametros id de restaurante, nome, preco, descricao, categorias e imagem todos vazios
    Then o status da resposta retornada é '400'
    And banco de dados tem '2' itens
    And retorna mensagem de erro 'item has no restaurant_id, item has no name, item has no price, item has no description, item has no categories, item has no image'

Scenario: Remover item
	Given banco de dados tem item com id '0', active '1', id de restaurante '567', nome 'Suco', preco '3.25', descricao 'Suco tropical', categorias 'Bebida' e imagem 'foto_suco'
    When uma requisição DELETE for enviada para "/restaurant/menu/item/0"
    Then o status da resposta retornada é '200'
    And item com id '0', active '0', id de restaurante '567', nome 'Suco', preco '3.25', descricao 'Suco tropical', categorias 'Bebida' e imagem 'foto_suco' está no banco de dados

Scenario: Tentar remover item que não existe
    Given banco de dados não tem item com id '123'
    When uma requisição DELETE for enviada para "/restaurant/menu/item/123"
    Then o status da resposta retornada é '404'
    And retorna mensagem de erro 'item with id 123 not found'

Scenario: Remover item que não é mais ativo
	Given banco de dados tem item com id '0', active '0', id de restaurante '567', nome 'Suco', preco '3.25', descricao 'Suco tropical', categorias 'Bebida' e imagem 'foto_suco'
    When uma requisição DELETE for enviada para "/restaurant/menu/item/0"
    Then o status da resposta retornada é '400'
    And retorna mensagem de erro 'item is already deactivated'

Scenario: Editar informações de um item
    Given banco de dados tem item com id '1', active '1', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    When uma requisição PUT for enviada para "/restaurant/menu/item/1" com os parametros id de restaurante '123', nome 'brigadeiro premium', preco '3.00', descricao 'Melhor que um brigadeiro normal', categorias 'Doce,Mais vendidos' e imagem 'foto_brigadeiro_premium'
    Then o status da resposta retornada é '200'
    And item com id '1', active '1', id de restaurante '123', nome 'brigadeiro premium', preco '3.00', descricao 'Melhor que um brigadeiro normal', categorias 'Doce,Mais vendidos' e imagem 'foto_brigadeiro_premium' está no banco de dados

Scenario: Tentar editar informações de um item que não existe
    Given banco de dados não tem item com id '12'
    When uma requisição PUT for enviada para "/restaurant/menu/item/12" com os parametros id de restaurante '123', nome 'brigadeiro premium', preco '3.00', descricao 'Melhor que um brigadeiro normal', categorias 'Doce,Mais vendidos' e imagem 'foto_brigadeiro_premium'
    Then o status da resposta retornada é '404'
    And retorna mensagem de erro 'item with id 12 not found'

Scenario: Tentar editar informações de um item sem preencher todas as informações
    Given banco de dados tem item com id '0', active '1', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    When uma requisição PUT for enviada para "/restaurant/menu/item/0" com os parametros id de restaurante, nome, preco, descricao, categorias e imagem todos vazios
    Then o status da resposta retornada é '400'
    And retorna mensagem de erro 'item has no restaurant_id, item has no name, item has no price, item has no description, item has no categories, item has no image'
    And item com id '0', active '1', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro' está no banco de dados

Scenario: Editar informações de um item que não é mais ativo
    Given banco de dados tem item com id '1', active '0', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    When uma requisição PUT for enviada para "/restaurant/menu/item/1" com os parametros id de restaurante '123', nome 'brigadeiro premium', preco '3.00', descricao 'Melhor que um brigadeiro normal', categorias 'Doce,Mais vendidos' e imagem 'foto_brigadeiro_premium'
    Then o status da resposta retornada é '400'
    And retorna mensagem de erro 'item is deactivated'

Scenario: Obter todos os itens de um restaurante
    Given restaurante de id '001' existe no banco de dados
    And banco de dados tem item com id '14', active '1', id de restaurante '001', nome 'Pizza', preco '53.80', descricao 'Pizza de 8 fatias, de até 2 sabores', categorias 'Prediletos' e imagem 'foto_pizza'
    And banco de dados tem item com id '586', active '1', id de restaurante '001', nome 'Salada', preco '15.00', descricao 'Salada normal', categorias 'Saudavel,Vegetariano' e imagem 'foto_salada'
    And banco de dados tem item com id '1', active '0', id de restaurante '001', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    When uma requisição GET for enviada para "/restaurant/menu/item/all/001"
    Then o status da resposta retornada é '200'
    And retorna lista que contem item com id '14' e id de restaurante '001'
    And retorna lista que contem item com id '586' e id de restaurante '001'
    And retorna lista que não contem item com id '1' e id de restaurante '001'

Scenario: Tentar obter os itens de um restaurante que não tem itens
    Given restaurante de id '002' existe no banco de dados
    When uma requisição GET for enviada para "/restaurant/menu/item/all/002"
    Then o status da resposta retornada é '200'
    And retorna lista vazia

Scenario: Tentar obter os itens de um restaurante que só tem item que não é mais ativo
    Given restaurante de id '002' existe no banco de dados
    And banco de dados tem item com id '1', active '0', id de restaurante '002', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce' e imagem 'foto_brigadeiro'
    When uma requisição GET for enviada para "/restaurant/menu/item/all/002"
    Then o status da resposta retornada é '200'
    And retorna lista vazia