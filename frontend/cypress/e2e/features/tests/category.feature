Feature: Criação de categorias de itens
    As a restaurante
    I want to poder criar categorias para os itens do cardapio
    So that os itens do cardapio possam ser encontrados mais facilmente

Scenario: Criar uma categoria
  Given o usuario esta na página "/1/menu-editor/categorias" 
  When o usuário clica no botão "addCategoryButton"
  And escreve o nome "Doce" e aperta o botão "acceptButton"
  Then o usuario vai para a pagina "/1/menu-editor/categorias" e ver a categoria "Doce"

Scenario: Tentar criar categoria sem nome
  Given o usuario esta na página "/1/menu-editor/categorias" 
  When o usuário clica no botão "addCategoryButton"
  And aperta o botão "acceptButton"
  Then o usuario ver a mensagem "É obrigatório um nome para a categoria!"

Scenario: Tentar criar categoria que já existe
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doce"
  When o usuário clica no botão "addCategoryButton"
  And coloca o nome "Salgados" e aperta o botão "acceptButton"
  Then o usuario ver a mensagem "Já existe uma categoria com esse nome!"

Scenario: Desistir de criar categoria
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doce"
  When o usuário clica no botão "addCategoryButton"
  And coloca o nome "Salgados" e aperta o botão "cancelButton"
  Then o usuario vai para a pagina "/1/menu-editor/categorias" e ver as categorias "Salgados" e "Doce"

Scenario: Editar categoria
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doce"
  When o usuário clica no botão "editorButton" de "Doce"
  And escreve o nome "Doces"e aperta o botão "acceptButton"
  Then o usuario vai para a pagina "/1/menu-editor/categorias" e ver as categorias "Salgados" e "Doces"

Scenario: Editar categoria sem dar nome
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doces"
  When o usuário clica no botão "editorButton" de "Doces"
  And apaga o nome e aperta o botão "acceptButton"
  Then o usuario ver a mensagem "Nome da categoria não pode ser vazio!"

Scenario: Editar categoria dando nome que já existe
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doces"
  When o usuário clica no botão "editorButton" de "Doces"
  And e coloca o nome "Salgados" e aperta o botão "acceptButton"
  Then o usuario ver a mensagem "Já existe uma categoria com esse nome!"

Scenario: Desistir de editar categoria
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doces"
  When o usuário clica no botão "editCategory" de "Doces"
  And coloca o nome "Salgados" e aperta o botão "cancelButton"
  Then o usuario vai para a pagina "/1/menu-editor/categorias" e ver as categorias "Salgados" e "Doces"

Scenario: Tentar deletar categoria com item
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doces"
  When o usuário clica no botão "deleteCategory" de "Salgados"
  And clica no botão "confirmar"
  Then o usuario ver a mensagem "Categoria com itens! Não pode ser deletada!"

Scenario: Desistir de deletar categoria
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doces"
  When o usuário clica no botão "deleteCategory" de "Salgados"
  And clica no botão "cancelar"
  Then o usuario vai para a pagina "/1/menu-editor/categorias" e ver as categorias "Salgados" e "Doces"

Scenario: Deletar categoria
  Given o usuario esta na página "/1/menu-editor/categorias" e podemos ver as categorias "Salgados" e "Doces"
  When o usuário clica no botão "deleteCategory" de "Doces"
  And clica no botão "confirmar"
  Then o usuario vai para a pagina "/1/menu-editor/categorias" e ver a categoria "Salgados"
