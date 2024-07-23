Feature: Histórico de pedidos
    As a cliente
    I want to ver minha lista de histórico de pedidos
    So that eu possa acompanhar meus pedidos anteriores, repetir pedidos facilmente e monitorar meus gastos e preferências.

Scenario: Acessar página de estatísticas sem haver pedidos feitos no aplicativo
    Given que eu estou logado como "cliente" com o login "cascadebala@example.com" e senha "senha987"
    And eu estou na página "home-client"
    When eu escolho a opção "estatisticas" na barra de navegação
    Then eu consigo visualizar o texto "Não há detalhes de pedidos para o seu perfil"
    And eu clico no botão "confirmar"
    And eu continuo na página "home-client"

Scenario: Acessar página de estatísticas com pedidos feitos no aplicativo
    Given que eu estou logado como "cliente" com o login "usuarioteste1@example.com" e senha "senhateste1"
    And eu estou na página "home"
    When eu escolho a opção "estatisticas" na barra de navegação
    Then eu estou na página "statistics" do usuário de id "33"
    And eu consigo visualizar o texto "Detalhes Mensais"

Scenario: visualizar estatísticas mensais
    Given que eu estou logado como "cliente" com o login "usuarioteste1@example.com" e senha "senhateste1"
    And eu estou na página "home"
    When eu escolho a opção "estatisticas" na barra de navegação
    And eu clico no botão "mensal"
    Then eu estou na página "statistics" do usuário de id "33"
    And eu consigo visualizar o texto "Detalhes Mensais"
    And eu consigo visualizar o texto "Março 2024"
    And eu consigo visualizar o texto "Gastos Totais: 73.99, Número de Itens: 2"

Scenario: visualizar estatísticas diárias
    Given que eu estou logado como "cliente" com o login "usuarioteste1@example.com" e senha "senhateste1"
    And eu estou na página "home"
    When eu escolho a opção "estatisticas" na barra de navegação
    And eu clico no botão "diario"
    Then eu estou na página "statistics" do usuário de id "33"
    And eu consigo visualizar o texto "Detalhes Diários"
    And eu consigo visualizar o texto "Sábado 30 março 2024"
    And eu consigo visualizar o texto "Gastos Totais: 73.99, Número de Itens: 2"