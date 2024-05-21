Feature: Login de clientes

# In order to #? acessar suas contas e realizar pedidos de comida
# As a #! cliente
# I want to #$ fazer login usando e-mail e senha e manter minha sessão guardada

    Clientes poderão realizar login usando e-mail e senha. O sistema será capaz de guardar a sessão do usuário após o login. Não é necessário usar um nome de usuário, apenas o e-mail.

# ANCHOR #§ - US

Scenario: Login com e-mail e senha
    Given o cliente "c_placeholder" está na tela de login
    When o cliente insere o e-mail "email_placeholder"
    And o cliente insere a senha "senha_placeholder"
    And o cliente clica no botão "Login"
    Then o cliente deve ser redirecionado para a tela principal
    And uma mensagem de boas-vindas "Bem-vindo, c_placeholder" deve ser exibida
    And a sessão do cliente deve ser guardada para acessos futuros

Scenario: Login com credenciais incorretas
    Given o cliente "c_placeholder" está na tela de login
    When o cliente insere o e-mail "email_placeholder"
    And o cliente insere a senha "senha_incorreta"
    And o cliente clica no botão "Login"
    Then uma mensagem de erro "E-mail ou senha incorretos" deve ser exibida
    And o cliente deve permanecer na tela de login

Scenario: Logout e redirecionamento para a tela de login
    Given o cliente "c_placeholder" está logado e na tela principal
    When o cliente clica no botão "Logout"
    Then o cliente deve ser redirecionado para a tela de login
    And a sessão do cliente deve ser encerrada

Scenario: Cliente esqueceu a senha
    Given o cliente "c_placeholder" está na tela de login
    When o cliente clica no link "Esqueci minha senha"
    Then o cliente deve ser redirecionado para a tela de recuperação de senha

# ANCHOR #§ - SS - SYM

Scenario: Autenticação de cliente com e-mail e senha
    Given o cliente "c_placeholder" envia uma solicitação de login com o e-mail "email_placeholder" e a senha "senha_placeholder" corretos
    When o sistema valida as credenciais
    Then o sistema deve autenticar o cliente
    And o sistema deve gerar um token de sessão
    And o sistema deve armazenar o token de sessão para acessos futuros

Scenario: Rejeição de autenticação com credenciais incorretas
    Given o cliente "c_placeholder" envia uma solicitação de login com o e-mail "email_placeholder" e a senha "senha_incorreta"
    When o sistema valida as credenciais
    Then o sistema deve rejeitar a autenticação
    And o sistema deve retornar uma mensagem de erro "E-mail ou senha incorretos"

Scenario: Encerramento de sessão de cliente
    Given o cliente "c_placeholder" está autenticado no sistema
    When o cliente envia uma solicitação de logout
    Then o sistema deve encerrar a sessão do cliente
    And o sistema deve invalidar o token de sessão armazenado
    And o sistema deve confirmar o logout ao cliente

Scenario: Manutenção da sessão do cliente
    Given o cliente "c_placeholder" fez login no sistema anteriormente
    And o token de sessão do cliente ainda é válido
    When o cliente abre o aplicativo novamente
    Then o sistema deve reconhecer o cliente automaticamente
    And o sistema deve manter o cliente logado
    And o cliente deve ser redirecionado para a tela principal