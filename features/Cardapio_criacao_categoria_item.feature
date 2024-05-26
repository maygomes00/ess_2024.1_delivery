Feature: Criação de categorias de itens
    As a restaurante
    I want to poder criar categorias para os itens do cardapio
    So that os itens do cardapio possam ser encontrados mais facilmente

Scenario: Entrar na aba de categorias
    Given estou logado como “Restaurante” com login “restaurante_generico” e senha “senha_super_dificil_123”
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    When seleciono a opção “Categorias”
    Then estou na aba “Categorias” da tela “Editor de cardápio”

Scenario: Ir para a tela de adicionar nova categoria
    Given estou na aba “Categorias” da tela “Editor de cardápio”
    When seleciono a opção “Adicionar”
    Then estou na tela “Adicionar nova categoria”

Scenario: Adicionar uma nova categoria
    Given estou na tela “Adicionar nova categoria”
    And categoria “Sucos” existe no cardápio
    When preencho o campo “nome da categoria” com “Doce”
    And seleciono a opção “Salvar”
    Then mensagem informando que a categoria foi salva é exibida
    And estou na aba “Cardápio” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And categoria “Sucos” existe no cardápio

Scenario: Tentar criar categoria sem dar um nome
    Given estou na tela “Adicionar nova categoria”
    And campo “nome” está vazio
    When seleciono a opção “Salvar”
    Then Mensagem informando que é necessário preencher todos os campos é exibida
    And estou na tela “Adicionar nova categoria”
    And campo "nome da categoria" é destacados em vermelho

Scenario: Tentar criar categoria que já existe
    Given estou na tela “Adicionar nova categoria”
    And categoria “Doce” existe no cardápio
    When preencho o campo “nome da categoria” com “Doce”
    And seleciono a opção “Salvar nova categoria”
    Then mensagem informando que a categoria “Doce” já existe
    And estou na tela “Adicionar nova categoria”

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
    And categoria “Doce” está vazia
    When seleciono a opção “Remover” da categoria “Doce”
    And Mensagem de aviso é exibida pedindo confirmação
    And seleciono a opção “Confirmar”
    Then categoria “Doce” é removida do cardápio
    And estou na aba “Cardápio” da tela “Editor de cardápio”

Scenario: Remover categoria com itens
    Given estou na aba “Categorias” da tela “Editor de cardápio”
    And categoria “Doce” existe no cardápio
    And item “achocolatado” é exibido na categoria “Doce”
    When seleciono a opção “Remover” da categoria “Doce”
    Then Mensagem de aviso é exibida informando que a categoria não pode ser excluida, pois há itens nela
    And estou na aba “Categorias” da tela “Editor de cardápio”