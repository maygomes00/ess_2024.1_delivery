Feature: Login restaurante
	As a gerente de restaurante
	I want to fazer login na minha conta usando meu nome de usuário e senha
	so that posso acessar e gerenciar minha conta de restaurante

Scenario: Realizar login de um restaurante com sucesso
	Given estou na página de login de restaurante
	When  preencho os campos “username” com “Restaurante1” e o campo “password” com “rest123”
	And   pressiono o “Log In” 
	Then  sou direcionado para a tela “Home” como usuário “restaurante1”

Scenario: Realizar login de um restaurante com senha incorreta
	Given estou na página de login de restaurante
	When  preencho os campos “username” com “Restaurante1” e o campo “password” com “rest1”
	And   pressiono o “Log In” 
	Then  eu ainda estou na página de login
	And   vejo o campo “password” com o contorno vermelho
	And   vejo uma mensagem de erro abaixo do campo de senha dizendo “senha incorreta”

Scenario: Realizar login de um restaurante com usuário incorreto
	Given estou na página de login de restaurante
	When  preencho os  campos “username” com “Restautaurante1” e “password” com “rest123”
	And   pressiono o “Log In” 
	Then  eu ainda estou na página de login
	And   vejo o campo “username”  com o contorno vermelho
	And   vejo uma mensagem de erro abaixo do campo “password” dizendo “usuário incorreto”

Scenario: Realizar login de um cliente no perfil de restaurante
	Given estou na página de login de restaurante
	When  preencho os campos login com “Cliente1” e senha com “cliente123”
	And   pressiono o “Log In” 
	Then  vejo uma mensagem de erro na tela dizendo “Você está no perfil de restaurante, se quer logar como cliente mude o perfil”
