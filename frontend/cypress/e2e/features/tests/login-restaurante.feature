Feature: Login de Restaurante

  Scenario: Login com credenciais válidas
    Given o usuário está na página "login-restaurant"
    When o usuário preenche o campo "email" com "undecillion2@example.com"
    And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ser redirecionado para a página "home-restaurant"

  Scenario: Login com e-mail inválido
    Given o usuário está na página "login-restaurant"
    When o usuário preenche o campo "email" com "invalid@restaurant.com"
    And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ver a mensagem "Invalid credentials"

  Scenario: Login com senha inválida
    Given o usuário está na página "login-restaurant"
    When o usuário preenche o campo "email" com "undecillion2@example.com"
    And o usuário preenche o campo "password" com "invalidpassword"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ver a mensagem "Invalid credentials"

  Scenario: Login com e-mail em branco
    Given o usuário está na página "login-restaurant"
    When o usuário deixa o campo "email" em branco
    And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ver a mensagem "E-mail inválido"

  Scenario: Login com senha em branco
    Given o usuário está na página "login-restaurant"
    When o usuário preenche o campo "email" com "undecillion2@example.com"
    And o usuário deixa o campo "password" em branco
    And o usuário clica no botão "Entrar"
    Then o usuário deve ver a mensagem "A senha deve ser informada"

