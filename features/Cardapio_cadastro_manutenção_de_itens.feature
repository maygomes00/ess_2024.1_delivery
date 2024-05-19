Feature: Cadastro e manutenção de itens no cardápio
    As a restaurante
    I want to poder criar, editar e remover itens do meu cardapio
    So that eu possa exibir os itens para os clientes

Scenario: Entrar na tela de editar cardápio
    Given estou logado como “Restaurante” com login “restaurante_generico” e senha “senha_super_dificil_123”
    And estou na tela “perfil do restaurante”
    When escolho a opção “Cardápio”
    Then estou na tela “Editor de cardápio”
    And estou na aba “Cardápio” da tela “Editor de cardápio”

Scenario: Entrar na tela de itens
    Given estou na aba “Cardápio” da tela “Editor de cardápio”
    When seleciono a opção “Itens”
    Then estou na aba “Itens” da tela “Editor de cardápio”

Scenario: Ir para a tela de adicionar item
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And há pelo menos uma categoria no cardápio
    When seleciono a opção “Adicionar”
    Then estou na tela “Adicionar novo item”

Scenario: Tentar ir para a tela de adicionar item sem ter criado nenhuma categoria
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And Não há categorias no cardápio
    When seleciono a opção “Adicionar”
    Then mensagem informando que é necessário ter pelo menos uma categoria para criar um item é exibida
    And estou na aba “Categorias” da tela “Editor de cardápio”

Scenario: Adicionar item no cardápio
    Given estou na tela “Adicionar novo item”
    And categoria “Doce” existe no cardápio
    When preencho o campo “nome” com “brigadeiro”
    And preencho o campo “preço” com “R$ 2,00”
    And preencho o campo “descrição ” com “brigadeiro normal”
    And adiciono a imagem “brigadeiro_foto.jpeg” como foto do item
    And seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Doce”
    And seleciono a opção “Salvar”
    Then Mensagem informando que o item foi salvo é exibida
    And Item é salvo no cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “brigadeiro” exibido na categoria “Doce”

Scenario: Desistir de adicionar item
    Given estou na tela “Adicionar novo item”
    And categoria “Doce” existe no cardápio
    And categoria “Doce” não tem nenhum item
    When preencho o campo “preço” com “R$ 2,00”
    And preencho o campo “nome” com “brigadeiro”
    And preencho o campo “descrição ” com “brigadeiro normal”
    And seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Doce”
    And seleciono a opção “Cancelar”
    Then estou na aba “Cardápio” da tela “Editor de cardápio”
    And categoria “Doce” não tem nenhum item

Scenario: Tentar adicionar item sem preencher todas as informações
    Given estou na tela “Adicionar novo item”
    And categoria “Doce” existe no cardápio
    When preencho o campo “nome” com “brigadeiro”
    And adiciono a imagem “brigadeiro_foto.jpeg” como foto do item
    And seleciono a opção “Salvar”
    Then Mensagem informando que é necessário preencher todos os campos é exibida
    And estou na tela “Adicionar novo item”
    And campos não preenchidos são destacados em vermelho

Scenario: Removendo do cardápio item que tem uma categoria
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And item “brigadeiro” tem a categoria “Doce”
    And item “sonho” tem a categoria “Doce”
    When seleciono a opção “Remover” do item “brigadeiro”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then Item “brigadeiro” é removido do cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “sonho” exibido na categoria “Doce”

Scenario: Removendo do cardápio item que tem mais de uma categoria
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And item “sonho” tem a categoria “Doce”
    And item “achocolatado” tem a categoria “Doce”
    And categoria “Bebidas” existe no cardápio
    And item “achocolatado” tem a categoria “Bebidas”
    And item “suco de laranja” tem a categoria “Bebidas”
    When seleciono a opção “Remover” do item “achocolatado”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then Item “achocolatado” é removido do cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “sonho” exibido na categoria “Doce”
    And vejo item “suco de laranja” exibido na categoria “Bebidas”

Scenario: Removendo do cardápio o único item de uma categoria
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And item “sonho” tem a categoria “Doce”
    When seleciono a opção “Remover” do item “sonho”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then Item “sonho” é removido do cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And categoria “Doce” não tem nenhum item

Scenario: Desistir de remover item
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And item “brigadeiro” existe no cardápio
    When seleciono a opção “Remover” do item “brigadeiro”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Cancelar”
    And estou na aba “Itens” da tela “Editor de cardápio”
    And item “brigadeiro” existe no cardápio

Scenario: Ir para a tela de edição de item
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And item “brigadeiro” existe no cardápio
    When seleciono a opção “Editar” do item “brigadeiro”
    Then estou na tela “Edição de item”

Scenario: Mudar nome, preço, descrição e imagem do item
    Given estou na tela “Edição de item”
    And item “brigadeiro” tem a categoria “Doce”
    And preço do item “brigadeiro” é “R$ 2,00”
    And descrição do item “brigadeiro” é “brigadeiro normal”
    When mudo a informação no campo “nome” para “brigadeiro premium”
    And mudo a informação no campo “preço” para “R$ 4,00”
    And mudo a informação no campo “descrição” para “é diferente de um brigadeiro normal, confia”
    And adiciono a imagem “brigadeiro_foto2.jpeg” como foto do item
    And seleciono a opção “Salvar”
    Then Mensagem informando que as edições no item foram salvas é exibida
    And Informações do item são atualizadas
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “brigadeiro premium” exibido na categoria “Doce”
    And preço do item “brigadeiro premium” é “R$ 4,00”
    And descrição do item “brigadeiro premium” é “é diferente de um brigadeiro normal, confia”

Scenario: Desistir de editar item
    Given estou na tela “Edição de item”
    And item “brigadeiro” tem a categoria “Doce”
    And preço do item “brigadeiro” é “R$ 2,00”
    And descrição do item “brigadeiro” é “brigadeiro normal”
    When mudo a informação no campo “nome” para “brigadeiro premium”
    And mudo a informação no campo “preço” para “R$ 4,00”
    And seleciono a opção “Cancelar”
    Then estou na aba “Cardápio” da tela “Editor de cardápio”
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
    Then Mensagem informando que as edições no item foram salvas é exibida
    And Informações do item são atualizadas
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “brigadeiro” exibido na categoria “Chocolate”
    And categoria “Doce” não tem nenhum item

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
    Then Mensagem informando que as edições no item foram salvas é exibida
    And Informações do item são atualizadas
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “brigadeiro” exibido na categoria “Doce”
    And vejo item “brigadeiro” exibido na categoria “Chocolate”
    And vejo item “brigadeiro” exibido na categoria “Mais pedidos”

Scenario: Tentar editar as informações de um item deixando uma delas em branco
    Given estou na tela “Edição de item”
    And item “brigadeiro” tem a categoria “Doce”
    And preço do item “brigadeiro” é “R$ 2,00”
    And descrição do item “brigadeiro” é “brigadeiro normal”
    When mudo a informação no campo “preço” para “R$ 4,00”
    And apago a informação no campo “descrição”
    And seleciono a opção “Salvar mudanças”
    Then Mensagem informando que é necessário preencher todos os campos é exibida
    And estou na tela “Edição de item”
    And campos não preenchidos são destacados em vermelho