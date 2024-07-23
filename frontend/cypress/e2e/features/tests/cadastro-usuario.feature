Feature: Cadastro de Usuário
  Como um usuário
  Eu quero me cadastrar no sistema
  Para que eu possa acessar as funcionalidades restritas

Scenario: Cadastro de usuário com sucesso
  Given o usuário está na página "users"
  When o usuário preenche o campo "nome" com "João"
  And o usuário preenche o campo "email" com "joao@example.com"
  And o usuário preenche o campo "telefone" com "123456789"
  And o usuário preenche o campo "endereco" com "Rua Exemplo, 123"
  And o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "cadastrar"
  Then o usuário deve ver a mensagem "Usuário cadastrado com sucesso!"

Scenario: Cadastro de usuário com email já existente
  Given o usuário está na página "users"
  When o usuário preenche o campo "nome" com "Maria"
  And o usuário preenche o campo "email" com "joao@example.com"
  And o usuário preenche o campo "telefone" com "987654321"
  And o usuário preenche o campo "endereco" com "Avenida Teste, 456"
  And o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "cadastrar"
  Then o usuário deve ver a mensagem "Email já cadastrado, use outro email."

Scenario: Cadastro de usuário com campo nome vazio
  Given o usuário está na página "users"
  When o usuário não preenche o campo "nome"
  And o usuário preenche o campo "email" com "maria@example.com"
  And o usuário preenche o campo "telefone" com "987654321"
  And o usuário preenche o campo "endereco" com "Avenida Teste, 456"
  And o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "cadastrar"
  Then o usuário deve ver a mensagem "O campo nome é obrigatório."

Scenario: Cadastro de usuário com campo email vazio
  Given o usuário está na página "users"
  When o usuário preenche o campo "nome" com "Carlos"
  And o usuário não preenche o campo "email"
  And o usuário preenche o campo "telefone" com "987654321"
  And o usuário preenche o campo "endereco" com "Avenida Teste, 456"
  And o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "cadastrar"
  Then o usuário deve ver a mensagem "O campo email é obrigatório."

Scenario: Cadastro de usuário com email inválido
  Given o usuário está na página "users"
  When o usuário preenche o campo "nome" com "Ana"
  And o usuário preenche o campo "email" com "ana#example.com"
  And o usuário preenche o campo "telefone" com "987654321"
  And o usuário preenche o campo "endereco" com "Avenida Teste, 456"
  And o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "cadastrar"
  Then o usuário deve ver a mensagem "O email fornecido é inválido."

Scenario: Cadastro de usuário com campo telefone vazio
  Given o usuário está na página "users"
  When o usuário preenche o campo "nome" com "Pedro"
  And o usuário preenche o campo "email" com "pedro@example.com"
  And o usuário não preenche o campo "telefone"
  And o usuário preenche o campo "endereco" com "Avenida Teste, 456"
  And o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "cadastrar"
  Then o usuário deve ver a mensagem "O campo telefone é obrigatório."

Scenario: Cadastro de usuário com campo endereço vazio
  Given o usuário está na página "users"
  When o usuário preenche o campo "nome" com "Paula"
  And o usuário preenche o campo "email" com "paula@example.com"
  And o usuário preenche o campo "telefone" com "987654321"
  And o usuário não preenche o campo "endereco"
  And o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "cadastrar"
  Then o usuário deve ver a mensagem "O campo endereço é obrigatório."

Scenario: Atualização bem-sucedida de dados do usuário
  Given o usuário está na página "/users/config/edit/:userId"
  When o usuário preenche o campo "nome" com "João Atualizado"
  And o usuário preenche o campo "email" com "joaoatualizado@example.com"
  And o usuário preenche o campo "telefone" com "987654321"
  And o usuário preenche o campo "endereco" com "Rua Atualizada, 456"
  And o usuário preenche o campo "senha" com "senhaNova123"
  And o usuário clica no botão "salvar"
  Then o usuário deve ver a mensagem "Dados do usuário atualizados com sucesso!"

Scenario: Tentativa de atualização com dados inválidos
  Given o usuário está na página "/users/config/edit/:userId"
  When o usuário preenche o campo "email" com "emailinvalido"
  And o usuário clica no botão "salvar"
  Then o usuário deve ver a mensagem "O email fornecido é inválido."

Scenario: Visualização dos dados do usuário
  Given o usuário está na página "/users/config"
  When o usuário acessa a página
  Then o sistema deve mostrar os dados cadastrados do usuário corretamente

Scenario: Tentativa de visualização de usuário inexistente
  Given o usuário está na página "/users/config"
  When o usuário tenta acessar um usuário inexistente
  Then o sistema deve mostrar a mensagem "Usuário não encontrado."

Scenario: Remoção bem-sucedida de usuário
  Given o usuário está na página "/users/config"
  When o usuário seleciona um usuário existente
  And o usuário clica no botão "deletar"
  Then o sistema deve remover o usuário selecionado
  And o usuário deve ver a mensagem "Usuário removido com sucesso."

Scenario: Tentativa de remoção de usuário inexistente
  Given o usuário está na página "/users/config"
  When o usuário tenta remover um usuário inexistente
  Then o sistema deve mostrar a mensagem "Usuário não encontrado."

Scenario: Alteração bem-sucedida de senha
  Given o usuário está na página "/users/config/edit/:userId"
  When o usuário preenche o campo "senha" com "senhaValida123"
  And o usuário clica no botão "salvar"
  Then o sistema deve atualizar o usuário com sucesso
  And o usuário deve ver a mensagem "Senha alterada com sucesso."

