Feature: Cadastro e manutenção de itens no cardápio
    As a restaurante
    I want to poder criar, editar e remover itens do meu cardapio
    So that eu possa exibir os itens para os clientes

Scenario: Tentar ir para a tela de adicionar item sem ter uma categoria no cardapio
    Given estou na tela "Editor de cardápio - Itens”
    And Não há categorias no cardápio
    When seleciono a opção “Adicionar”
    Then mensagem informando que é necessário ter pelo menos uma categoria para criar um item é exibida
    And estou na tela "Editor de cardápio - categorias”

Scenario: Adicionar item no cardápio
    Given estou na tela “Adicionar novo item”
    And categoria “Doce” existe no cardápio
    When preencho o campo “nome” com “brigadeiro”
    And preencho o campo “preço” com “R$ 2,00”
    And preencho o campo “descrição” com “brigadeiro normal”
    And adiciono a imagem “brigadeiro_foto.jpeg” como foto do item
    And seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Doce”
    And seleciono a opção “Salvar”
    Then estou na tela “Editor de cardápio”
    And vejo item “brigadeiro” exibido na categoria “Doce”

Scenario: Desistir de adicionar item
    Given estou na tela “Adicionar novo item”
    And categoria “Doce” existe no cardápio
    And categoria “Doce” está vazia
    When preencho o campo “preço” com “R$ 2,00”
    And preencho o campo “nome” com “brigadeiro”
    And preencho o campo “descrição ” com “brigadeiro normal”
    And seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Doce”
    And seleciono a opção “Cancelar”
    Then estou na tela “Editor de cardápio”
    And categoria “Doce” está vazia

Scenario: Tentar adicionar item sem preencher todas as informações
    Given estou na tela “Adicionar novo item”
    And categoria “Doce” existe no cardápio
    When preencho o campo “nome” com “brigadeiro”
    And adiciono a imagem “brigadeiro_foto.jpeg” como foto do item
    And seleciono a opção “Salvar”
    Then Mensagem informando que é necessário preencher todos os campos é exibida
    And estou na tela “Adicionar novo item”
    And campo "preço" é destacado em vermelho
    And campo "descrição" é destacado em vermelho
    And campo "categoria" é destacado em vermelho

Scenario: Removendo do cardápio item que tem uma categoria
    Given estou na tela "Editor de cardápio - Itens”
    And categoria “Doce” existe no cardápio
    And item “brigadeiro” tem a categoria “Doce”
    And item “sonho” tem a categoria “Doce”
    When seleciono a opção “Remover” do item “brigadeiro”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then estou na tela “Editor de cardápio”
    And vejo item “sonho” exibido na categoria “Doce”

Scenario: Removendo do cardápio item que tem mais de uma categoria
    Given estou na tela "Editor de cardápio - Itens”
    And categoria “Doce” existe no cardápio
    And item “sonho” tem a categoria “Doce”
    And item “achocolatado” tem a categoria “Doce”
    And categoria “Bebidas” existe no cardápio
    And item “achocolatado” tem a categoria “Bebidas”
    And item “suco de laranja” tem a categoria “Bebidas”
    When seleciono a opção “Remover” do item “achocolatado”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then estou na tela "Editor de cardápio”
    And vejo item “sonho” exibido na categoria “Doce”
    And vejo item “suco de laranja” exibido na categoria “Bebidas”

Scenario: Removendo do cardápio o único item de uma categoria
    Given estou na tela "Editor de cardápio - Itens”
    And categoria “Doce” existe no cardápio
    And item “sonho” tem a categoria “Doce”
    When seleciono a opção “Remover” do item “sonho”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then estou na tela "Editor de cardápio”
    And categoria “Doce” está vazia

Scenario: Desistir de remover item
    Given eestou na tela "Editor de cardápio - Itens”
    And item “brigadeiro” tem a categoria “Doce”
    When seleciono a opção “Remover” do item “brigadeiro”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Cancelar”
    Then estou na tela "Editor de cardápio - Itens”
    And item “brigadeiro” tem a categoria “Doce”

