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

Um linha teste
