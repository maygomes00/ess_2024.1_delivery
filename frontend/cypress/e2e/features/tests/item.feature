Feature: Cadastro e manutenção de itens no cardápio
    As a restaurante
    I want to poder criar, editar e remover itens do meu cardapio
    So that eu possa exibir os itens para os clientes

Scenario: Ir para pagina do editor de menu
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na pagina "home-restaurant"
    When o usuario clica no botao "Ir para Menu Editor"
    Then o usuario deve ser redirecionado para a sua pagina "menu" do editor de menu

Scenario: Ir para pagina de itens no editor de menu
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na pagina "home-restaurant"
    When o usuario clica no botao "Ir para Menu Editor"
    And o usuario clica no botao "Itens"
    Then o usuario deve ser redirecionado para a sua pagina "itens" do editor de menu

Scenario: Ir para a tela de adicionar item
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina "itens" do editor de menu
    When o usuario clica no botao especifico "AddItemButton"
    Then o usuario deve ser redirecionado para a sua pagina de adicionar item
    And o usuario deve ver a mensagem "Adicionar item"