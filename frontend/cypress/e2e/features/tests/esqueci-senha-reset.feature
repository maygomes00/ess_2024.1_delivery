Feature: Redefinir Senha
  Como um usuário cliente
  Eu quero redefinir minha senha usando um link de recuperação
  Para que eu possa acessar minha conta com uma nova senha

Scenario: Redefinir senha com sucesso
  Given o usuário está na página "forgot-password/reset/:token"
  When o usuário preenche o campo "new-password-input" com "novasenha123" e clica no botão "reset-password-button"
  Then o usuário deve ver a mensagem "Senha nova confirmada! Tente fazer login novamente!" no modal
  And o usuário deve ver o botão "modal-button" no modal
  And o usuário clica no botão "modal-button"
  And o usuário deve ser redirecionado para a página "login-client"

Scenario: Redefinir senha com token inválido
  Given o usuário está na página "forgot-password/reset/:token"
  When o usuário preenche o campo "new-password-input" com "novasenha123" e clica no botão "reset-password-button"
  Then o usuário deve ver a mensagem "Invalid or expired token: :token" no modal
  And o usuário deve ver o botão "Fechar" no modal
