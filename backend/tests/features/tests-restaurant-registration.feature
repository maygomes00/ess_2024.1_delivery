Feature: Restaurant Registration

Scenario: Teste de sanidade dos restaurantes
    Given acesso a rota "/restaurant/test"
    When requisção GET é efetuada
    Then o status code retornado deve ser 200
    And a mensagem de sucesso deve ser "Rota funcional"

Scenario: Tentar cadastrar um restaurante sem preencher todos os campos obrigatórios
    Given acesso a rota "/restaurant/"
    When requisção POST é efetuada com campos faltosos
    Then o status code retornado deve ser 400
    And a mensagem de erro deve ser "Faltando informações obrigatórias"

Scenario: Tentar cadastrar um restaurante com um CNPJ já cadastrado
    Given acesso a rota "/restaurant/"
    And um restaurante com um CNPJ igual a o do restaurante a ser cadastrado já existe na base de dados do sistema
    When requisção POST é efetuada com um campo de CNPJ igual a um CNPJ já cadastrado
    Then o status code retornado deve ser 409
    And a mensagem de erro deve ser "Empresa com mesmo CNPJ já cadastrada"

Scenario: Tentar cadastrar um restaurante com um email já cadastrado
    Given acesso a rota "/restaurant/"
    When requisção POST para cadastro contém um email igual a um email de um restaurante já cadastrado
    Then o status code retornado deve ser 409
    And a mensagem de erro deve ser "Restaurante de mesmo email já cadastrado"

Scenario: Tentar cadastrar um restaurante com uma senha fraca
    Given acesso a rota "/restaurant/"
    And a senha pretendida pelo usuário não atende os requisitos de segurança
    When requisção POST é efetuada com todos os campos preenchidos, incluindo uma senha fraca
    Then o status code retornado deve ser 400
    And a mensagem de erro deve ser "Senha fraca"

Scenario: Cadastro de restaurante bem sucedido
    Given acesso a rota "/restaurant/"
    When requisção POST é efetuada com todos os campos corretamente preenchidos
    Then o status code retornado deve ser 201
    And a mensagem de sucesso deve ser "Restaurante cadastrado com sucesso!"

Scenario: Consulta de restaurantes
    Given acesso a rota "/restaurant/"
    When requisção GET é efetuada com o nome do restaurante que se deseja consultar
    Then o status code retornado deve ser 200
    And lista de restaurante com nomes compatíveis deve ser retornada

Scenario: Deletar cadastro de restaurante
    Given acesso a rota "/restaurant/:id"
    When requisção DELETE é efetuada
    Then o status code retornado deve ser 200
    And a mensagem retornada deve ser "Restaurante deletado com sucesso!"