Scenario: Ir para a tela de edição de item
    Given estou na tela "Editor de cardápio - Itens”
    And item “brigadeiro” tem a categoria “Doce”
    And preço do item “brigadeiro” é “R$ 2,00”
    And descrição do item “brigadeiro” é “brigadeiro normal”
    And imagem do item "brigadeiro" é “brigadeiro_foto.jpeg”
    When seleciono a opção “Editar” do item “brigadeiro”
    Then estou na tela “Edição de item”
    And campo “nome” está preenchido com “brigadeiro”
    And campo “preço” está preenchido com “R$ 2,00”
    And campo “descrição” está preenchido com “brigadeiro normal”
    And campo "imagem" está preenchido com "brigadeiro_foto.jpeg"
    And campo categorias tem a categoria "Doce"

Scenario: Mudar nome, preço, descrição e imagem do item
    Given estou na tela “Edição de item”
    And campo “nome” está preenchido com “brigadeiro”
    And campo “preço” está preenchido com “R$ 2,00”
    And campo “descrição” está preenchido com “brigadeiro normal”
    And campo "imagem" está preenchido com "brigadeiro_foto.jpeg"
    And campo categorias tem a categoria "Doce"
    When mudo a informação no campo “nome” para “brigadeiro premium”
    And mudo a informação no campo “preço” para “R$ 4,00”
    And mudo a informação no campo “descrição” para "é diferente de um brigadeiro normal"
    And adiciono a imagem “brigadeiro_foto2.jpeg” como foto do item
    And seleciono a opção “Salvar”
    Then estou na tela "Editor de cardápio”
    And vejo item “brigadeiro premium” exibido na categoria “Doce”
    And preço do item “brigadeiro premium” é “R$ 4,00”
    And descrição do item “brigadeiro premium” é "é diferente de um brigadeiro normal"

Scenario: Desistir de editar item
    Given estou na tela “Edição de item”
    And item “brigadeiro” tem a categoria “Doce”
    And preço do item “brigadeiro” é “R$ 2,00”
    And descrição do item “brigadeiro” é “brigadeiro normal”
    When mudo a informação no campo “nome” para “brigadeiro premium”
    And mudo a informação no campo “preço” para “R$ 4,00”
    And seleciono a opção “Cancelar”
    Then estou na tela "Editor de cardápio”
    And vejo item “brigadeiro” exibido na categoria “Doce”
    And preço do item “brigadeiro” é “R$ 2,00”
    And descrição do item “brigadeiro” é “brigadeiro normal”

Scenario: Mudar categoria de um item
    Given estou na tela “Edição de item”
    And categoria “Doce” existe no cardápio
    And categoria “Chocolate” existe no cardápio
    And item “brigadeiro” tem a categoria “Doce”
    When removo categoria “Doce”
    And seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Chocolate”
    And seleciono a opção “Salvar mudanças”
    Then estou na tela "Editor de cardápio”
    And vejo item “brigadeiro” exibido na categoria “Chocolate”
    And categoria “Doce” está vazia

Scenario: Adicionar mais uma categoria a um item
    Given estou na tela “Edição de item”
    And categoria “Doce” existe no cardápio
    And categoria “Chocolate” existe no cardápio
    And categoria “Mais pedidos” existe no cardápio
    And item “brigadeiro” tem a categoria “Doce”
    When seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Chocolate”
    And seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Mais pedidos”
    And seleciono a opção “Salvar mudanças”
    Then estou na tela "Editor de cardápio”
    And vejo item “brigadeiro” exibido na categoria “Doce”
    And vejo item “brigadeiro” exibido na categoria “Chocolate”
    And vejo item “brigadeiro” exibido na categoria “Mais pedidos”

Scenario: Tentar editar as informações de um item deixando uma delas em branco
    Given estou na tela “Edição de item”
    And campo “nome” está preenchido com “brigadeiro”
    And campo “descrição” está preenchido com “brigadeiro normal”
    When apago a informação no campo “descrição”
    And seleciono a opção “Salvar mudanças”
    Then Mensagem informando que é necessário preencher todos os campos é exibida
    And estou na tela “Edição de item”
    And campo "descrição" é destacados em vermelho