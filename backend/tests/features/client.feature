Feature: Client management
   Scenario: Obter todos os usuários
    Given acesso a rota "/users"
    When realizar uma requisição "GET"
    Then o status da resposta retornada é "200 Ok"
    And o Json retornado é uma lista de usuários
    And o usuário com nome "João Silva" está na lista
    And o usuário com nome "cascão" está na lista

  Scenario: Update a client
    Given acessando a rota "users/2"
    When uma requisição PUT com nome "cascão" e email "cascadebala@example.com"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o novo nome "cascão" e novo email "cascadebala@example.com"

  Scenario: Create a client
    Given acesso a rota "/users/register"
    When realizar uma requisição "POST com nome cliente "pedro", email "pedrinhogameplays@example.com", telefone "(81) 998425642", endereço "rua dos pedreiros"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter o nome "pedro" e email "pedrinhogameplays@example.com"

  Scenario: Get a client
    Given acesso a rota "/users/1"
    When realiza uma requisição GET
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "João Silva" e email "john.doe@example.com"

  Scenario: Delete a client
    Given acesso a rota "/users/3"
    When uma requisição DELETE for enviada
    Then o status da resposta deve ser "200"
