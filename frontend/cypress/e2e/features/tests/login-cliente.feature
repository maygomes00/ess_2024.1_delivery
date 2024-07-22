Feature: Login de Cliente
  Como usuário do sistema
  Eu quero fazer login no sistema
  Para acessar a área de cliente

Scenario: Login com credenciais válidas
  Given o usuário está na página "login-client"
  When o usuário preenche o campo "email" com "john.doe@example.com"
  And o usuário preenche o campo "password" com "senha123"
  And o usuário clica no botão "Entrar"
  Then o usuário deve ser redirecionado para a página "home-client"

Scenario: Login com e-mail inválido
  Given o usuário está na página "login-client"
  When o usuário preenche o campo "email" com "invalid@user.com"
  And o usuário preenche o campo "password" com "senha123"
  And o usuário clica no botão "Entrar"
  Then o usuário deve ver a mensagem "Invalid credencials"

Scenario: Login com senha inválida
  Given o usuário está na página "login-client"
  When o usuário preenche o campo "email" com "john.doe@example.com"
  And o usuário preenche o campo "password" com "invalidpassword"
  And o usuário clica no botão "Entrar"
  Then o usuário deve ver a mensagem "Invalid credencials"

Scenario: Login com e-mail em branco
  Given o usuário está na página "login-client"
  When o usuário deixa o campo "email" em branco
  And o usuário preenche o campo "password" com "senha123"
  And o usuário clica no botão "Entrar"
  Then o usuário deve ver a mensagem "E-mail inválido"

Scenario: Login com senha em branco
  Given o usuário está na página "login-client"
  When o usuário preenche o campo "email" com "john.doe@example.com"
  And o usuário deixa o campo "password" em branco
  And o usuário clica no botão "Entrar"
  Then o usuário deve ver a mensagem "A senha deve ser informada"

Scenario: Navegar para a página de recuperação de senha
  Given o usuário está na página "login-client"
  When o usuário clica no link "Esqueci minha Senha"
  Then o usuário deve ser redirecionado para a página "forgot-password"