Feature: Estatísticas de pedidos
    As a cliente
    I want to ver estatísticas sobre meus pedidos
    So that eu possa monitorar meus hábitos de consumo, entender meus gastos, 
    e identificar minhas preferências alimentares ao longo do tempo.

Scenario: Acessar página de estatísticas sem haver pedidos feitos no aplicativo
    Given que eu estou logado como “cliente” com o login “usuario_qualquer1” 
    And eu estou na página “home”
    And o sistema não possui nenhum pedido associado a meu perfil
    When eu escolho a opção “Estatísticas”
    Then eu vejo uma mensagem “não há detalhes de pedidos para o seu perfil”
    And eu continuo na página “home”

Scenario: Acessar página de estatísticas com pedidos feitos no aplicativo
    Given que eu estou logado como “cliente” com o login “usuario_qualquer2” 
    And eu estou na página “home”
    And o pedido “pedido generico” existe para o meu perfil
    When eu escolho a opção “Estatísticas”
    Then eu estou na página “Estatísticas de pedidos”

Scenario: visualizar estatísticas mensais
    Given que eu estou na página “Estatísticas de pedidos”
    And o sistema tem registrado, associado a meu perfil,  o pedido de número “3071” com o item “Pizza”, de valor “59,90”, 
    status “entregue”, data “05/05/2024” e o pedido de número “3081” com o item “Hambúrguer”, de valor “39,90”, status “entregue”, 
    data “11/05/2024”
    When eu seleciono “mensal” no campo período de detalhamento
    Then eu estou na aba “detalhes mensais” da página “estatística de pedidos”
    And eu consigo ver a lista de detalhamento mensal com o mês “Maio” com gastos totais  “99,80” e número de itens “2”

Scenario: visualizar estatísticas diárias
    Given que eu estou na página “Estatísticas de pedidos”
    And o sistema tem registrado, associado a meu perfil,  o pedido de número “3071” com o item “Pizza”, de valor “59,90”, 
    status “entregue”, data “05/05/2024” e o pedido de número “3081” com o item “Hambúrguer”, de valor “39,90”, status “entregue”, 
    data “11/05/2024”
    When eu seleciono “diário” no campo período de detalhamento
    Then eu estou na aba “detalhes mensais” da página “estatística de pedidos”
    And eu consigo ver a lista de detalhamento diário com o dia “05/05/2024” com gastos totais  “59,90” e número de itens “1” e o dia 
    “11/05/2024” com gastos totais “39,90” e número de itens “1”
