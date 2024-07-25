Feature: Cadastro de restaurante na plataforma
  As a usuário do sistema
  I want to cadastrar um restaurante
  So that ele possa ser encontrado pelos clientes

Scenario: Teste de sanidade
  Given o usuário está na página "register-restaurant"
  When o usuário clica o botão "Run Sanity Test"
  Then o usuário deve ver a mensagem "Sanity test Passed!"

Scenario: Cadastro de restaurante com sucesso
  Given o usuário está na página "register-restaurant"
  When o usuário preenche o campo "restaurant_name" com "ABCDEGHIJKLMNO"
  And o usuário preenche o campo "restaurant_address" com "5678 Second St, Anytown, AN"
  And o usuário preenche o campo "email" com "testtest22@example.com"
  And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
  And o usuário preenche o campo "owner_name" com "James Smith"
  And o usuário preenche o campo "owner_cpf" com "12345678901"
  And o usuário preenche o campo "owner_address" com "1234 First St, Anytown, AN"
  And o usuário preenche o campo "owner_telephone" com "123456789"
  And o usuário preenche o campo "restaurant_cnpj" com "XXXXXXX0"
  And o usuário preenche o campo "restaurant_telephone" com "00 0000 0000"
  And o usuário clica no botão "Submit"
  Then o usuário deve ver a mensagem "Restaurante registrado com sucesso, você será redirecionado para a página de login em 3 segundos."
  And o usuário deve ser redirecionado para a página "login-restaurant"


# Scenario: Tentar cadastrar um restaurante sem preencher todos os campos obrigatórios
#   Given o usuário está na página "register-restaurant"
#   When o usuário não preenche o campo "restaurant_name"
#   And o usuário preenche o campo "restaurant_address" com "5678 Second St, Anytown, AN"
#   And o usuário preenche o campo "email" com "testtest33@example.com"
#   And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
#   And o usuário preenche o campo "owner_name" com "James Smith"
#   And o usuário preenche o campo "owner_cpf" com "12345678901"
#   And o usuário preenche o campo "owner_address" com "1234 First St, Anytown, AN"
#   And o usuário preenche o campo "owner_telephone" com "123456789"
#   And o usuário preenche o campo "restaurant_cnpj" com "11XXXX0"
#   And o usuário preenche o campo "restaurant_telephone" com "00 0000 0000"


# Scenario: Cadastro de restaurante com CNPJ já cadastrado
#   Given o usuário está na página "register-restaurant"
#   When o usuário preenche o campo "restaurant_name" com "ABCDEGHIJKLMNO"
#   And o usuário preenche o campo "restaurant_address" com "5678 Second St, Anytown, AN"
#   And o usuário preenche o campo "email" com "testtest22@example.com"
#   And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
#   And o usuário preenche o campo "owner_name" com "James Smith"
#   And o usuário preenche o campo "owner_cpf" com "12345678901"
#   And o usuário preenche o campo "owner_address" com "1234 First St, Anytown, AN"
#   And o usuário preenche o campo "owner_telephone" com "123456789"
#   And o usuário preenche o campo "restaurant_cnpj" com "XXXXXXX0"
#   And o usuário preenche o campo "restaurant_telephone" com "00 0000 0000"


# Scenario: Cadastro de restaurante com email já cadastrado
#   Given o usuário está na página "register-restaurant"
#   When o usuário preenche o campo "restaurant_name" com "ABCDEGHIJKLMNO"
#   And o usuário preenche o campo "restaurant_address" com "5678 Second St, Anytown, AN"
#   And o usuário preenche o campo "email" com "testtest22@example.com"
#   And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
#   And o usuário preenche o campo "owner_name" com "James Smith"
#   And o usuário preenche o campo "owner_cpf" com "12345678901"
#   And o usuário preenche o campo "owner_address" com "1234 First St, Anytown, AN"
#   And o usuário preenche o campo "owner_telephone" com "123456789"
#   And o usuário preenche o campo "restaurant_cnpj" com "ZZZZZZZZ0"
#   And o usuário preenche o campo "restaurant_telephone" com "00 0000 0000"


# Scenario: Cadastro de restaurante com senha fraca
#   Given o usuário está na página "register-restaurant"
#   When o usuário preenche o campo "restaurant_name" com "ABCDEGHIJKLMNO"
#   And o usuário preenche o campo "restaurant_address" com "5678 Second St, Anytown, AN"
#   And o usuário preenche o campo "email" com "testtest22@example.com"
#   And o usuário preenche o campo "password" com "!secureP4$$W0RD1234"
#   And o usuário preenche o campo "owner_name" com "James Smith"
#   And o usuário preenche o campo "owner_cpf" com "12345678901"
#   And o usuário preenche o campo "owner_address" com "1234 First St, Anytown, AN"
#   And o usuário preenche o campo "owner_telephone" com "123456789"
#   And o usuário preenche o campo "restaurant_cnpj" com "XXXXXXX0"
#   And o usuário preenche o campo "restaurant_telephone" com "00 0000 0000"