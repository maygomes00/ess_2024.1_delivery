Feature: Cadastro de restaurantes

# In order to #? poder utilizar a plataforma de delivery para gerenciar pedidos e alcançar mais clientes
# As a #! novo restaurante
# I want to #$ me cadastrar no sistema com minhas informações básicas e de contato

    O restaurante deve ser capaz de se cadastrar na plataforma, fornecendo informações essenciais para que possa começar a receber pedidos através do sistema.

# ANCHOR #§ - US

Scenario: Cadastro de novo restaurante
    Given O usuário acessa a página de cadastro de restaurantes
    When O usuário preenche o formulário com os dados do restaurante (NOME DO RESTAURANTE, NOME DO DONO DO RESTAURANTE, CPF DO DONO, ENDEREÇO DO DONO, ENDEREÇO DO RESTAURANTE, CNPJ, TELEFONE, EMAIL, SENHA)
    And O usuário clica no botão "Cadastrar"
    Then O sistema deve registrar o novo restaurante com as informações fornecidas
    And O sistema deve exibir uma mensagem de confirmação "Cadastro realizado com sucesso"

Scenario: Cadastro de restaurante com informações incompletas
    Given O usuário acessa a página de cadastro de restaurantes
    When O usuário preenche o formulário com dados incompletos ou incorretos
    And O usuário clica no botão "Cadastrar"
    Then O sistema deve exibir mensagens de erro indicando os campos obrigatórios que precisam ser preenchidos corretamente

Scenario: Verificação de duplicidade de CNPJ
    Given O usuário acessa a página de cadastro de restaurantes
    When O usuário preenche o formulário com um CNPJ já registrado no sistema
    And O usuário clica no botão "Cadastrar"
    Then O sistema deve exibir uma mensagem de erro "CNPJ já cadastrado"

Scenario: Recuperação de senha durante o cadastro
    Given O usuário acessa a página de cadastro de restaurantes
    When O usuário clica no link "Esqueci minha senha"
    Then O sistema deve redirecionar o usuário para a página de recuperação de senha

Scenario: Cadastro de restaurante com senha fraca
    Given O usuário acessa a página de cadastro de restaurantes
    When O usuário preenche o formulário com uma senha fraca
    And O usuário clica no botão "Cadastrar"
    Then O sistema deve exibir uma mensagem de erro "Senha muito fraca. Por favor, escolha uma senha mais forte"

Scenario: Verificação de email existente
    Given O usuário acessa a página de cadastro de restaurantes
    When O usuário preenche o formulário com um email já registrado no sistema
    And O usuário clica no botão "Cadastrar"
    Then O sistema deve exibir uma mensagem de erro "Email já cadastrado"

# ANCHOR #§ - SS - SYM

Scenario: Processamento do cadastro de novo restaurante
    Given O restaurante "r_placeholder" envia uma solicitação de cadastro com dados completos (NOME DO RESTAURANTE, NOME DO DONO DO RESTAURANTE, CPF DO DONO, ENDEREÇO DO DONO, ENDEREÇO DO RESTAURANTE, CNPJ, TELEFONE, EMAIL, SENHA)
    When o sistema valida as informações (duplicidade de CNPJ, força da senha, email existente)
    Then o sistema deve registrar o novo restaurante
    And o sistema deve retornar uma confirmação de sucesso

Scenario: Validação de campos obrigatórios durante o cadastro
    Given O restaurante "r_placeholder" envia uma solicitação de cadastro com dados incompletos
    When o sistema valida as informações
    Then o sistema deve retornar mensagens de erro indicando os campos obrigatórios que precisam ser preenchidos corretamente

Scenario: Verificação de duplicidade de CNPJ no backend
    Given O restaurante "r_placeholder" envia uma solicitação de cadastro com um CNPJ já registrado
    When o sistema verifica a duplicidade do CNPJ
    Then o sistema deve retornar uma mensagem de erro "CNPJ já cadastrado"

Scenario: Registro de tentativa de cadastro com senha fraca
    Given O restaurante "r_placeholder" envia uma solicitação de cadastro com uma senha fraca
    When o sistema valida a força da senha
    Then o sistema deve retornar uma mensagem de erro "Senha muito fraca. Por favor, escolha uma senha mais forte"

Scenario: Verificação de email existente no backend
    Given O restaurante "r_placeholder" envia uma solicitação de cadastro com um email já registrado
    When o sistema verifica a duplicidade do email
    Then o sistema deve retornar uma mensagem de erro "Email já cadastrado"
