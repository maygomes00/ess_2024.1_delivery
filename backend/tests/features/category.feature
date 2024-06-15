Feature: category

Scenario: Obter todas as categorias
	Given acesso a rota “/restaurant/menu/category”
	When realizar uma requisição “GET”
	Then o status da resposta retornada é “200 Ok”
	And o Json retornado é uma lista de categorias
	And a categoria com nome “Doce” está na lista
	And a categoria com nome “Salgado” está na lista
