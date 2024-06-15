Feature: category

Scenario: Tentar adicionar categoria sem dar nome
	Given acesso a rota “/restaurant/menu/category”
	When realizar uma requisição “POST”
	Then o status da resposta retornada é “400”
	And o retorno é a mensagem “É obrigatório um nome para a categoria!”

Scenario: Adicionar categoria nova
	Given acesso a rota “/restaurant/menu/category”
	When realizar uma requisição “POST” com  o valor “Doce” no body da requisição
	Then o status da resposta retornada é “201”
	And o Json retornado é a categoria criada com parâmetros nome “Doce”

Scenario: Tentar adicionar categoria que já existe
	Given acesso a rota “/restaurant/menu/category”
	When realizar uma requisição “POST” com o valor “Doce” no body da requisição   
	Then o status da resposta retornada é “400 Bad Request”
	And o retorno é a mensagem “já existe uma category com esse nome!"

Scenario: Mudar nome de categoria
	Given acesso a rota “/restaurant/menu/category/1”
	When realizar uma requisição “PUT” com o valor “Salgado” no body da requisição
	Then o status da resposta retornada é “200 Ok”
	And o Json retornado é a categoria com nome “Salgado”

Scenario: Tentar mudar nome da categoria deixando em branco
	Given acesso a rota “/restaurant/menu/category/1”
	When realizar uma requisição “PUT”
	Then o status da resposta retornada é “400 Bad Request”
	And o retorno é a mensagem “Nome da categoria não pode ser vazio!”

Scenario: Tentar mudar nome da categoria não encontrada
	Given acesso a rota “/restaurant/menu/category/9”
	When realizar uma requisição “PUT” com o valor “Bebidas” no body da requisição
	Then o status da resposta retornada é “404”
	And o retorno é a mensagem “Categoria não encontrada!”

Scenario: Mudar nome de categoria para nome que já existe
	Given acesso a rota “/restaurant/menu/category/1”
	When realizar uma requisição “PUT” com o valor “Doce” no body da requisição
	Then o status da resposta retornada é “400”
	And o retorno é a mensagem “Já existe uma categoria com esse nome!”

Scenario: Obter todas as categorias
	Given acesso a rota “/restaurant/menu/category”
	When realizar uma requisição “GET”
	Then o status da resposta retornada é “200 Ok”
	And o Json retornado é uma lista de categorias
	And a categoria com nome “Doce” está na lista
	And a categoria com nome “Salgado” está na lista

Scenario: Obter categoria pelo Id
	Given acesso a rota “/restaurant/menu/category/2”
	When realizar uma requisição “GET”
	Then o status da resposta retornada é “200 Ok”
	And o Json retornado é a categoria com parâmetros id “2”, nome “Doce”, restauranteId ”restaurante-1” e temItens “false”

Scenario: Tentar Obter categoria com Id inexistente
	Given acesso a rota “/restaurant/menu/category/9”
	When realizar uma requisição “GET” 
	Then o status da resposta retornada é “404 Not Found”
	And o retorno é a mensagem “Categoria não encontrada!”
