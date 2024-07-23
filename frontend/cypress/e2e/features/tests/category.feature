Feature: Criação de categorias de itens
    As a restaurante
    I want to poder criar categorias para os itens do cardapio
    So that os itens do cardapio possam ser encontrados mais facilmente

Scenario: Criar uma categoria
  Given o usuário esta logado com email "undecillion2@example.com" e password "!secureP4$$W0RD1234"
  And esta na página "/f257adef-dda8-46c7-bbfd-4275a90d837e/menu-editor/categorias"
  When o usuário clica no botão de adicionar categoria "addCategoryButton"
  And o usuário preenche o campo "Nome da Categoria" com "Doce"
  And o usuário aperta o botão "Adicionar"
  Then o usuário vai para a pagina "/f257adef-dda8-46c7-bbfd-4275a90d837e/menu-editor/categorias"