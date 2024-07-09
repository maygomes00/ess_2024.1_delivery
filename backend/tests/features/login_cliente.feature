Feature: Login Cliente

Scenario: Realizar login de um cliente com sucesso
	Given acesso a rota "/login-client"
	When  realizo uma requisição "POST"
	Then  o status da resposta retornada da API é "200"
    And o retorno deve ser a mensagem "Login successful"

Scenario: Realizar login de um cliente com senha incorreta
	Given acesso a rota "/login-client"
	When  realizo uma requisição "POST" com o email "john.doe@example.com" e o password "senha456"
	Then  o status da resposta retornada da API é "401"
    And o retorno deve ser a mensagem "Invalid credentials"

Scenario: Realizar login de um cliente com e-mail incorreto
	Given acesso a rota "/login-client"
	When  realizo uma requisição "POST" com o email "john.doe@gmail.com" e o password "senha123"
	Then  o status da resposta retornada da API é "401"
    And o retorno deve ser a mensagem "Invalid credentials"