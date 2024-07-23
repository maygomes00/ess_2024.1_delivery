Feature: Recuperação de Senha
  Como um usuário
  Eu quero recuperar minha senha
  Para que eu possa redefinir minha senha caso a esqueça

Scenario: Enviar link de recuperação de senha com email válido
  Given o usuário está na página "forgot-password"
  When o usuário preenche o campo "email" com "john.doe@example.com" e clica no botão "submit-button"
  Then o usuário deve ver a mensagem "Link para recuperação de sua senha senha foi enviado para o seu e-mail" no modal
  And o usuário deve ver o botão "go-to-login-button" no modal
  And o usuário clica no botão "go-to-login-button"
  And o usuário deve ser redirecionado para a página "login-client"

Scenario: Enviar link de recuperação de senha com email inválido
  Given o usuário está na página "forgot-password"
  When o usuário preenche o campo "email" com "invalid@user.com" e clica no botão "submit-button"
  Then o usuário deve ver a mensagem "Não foi encontrado nenhum usuário com este e-mail!" no modal
  And o usuário deve ver o botão "close-button" no modal
