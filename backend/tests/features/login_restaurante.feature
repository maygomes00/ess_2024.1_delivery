Feature: Login Restaurante

Scenario: Realizar login de um restaurante com sucesso
	Given acesso a rota "/login/restaurant"
	When  realizo uma requisição "POST"
	Then  o status da resposta retornada da API é "200"
    And o retorno deve ser a mensagem "Login successful"

Scenario: Realizar login de um restaurante com senha incorreta
	Given acesso a rota "/login/restaurant"
	When  realizo uma requisição "POST" com o email "undecillion@example.com" e o password "wrongpassword!"
	Then  o status da resposta retornada da API é "401"
    And o retorno deve ser a mensagem "Invalid credentials"

Scenario: Realizar login de um restaurante com e-mail incorreto
	Given acesso a rota "/login/restaurant"
	When  realizo uma requisição "POST" com o email "undecillion@gmail.com" e o password "!secureP4$$W0RD1234"
	Then  o status da resposta retornada da API é "401"
    And o retorno deve ser a mensagem "Invalid credentials"

Scenario: Realizar login de um restaurante com credenciais de Cliente
	Given acesso a rota "/login/restaurant"
	When  realizo uma requisição "POST" com o email "joao.silva@example.com" e o password "senha123"
	Then  o status da resposta retornada da API é "401"
    And o retorno deve ser a mensagem "Invalid credentials"