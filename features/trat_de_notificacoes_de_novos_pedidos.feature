Feature: Tratamento de notificações de novos pedidos

    # In order to #? gerenciar e satisfazer cada pedido corretamente, em tempo hábil
    # As a #! restaurante
    # I want to #$ receber notificações para cada novo pedido realizado na plataforma

    O(s) indivíduo(s) responsável(eis) pela administração de pedidos será(ão) capaz(es) de receber notificações para cada novo pedido direcionado ao restaurante.
    As notificações devem conter informações básicas e relevantes sobre o pedido.

# ANCHOR #§ - US

Scenario: Notificação de novo pedido é recebida enquanto o restaurante está em standby na tela principal ou em outras telas do app
    Given o restaurante "r_placeholder" está logado no app
    And o restaurante "r_placeholder" está na tela principal ou em outras telas do app (application has the focus)
    When o cliente "c_placeholder" de endereço "e_placeholder" realiza um novo pedido de valor total "vT_placeholder" de item(ns) "{i1_placeholder...iN_placeholder}" com valores respectivos "{v1_placeholder...vN_placeholder}" no horário "t_placeholder"
    Then o restaurante deve receber uma notificação de novo pedido no app, de número "num_placeholder" sendo advertido com um som ou vibração e um banner
    And a notificação deve incluir "c_placeholder", "e_placeholder", "vT_placeholder" como informações básicas
    And a notificação deve incluir os itens do pedido "{i1_placeholder...iN_placeholder}" com seus respectivos valores "{v1_placeholder...vN_placeholder}" como informações detalhadas (na ocasião de expansão da notificação)
    And o restaurante tem a opção de aceitar ou recusar no contexto da notificação

