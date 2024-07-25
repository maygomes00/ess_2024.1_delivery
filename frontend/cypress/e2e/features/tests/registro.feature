Feature: Cadastro de restaurante na plataforma
  As a usuário do sistema
  I want to cadastrar um restaurante
  So that ele possa ser encontrado pelos clientes

Scenario: Teste de sanidade
  Given o usuário está na página "register-restaurant"
  When o usuário clica o botão "Run Sanity Test"
  Then o usuário deve ver a mensagem "Sanity test Passed!"