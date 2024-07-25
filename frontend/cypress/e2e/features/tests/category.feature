Feature: Criação de categorias de itens
    As a restaurante
    I want to poder criar categorias para os itens do cardapio
    So that os itens do cardapio possam ser encontrados mais facilmente

Scenario: Criar uma categoria
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação
    And o usuário clica no botão de adicionar categoria "addCategoryButton"
    And o usuário preenche o campo "Nome da Categoria" com "Bebidas"
    And o usuário clica no botão "Adicionar" do popup
    And o usuário dá refresh na tela de categorias
    Then o usuário deve ver a categoria "Bebidas" no modal

  Scenario: Tentar criar categoria sem nome
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação
    And o usuário clica no botão de adicionar categoria "addCategoryButton"
    And o usuário aperta o botão 'Adicionar'
    Then o usuário vê a mensagem "É obrigatório um nome para a categoria!"

  Scenario: Desistir de criar categoria
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação
    And o usuário clica no botão de adicionar categoria "addCategoryButton"
    And o usuário preenche o campo "Nome da Categoria" com "Salgados"
    And o usuário aperta o botão de "Cancelar" no popup
    And o usuário dá refresh na tela de categorias
    Then o usuário deve ver a categoria "Salgados" no modal
    And o usuário deve ver a categoria "Doce" no modal
    And o usuário deve ver a categoria "Bebidas" no modal

  Scenario: Tentar criar categoria que já existe
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação
    And o usuário clica no botão de adicionar categoria "addCategoryButton"
    And o usuário preenche o campo "Nome da Categoria" com "Salgados"
    And o usuário aperta o botão 'Adicionar'
    Then o usuário vê a mensagem "Já existe uma categoria com esse nome!"

  Scenario: Editar categoria
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação
    And o usuário clica no botão "Editar" da categoria "Bebidas"
    And o usuário preenche o campo "Nome da Categoria" com "Bebidas Geladas"
    And o usuário aperta o botão "Salvar"
    And o usuário dá refresh na tela de categorias
    Then o usuário deve ver a categoria "Bebidas Geladas" no modal

  Scenario: Editar categoria sem dar nome
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação
    And o usuário preenche o campo "Nome da Categoria" com ""
    And o usuário aperta o botão "Salvar"
    And o usuário dá refresh na tela de categorias
    Then o usuário vê a mensagem "É obrigatório um nome para a categoria!"

  Scenario: Editar categoria dando nome que já existe
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação    
    And o usuário clica no botão "Editar" da categoria "Doces"
    And o usuário preenche o campo "Nome da Categoria" com "Salgados"
    And o usuário aperta o botão "Salvar"
    Then o usuário vê a mensagem "Já existe uma categoria com esse nome!"
  
  Scenario: Desistir de editar categoria
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação    
    And o usuário clica no botão "Editar" da categoria "Doces"
    And o usuário preenche o campo "Nome da Categoria" com "Salgados"
    And o usuário aperta o botão "Cancelar"
    Then o usuário deve ver a categoria "Salgados" no modal
    And o usuário deve ver a categoria "Doce" no modal
    And o usuário deve ver a categoria "Bebidas Geladas" no modal

  Scenario: Tentar deletar categoria com item
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação    
    And o usuário clica no botão "Deletar" da categoria "Salgados"
    And o usuário aperta o botão "Confirmar"
    Then o usuário vê a mensagem "Categoria com itens! Não pode ser deletada!"
  
  Scenario: Desistir de deletar categoria
    Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação    
    And o usuário clica no botão "Deletar" da categoria "Salgados"
    And o usuário aperta o botão "Cancelar"
    Then o usuário deve ver a categoria "Salgados" no modal
    And o usuário deve ver a categoria "Doce" no modal
    And o usuário deve ver a categoria "Bebidas Geladas" no modal  

  Scenario: Deletar categoria
   Given o usuário está logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
    And o usuário está na página "home-restaurant"
    When o usuário clica no botão "Ir para Menu Editor"
    And o usuário aperta o botão "Categorias" no menu de navegação    
    And o usuário clica no botão "Deletar" da categoria "Bebidas Geladas"
    And o usuário aperta o botão "Confirmar"
    Then o usuário deve ver a categoria "Salgados" no modal
    And o usuário deve ver a categoria "Doce" no modal  