Feature: category

Scenario: Tentar adicionar categoria sem dar nome
	Given acesso a rota "/restaurant/menu/category"
	When realizar uma requisição POST
	Then o status da resposta retornada é "400"
	And o retorno é a mensagem "É obrigatório um nome para a categoria!"

Scenario: Adicionar categoria nova
    Given banco de dados tem categoria com id '1' e nome 'Bebidas'
    And banco de dados tem categoria com id '2' e nome 'Salgados'
    When uma requisição POST for enviada para "/restaurant/menu/category" com o parâmetro nome 'Doce'
    Then o status da resposta retornada é '201'
    And categoria com id '3' e nome 'Doce' está no banco de dados

Scenario: Tentar adicionar categoria que já existe
	Given banco de dados tem categoria com id '1' e nome 'Bebidas'
	When uma requisição POST for enviada para "/restaurant/menu/category" com o parâmetro id '2' e nome 'Bebidas'   
	Then o status da resposta retornada é "400"
	And o retorno é a mensagem "Já existe uma categoria com esse nome!"

Scenario: Mudar nome de categoria
	Given banco de dados tem categoria com id '1' e nome 'Salada'
	When uma requisição PUT for enviada para '/restaurant/menu/category/1' com o parâmetro nome 'Doces'
	Then o status da resposta retornada é "200"
	And categoria com id '1' e nome 'Doces' está no banco de dados

Scenario: Tentar mudar nome da categoria deixando em branco
	Given banco de dados tem categoria com id '1' e nome 'Salada'
	When realizar uma requisição PUT for enviada para "/restaurant/menu/category/1"
	Then o status da resposta retornada é "400"
	And o retorno é a mensagem "Nome da categoria não pode ser vazio!"

Scenario: Tentar mudar nome da categoria não encontrada
	Given banco de dados tem categoria com id '1' e nome 'Doces'
	When uma requisição PUT for enviada para "/restaurant/menu/category/5" com o parâmetro nome 'Salgado'
	Then o status da resposta retornada é "404"
	And o retorno é a mensagem "Categoria não encontrada!"

Scenario: Mudar nome de categoria para nome que já existe
	Given banco de dados tem categoria com id '1' e nome 'Doces'
    And banco de dados tem categoria com id '2' e nome 'Salgados'
	When uma requisição PUT for enviada para "/restaurant/menu/category/2" com o parâmetro nome 'Doces'
	Then o status da resposta retornada é "400"
	And o retorno é a mensagem "Já existe uma categoria com esse nome!"

Scenario: Obter todas as categorias
	Given banco de dados tem categoria com id '1' e nome 'Bebidas'
    And banco de dados tem categoria com id '2' e nome 'Salgados'
	When uma requisição GET for enviada para "/restaurant/menu/category"
	Then o status da resposta retornada é "200"
	And o JSON retornado é uma lista de categorias
	And a categoria com id '1' e nome "Bebidas" está na lista
	And a categoria com id '2' e nome "Salgados" está na lista

Scenario: Obter categoria pelo Id
	Given banco de dados tem categoria com id '1' e nome 'Bebidas'
	When uma requisição GET for enviada para "/restaurant/menu/category/"
	Then o status da resposta retornada é "200"
	And o JSON retornado é a categoria com parâmetro de id "1"

Scenario: Tentar Obter categoria com Id inexistente
	Given banco de dados tem categoria com id '1' e nome 'Bebidas'
	When uma requisição GET for enviada para "/restaurant/menu/category"
	Then o status da resposta retornada é "404"
	And o retorno é a mensagem "Categoria não encontrada!"

Scenario: Deletar categoria que não existe
	Given banco de dados tem categoria com id '1' e nome 'Bebidas'
	When uma requisição DELETE for enviada para "/restaurant/menu/category"
	Then o status da resposta retornada é "404"
	And o retorno é a mensagem "Categoria não encontrada!"

Scenario: Deletar categoria sem itens
	Given banco de dados de categoria tem categoria com id '1' e nome 'Doce'
    And banco de dados de itens tem item com id '1', active '0', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce,Salgado' e imagem 'foto_brigadeiro'
	When uma requisição DELETE for enviada para "/restaurant/menu/category/1"
	Then o status da resposta retornada é "200"
	And o retorno é a mensagem "Categoria deletada com sucesso!"

Scenario: Deletar categoria com itens
	Given banco de dados de categoria tem categoria com id '1' e nome 'Salgado'
    And banco de dados de itens tem item com id '1', active '1', id de restaurante '123', nome 'Brigadeiro', preco '1.00', descricao 'Brigadeiro normal', categorias 'Doce,Salgado' e imagem 'foto_brigadeiro'
	When uma requisição DELETE for enviada para "/restaurant/menu/category/1"
	Then o status da resposta retornada é "400"
	And o retorno é a mensagem "Categoria com itens! Não pode ser deletada!"