Feature: Recuperação de conta via E-mail / Esqueci a senha
    As a usuario
    I want to poder criar um nova senha
    So that eu possa recuperar meu acesso ao sistema

Cenário: Solicitar recuperação de senha
    Given o usuário está na página de "Login"
    When o usuário seleciona a opção de "Esqueci minha Senha"
    Then o usuário é redirecionado para a  página "Esqueci Senha"

Cenário: Solicitar envio de código para recuperar senha por e-mail e-mail com e-mail correto
	Given o usuário está na página de "Esqueci Senha"
    When o usuário insere e-mail do seu cadastro registrado no sistema
    Then o usuário recebe mensagem de "Código enviado para o seu e-mail"
    
Cenário: Solicitar envio de código para recuperar senha por e-mail com e-mail incorreto ou inexistente
	Given o usuário está na página de "Esqueci Senha"
    When o usuário insere e-mail do seu cadastro incorretamente ou e-mail não cadastrado no sistema
    Then o usuário recebe mensagem de "Este e-mail não está cadastrado no sistema"

Cenário: Inserção de código recebido para recuperação de senha corretamente
	Given o usuário está na página de "Recuperar Senha"
    When o usuário insere o código recebido por e-mail corretamente 
    Then o usuário é redirecionado para página de "Criar nova Senha" 

Cenário: Inserção de código para recuperação de senha incorreto
    Given o usuário está na página de "Recuperar Senha"
    When o usuário insere o código recebido por e-mail incorretamente Then o usuário recebe uma mensagem "Código inválido"
    And o usuário é redirecionado para página de "Recuperar Senha"

Cenário: Inserção de nova senha válida
    Given o usuário está na página de "Criar nova Senha"
    When o usuário insere uma "Nova Senha"
    Then o usuário recebe uma mensagem "Senha Atualizada!"
    And o usuário é redirecionado para página de "Login"
    Then Teste para roteiro

[teste para roteriro]
