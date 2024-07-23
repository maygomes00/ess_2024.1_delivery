Feature: Redefinição de Senha
  Como usuário do sistema
  Eu quero redefinir minha senha
  Para acessar a área de cliente com uma nova senha

Scenario: Redefinição de senha com token válido
  Given o usuário está na página "forgot-password/reset/valid-token"
  When o usuário preenche a nova senha com "novaSenhaSegura123"
  And o usuário clica no botão "Redefinir Senha"
  Then o usuário deve ver a mensagem "Senha nova confirmada! Tente fazer login novamente!"
  And o usuário clica no botão "Ir para Login"
  And o usuário deve ser redirecionado para a página "login-client"

Scenario: Redefinição de senha com token inválido
  Given o usuário está na página "forgot-password/reset/invalid-token"
  When o usuário preenche a nova senha com "novaSenhaSegura123"
  And o usuário clica no botão "Redefinir Senha"
  Then o usuário deve ver a mensagem "Token is invalid or has expired"
  And o usuário clica no botão "Fechar"
  And o modal deve fechar