Scenario: Notificação de novo pedido é recebida enquanto o restaurante está fora do app
    Given o restaurante "r_placeholder" está logado no app
    And o restaurante "r_placeholder" não está interagindo com telas do app (application doesn't have the focus)
    When o cliente "c_placeholder" de endereço "e_placeholder" realiza um novo pedido de valor total "vT_placeholder" de item(ns) "{i1_placeholder...iN_placeholder}" com valores respectivos "{v1_placeholder...vN_placeholder}" no horário "t_placeholder"
    Then o restaurante não deve receber notificações externas

Scenario: Visualização do histórico de notificações
    Given o restaurante "r_placeholder" está logado no app
    And o restaurante "r_placeholder" está na tela principal ou em outras telas do app
    When o restaurante "r_placeholder" navega para a seção "Histórico de Pedidos"
    Then o restaurante deve ver uma lista de todas as notificações passadas no app
    And a notificação deve incluir "num_placeholder", "c_placeholder", "e_placeholder", "vT_placeholder" como informações básicas
    And a notificação deve incluir os itens do pedido "{i1_placeholder...iN_placeholder}" com seus respectivos valores "{v1_placeholder...vN_placeholder}" como informações detalhadas (na ocasião de expansão da notificação)
    And as notificações devem estar ordenadas da mais recente para a mais antiga

Scenario: O restaurante recusa um pedido diretamente da notificação
    Given o restaurante "r_placeholder" está logado no app
    And o restaurante "r_placeholder" recebe uma notificação de novo pedido
    When o restaurante "r_placeholder" recusa o pedido diretamente da notificação
    Then o pedido deve ser marcado como recusado no app, e a notificação deve ser registrada no histórico de notificações #? contains "refused order" as a tag ??

Scenario: O restaurante aceita um pedido diretamente da notificação
    Given o restaurante "r_placeholder" está logado no app
    And o restaurante "r_placeholder" recebe uma notificação de novo pedido
    When o restaurante "r_placeholder" aceita o pedido diretamente da notificação
    Then o pedido deve ser marcado como aceito no app, e a notificação deve ser registrada no histórico de notificações #? contains "accepted order" as a tag ??

# ANCHOR #§ - SS - SYM

Scenario: Notificação de novo pedido é processada pelo sistema enquanto o restaurante está em standby na tela principal ou em outras telas do app
    Given o restaurante "r_placeholder" está autenticado no sistema
    And o restaurante "r_placeholder" está interagindo diretamente com o sistema (application has the focus)
    When o cliente "c_placeholder" de endereço "e_placeholder" envia um novo pedido de valor total "vT_placeholder" de item(ns) "{i1_placeholder...iN_placeholder}" com valores respectivos "{v1_placeholder...vN_placeholder}" no horário "t_placeholder"
    Then o sistema deve gerar uma notificação de novo pedido para o restaurante, de número "num_placeholder" acionado mecanismos visuais e sonoros
    And a notificação deve incluir "num_placeholder", "c_placeholder", "e_placeholder", "vT_placeholder" como informações básicas
    And a notificação deve incluir os itens do pedido "{i1_placeholder...iN_placeholder}" com seus respectivos valores "{v1_placeholder...vN_placeholder}" como informações detalhadas (na ocasião de expansão da notificação)
    And a notificação deve permitir ao restaurante aceitar ou recusar o pedido diretamente
    And o sistema deve armazenar a notificação no histórico de notificações independentemente da ação do restaurante
    And o cliente deve ser notificado da ação do restaurante

Scenario: Notificação de novo pedido é processada pelo sistema enquanto o restaurante está fora do app
    Given o restaurante "r_placeholder" está autenticado ou não no sistema
    And o restaurante "r_placeholder" não está interagindo diretamente com o sistema no momento
    When o cliente "c_placeholder" de endereço "e_placeholder" envia um novo pedido de valor total "vT_placeholder" de item(ns) "{i1_placeholder...iN_placeholder}" com valores respectivos "{v1_placeholder...vN_placeholder}" no horário "t_placeholder"
    Then o sistema deve imediatamente gerar uma notificação pendente para o restaurante, de número "num_placeholder", que será entregue assim que o restaurante interagir com o sistema
    And a notificação deve incluir "num_placeholder", "c_placeholder", "e_placeholder", "vT_placeholder" como informações básicas
    And a notificação deve incluir os itens do pedido "{i1_placeholder...iN_placeholder}" com seus respectivos valores "{v1_placeholder...vN_placeholder}" como informações detalhadas (na ocasião de expansão da notificação)
    And a notificação deve permitir ao restaurante aceitar ou recusar o pedido diretamente
    And o sistema deve armazenar a notificação no histórico de notificações
    And o cliente deve ser notificado da ação do restaurante

Scenario: Processamento da visualização do histórico de notificações
    Given o restaurante "r_placeholder" está autenticado no sistema
    And o restaurante "r_placeholder" está ativo na tela principal ou em outras telas do app (focus on the app)
    When o restaurante "r_placeholder" tenta acessar o "Histórico de Notificações"
    Then o sistema deve recuperar as notificações armazenadas e apresentá-las ao restaurante
    And cada notificação deve incluir "num_placeholder", "c_placeholder", "e_placeholder", "vT_placeholder" como informações básicas
    And cada notificação deve incluir os itens do pedido "{i1_placeholder...iN_placeholder}" com seus respectivos valores "{v1_placeholder...vN_placeholder}" como informações detalhadas (na ocasião de expansão da notificação)
    And as notificações devem estar ordenadas da mais recente para a mais antiga

Scenario: Processamento da recusa de um pedido diretamente da notificação
    Given o restaurante "r_placeholder" está autenticado no sistema
    And o restaurante "r_placeholder" recebe uma notificação de novo pedido
    When o restaurante "r_placeholder" recusa o pedido diretamente da notificação
    Then o sistema deve recusar o pedido e emitir uma notificação de recusa para o cliente "c_placeholder"
    And o sistema deve armazenar a notificação recebida pelo restaurante no histórico de notificações, com a tag "recusado"
    And o tratamento de pagamento não deve ser efetuado

Scenario: Processamento da aceitação de um pedido diretamete da notificação
    Given o restaurante "r_placeholder" está autenticado no sistema
    And o restaurante "r_placeholder" recebe uma notificação de novo pedido
    When o restaurante "r_placeholder" aceita o pedido diretamente da notificação
    Then o sistema deve aceitar o pedido e emitir uma notificação de aceitação para o cliente "c_placeholder"
    And o sistema deve armazenar a notificação recebida pelo restaurante no histórico de notificações, com a tag "aceito"
    And o sistema deve iniciar o tratamento de pagamento