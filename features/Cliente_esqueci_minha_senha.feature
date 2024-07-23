Feature: Recuperação de conta via E-mail / Esqueci a senha
    As a usuario
    I want to poder criar um nova senha
    So that eu possa recuperar meu acesso ao sistema

Cenário: Solicitar recuperação de senha
    Given o usuário "user" está na página de "Login"
    When o usuário seleciona a opção de "Esqueci minha Senha"
    Then o usuário é redirecionado para a  página "Esqueci Senha"

Cenário: Solicitar envio de link para recuperar senha por e-mail com e-mail correto
	Given o usuário "user" está na página de "Esqueci Senha"
    When o usuário insere e-mail "user@email.com" do seu cadastro registrado no sistema
    Then o usuário recebe mensagem de "Link para recuperação de sua senha senha foi enviado para o seu e-mail"
    
Cenário: Solicitar envio de link para recuperar senha por e-mail com e-mail incorreto ou inexistente
	Given o usuário "user" está na página de "Esqueci Senha"
    When o usuário insere e-mail do seu cadastro incorretamente com "uset@emil.com" ou e-mail não cadastrado no sistema com "email@email.com"
    Then o usuário recebe mensagem de "Não foi encontrado nenhum usuário com este e-mail!"

Cenário: Inserção de código recebido para recuperação de senha corretamente
	Given o usuário "user" está na página de "Recuperar Senha"
    When o usuário insere o código recebido por e-mail corretamente 
    Then o usuário é redirecionado para página de "Criar nova Senha" 

Scenario: Redefinir senha com sucesso
  Given o usuário está na página "Recuperar Senha"
  When o usuário preenche o campo "Nova Senha" com nova senha
  Then o usuário deve ver a mensagem "Senha nova confirmada! Tente fazer login novamente!" 
  And o usuário deve ser redirecionado para a página "Login"

Scenario: Redefinir senha com token inválido
  Given o usuário está na página "Recuperar Senha"
  When o usuário preenche o campo "Nova Senha" com nova senha
  Then o usuário deve ver a mensagem "Token inváliso ou expirado"
