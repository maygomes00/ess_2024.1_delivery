Feature: Histórico de pedidos
    As a cliente
    I want to ver minha lista de histórico de pedidos
    So that eu possa acompanhar meus pedidos anteriores, repetir pedidos facilmente e monitorar meus gastos e preferências.

Scenario: Acessar página de histórico de pedidos sem haver pedidos feitos no aplicativo
    Given que eu estou logado como "cliente" com o login "cascadebala@example.com" e senha "senha987"
    And eu estou na página "home-client"
    When eu escolho a opção "historico" na barra de navegação
    Then eu consigo visualizar o texto "Não há detalhes de pedidos para o seu perfil"
    And eu clico no botão "confirmar"
    And eu continuo na página "home-client"

Scenario: Acessar página de histórico de pedidos com pedidos feitos no aplicativo
    Given que eu estou logado como "cliente" com o login "usuarioteste1@example.com" e senha "senhateste1"
    And eu estou na página "home-client"
    When eu escolho a opção "historico" na barra de navegação
    Then eu estou na página "history" do usuário de id "33"
    And eu consigo visualizar a lista "pedidos"

Scenario: Acessar restaurante através de pedido do histórico
    Given que eu estou logado como "cliente" com o login "usuarioteste1@example.com" e senha "senhateste1"
    And eu vou para a página "history" do usuário de id "33"
    When eu clico no nome "Super Pizzas" no primeiro pedido da lista "pedidos"
    Then eu estou na página "restaurant" do restaurante id "f257adef-dda8-46c7-bbfd-4275a90d837e"

Scenario: Acessar item através de pedido do histórico
    Given que eu estou logado como "cliente" com o login "usuarioteste1@example.com" e senha "senhateste1"
    And eu vou para a página "history" do usuário de id "33"
    When eu clico no item "Pizza" no primeiro pedido da lista "pedidos-itens"
    Then eu estou na página "cardapio" do restaurante de id "f257bdef-cca8-46c7-bbfd-4275a90d837e" no item de id "0"

Scenario: Acessar item removido do sistema através de pedido do histórico
    Given que eu estou logado como "cliente" com o login "usuarioteste1@example.com" e senha "senhateste1"
    And eu vou para a página "history" do usuário de id "33"
    When eu clico no item "Bolo de morango" no pedido da lista "pedidos-itens"
    Then eu consigo visualizar o texto "Esse item não está mais disponível"
    And eu continuo na página "history" do usuário de id "33"