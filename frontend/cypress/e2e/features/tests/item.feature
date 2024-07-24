Feature: Cadastro e manutenção de itens no cardápio
    As a restaurante
    I want to poder criar, editar e remover itens do meu cardapio
    So that eu possa exibir os itens para os clientes

Scenario: Ir para pagina do editor de menu
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na pagina "home-restaurant"
    When o usuario clica no botao especifico "EnterMenuEditor"
    Then o usuario deve ser redirecionado para a sua pagina "menu" do editor de menu

Scenario: Ir para pagina de itens no editor de menu
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina "menu" do editor de menu
    When o usuario clica no botao "Itens"
    Then o usuario deve ser redirecionado para a sua pagina "itens" do editor de menu

Scenario: Ir para a tela de adicionar item
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina "itens" do editor de menu
    When o usuario clica no botao especifico "AddItemButton"
    Then o usuario deve ser redirecionado para a sua pagina de adicionar item
    And o usuario deve ver a mensagem "Adicionar item"

Scenario: Adicionar item no menu
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina de adicionar item
    When o usuario preenche o campo "Name" com "Brigadeiro (Teste)"
    And o usuario preenche o campo "Description" com "Brigadeiro normal."
    And o usuario preenche o campo "Price" com "1.50"
    And o usuario adiciona uma imagem ".\brigadeiro.jpeg"
    And o usuario marca a checkbox "Doce"
    And o usuario clica no botao "Salvar"
    And espera "400" ms
    Then o usuario deve ser redirecionado para a sua pagina "menu" do editor de menu
    And o usuario deve ver a mensagem "Doce"
    And o usuario deve ver a mensagem "Brigadeiro (Teste)"

Scenario: Tentar adicionar item sem preencher todas as informações
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina de adicionar item
    When o usuario clica no botao "Salvar"
    Then o usuario deve ver a mensagem "Item deve ter uma imagem"
    And o usuario deve ver a mensagem "Item deve ter um nome"
    And o usuario deve ver a mensagem "Item deve ter uma descrição"
    And o usuario deve ver a mensagem "Item deve ter um preço"
    And o usuario deve ver a mensagem "Item deve ter pelo menos uma categoria"

Scenario: Ir para a tela de editar item
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina "itens" do editor de menu
    And o usuario ve o item "Brigadeiro (Teste)"
    When o usuario clica no botao especifico "Brigadeiro (Teste)-edit"
    And espera "400" ms
    Then o usuario deve ser redirecionado para a sua pagina de editar item
    And o usuario deve ver a mensagem "Editar item"
    And o usuario ve o campo "Name" com "Brigadeiro (Teste)"
    And o usuario ve o campo "Description" com "Brigadeiro normal."
    And o usuario ve o campo "Price" com "1.50"
    And o usuario ve que a checkbox de "Doce" esta marcada

Scenario: Editar item do menu
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina de editar item, para o item "Brigadeiro (Teste)"
    When o usuario preenche o campo "Name" com "Brigadeiro 2 (Teste)"
    And o usuario preenche o campo "Description" com "Melhor que um Brigadeiro normal."
    And o usuario preenche o campo "Price" com "4.99"
    And o usuario clica no botao "Salvar"
    And espera "400" ms
    Then o usuario deve ser redirecionado para a sua pagina "menu" do editor de menu
    And o usuario deve ver a mensagem "Doce"
    And o usuario deve ver a mensagem "Brigadeiro 2 (Teste)"
    And o usuario deve ver a mensagem "Melhor que um Brigadeiro normal."
    And o usuario deve ver a mensagem "R$ 4,99"

Scenario: Desistir de remover item
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina "itens" do editor de menu
    And o usuario ve o item "Brigadeiro 2 (Teste)"
    When o usuario clica no botao especifico "Brigadeiro 2 (Teste)-remove"
    And o usuario clica no botao "Cancelar"
    Then o usuario deve ver a mensagem "Brigadeiro 2 (Teste)"

Scenario: Remover item do menu
    Given o usuario esta logado com email "teste@example.com", password "teste123" e id "idTeste1"
    And o usuario esta na sua pagina "itens" do editor de menu
    And o usuario ve o item "Brigadeiro 2 (Teste)"
    When o usuario clica no botao especifico "Brigadeiro 2 (Teste)-remove"
    And o usuario clica no botao "Confirmar"
    Then o usuario não deve ver a mensagem "Brigadeiro 2 (Teste)"