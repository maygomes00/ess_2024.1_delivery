Feature: Criação de categorias de itens
    As a restaurante
    I want to poder criar categorias para os itens do cardapio
    So that os itens do cardapio possam ser encontrados mais facilmente

Scenario: Entrar na tela de editar cardápio
    Given estou logado como “Restaurante” com login “restaurante_generico” e senha “senha_super_dificil_123”
    And estou na tela “perfil do restaurante”
    When escolho a opção “Cardápio”
    Then estou na tela “Editor de cardápio”
    And estou na aba “Cardápio” da tela “Editor de cardápio”

Scenario: Entrar na tela de categorias
    Given estou na aba “Cardápio” da tela “Editor de cardápio”
    When seleciono a opção “Categorias”
    Then estou na aba “Categorias” da tela “Editor de cardápio”

Scenario: Ir para a tela de adicionar nova categoria
    Given estou na aba “Categorias” da tela “Editor de cardápio”
    When seleciono a opção “Adicionar”
    Then estou na tela “Adicionar nova categoria”

Scenario: Adicionar uma nova categoria
    Given estou na tela “Adicionar nova categoria”
    When preencho o campo “nome da categoria” com “Doce”
    And seleciono a opção “Salvar”
    Then mensagem informando que a categoria foi salva é exibida 
    And categoria é salva no cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio

Scenario: Tentar criar categoria sem dar um nome
    Given estou na tela “Adicionar nova categoria”
    And Não há categorias no cardápio
    When seleciono a opção “Salvar”
    Then Mensagem informando que é necessário preencher todos os campos é exibida
    And estou na tela “Adicionar nova categoria”
    And campos não preenchidos são destacados em vermelho

Scenario: Tentar criar categoria que já existe
    Given estou na tela “Adicionar nova categoria”
    And categoria “Doce” existe no cardápio
    When preencho o campo “nome da categoria” com “Doce”
    And seleciono a opção “Salvar nova categoria”
    Then mensagem informando que a categoria “Doce” já existe
    And estou na aba “Cardápio” da tela “Editor de cardápio”

Scenario: Desistir de criar categoria
    Given estou na tela “Adicionar nova categoria”
    And Não há categorias no cardápio
    When preencho o campo “nome da categoria” com “Doce”
    And seleciono a opção “Cancelar”
    Then estou na aba “Cardápio” da tela “Editor de cardápio”
    And Não há categorias no cardápio

Scenario: Remover categoria sem itens
    Given estou na aba “Categorias” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And categoria “Doce” não tem nenhum item
    When seleciono a opção “Remover” da categoria “Doce”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then categoria “Doce” é removida do cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”

Scenario: Remover categoria com itens
    Given estou na aba “Categorias” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And item “achocolatado” é exibido na categoria “Doce”
    And categoria “Bebidas” existe no cardápio
    And item “achocolatado” é exibido na categoria “Bebidas”
    And item “suco de laranja” é exibido na categoria “Bebidas”
    When seleciono a opção “Remover” da categoria “Bebidas”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then categoria “Bebidas” é removida do cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “achocolatado” exibido na categoria “Doce”
    And item “suco de laranja” não é exibido no cardápio
    And item “suco de laranja” existe no cardápio
    And item “suco de laranja” não tem categoria

Scenario: Dar categoria a item que ficou sem categoria devido a remoção de categoria
    Given estou na aba “Itens” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And categoria “Sucos” existe no cardápio
    And item “achocolatado” tem a categoria “Doce”
    And item “suco de laranja” não tem categoria
    When seleciono a opção “Editar” do item “suco de laranja”
    And sou direcionado para a tela “Edição de item”
    And seleciono a opção “Adicionar categoria”
    And seleciono a categoria “Sucos”
    And seleciono a opção “Salvar”
    Then Mensagem informando que as edições no item foram salvas é exibida
    And Informações do item são atualizadas
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And vejo item “achocolatado” exibido na categoria “Doce”
    And vejo item “suco de laranja” exibido na categoria “Sucos”