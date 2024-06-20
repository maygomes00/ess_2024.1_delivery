Cenário: Cadastro de usuário com e-mail já usado:
Given o usuário está na página "Registro"
And o sistema já possui no seu banco de dados um usuário com o email "joãodasilva@gmail.com"
When o usuário preenche o campo Email com "joãodasilva@gmail.com"
And o usuário preenche o campo Nome com "João"
And o usuário preenche o campo Telefone com "334449684"
And o usuário preenche o campo Endereço com "Rua das margaridas, 12"
And o usuário preenche o campo Senha com "123456789"
And o usuário clica no botão "Cadastrar"
Then o sistema exibe uma mensagem de erro informando que o e-mail já está em uso

Cenário: Cadastro de usuário com nome já usado:
Given o usuário está na página "Registro"
And o sistema já possui no seu banco de dados um usuário com o nome “Pedro”
When o usuário preenche o campo nome com "Pedro"
And o usuário preenche o campo Email com "pedro@gmail.com"
And o usuário preenche o campo Telefone com "123456789"
And o usuário preenche o campo Endereço com "Rua das rosas, 09"
And o usuário preenche o campo Senha com "147258369"
And o usuário clica no botão "Cadastrar"
Then o sistema exibe uma mensagem de erro informando que o nome já está em uso

Cenário: Cadastro de usuário com email incorreto:
Given o usuário está na página "Registro de Usuário"
When o usuário preenche o campo Email com "joao@.com"
And o usuário preenche o campo Nome com "João"
And o usuário preenche o campo Telefone com "12344321"
And o usuário preenche o campo Endereço com "Rua da vieira, 48"
And o usuário preenche o campo Senha com "159354864"
And o usuário clica no botão "Cadastrar"
Then o sistema exibe mensagens de erro informando que o campo de email está inválido

Cenário: Cadastro de usuário com dados obrigatórios corretos:
Given o usuário está na página "Cadastro de Cliente"
When o usuário preenche o campo Email com "luffymugiwara@gmail.com"
And o usuário preenche o campo Nome com "Luffy"
And o usuário preenche o campo Telefone com "845181584"
And o usuário preenche o campo Endereço com "Rua de Pedra, 97"
And o usuário preenche o campo Senha com "417217476"
And o usuário clica no botão "Cadastrar"
Then o sistema cadastra o cliente e exibe uma mensagem de cadastro realizado com sucesso

Cenário: Cadastro de usuário com telefone inválido:
Given o usuário está na página "Cadastro de Cliente"
When o usuário preenche o campo Email com "midoriyaizuku@gmail.com"
And o usuário preenche o campo Nome com "midoriya"
And o usuário preenche o campo Telefone com "1234"
And o usuário preenche o campo Endereço com "Rua da macieira, 10"
And o usuário preenche o campo Senha com "195354547"
And o usuário clica no botão "Cadastrar"
Then o sistema exibe uma mensagem de erro informando que o telefone é inválido

Cenário: Cadastro de usuário com nome e telefone vazios:
Given o usuário está na página "Cadastro de Cliente"
When o usuário deixa os campos Nome e Telefone vazios
And o usuário preenche o campo Email com "victorluna@gmail.com"
And o usuário preenche o campo Endereço com "Rua das Flores, 123"
And o usuário preenche o campo Senha com "521594519"
And o usuário clica no botão "Cadastrar"
Then o sistema exibe mensagens de erro informando que esses campos são obrigatórios

Cenário: Atualização de nome:
Given o usuário está na página "Atualização de usuário"
And o sistema já possui no seu banco de dados um usuário com o nome “Luffy”
When o usuário altera o campo Nome para "Monkey .D Luffy"
And o usuário clica no botão "Atualizar"
Then o sistema atualiza o nome do cliente e exibe uma mensagem de sucesso

Cenário: Atualização de endereço:
Given o usuário está na página "Atualização de Cliente"
When o usuário altera o campo Endereço para "Avenida das Acácias, 456"
And o usuário clica no botão "Atualizar"
Then o sistema atualiza o endereço do cliente e exibe uma mensagem de sucesso
Cenário: Remoção de usuário com sucesso
Given o usuário está na página "Remoção de Usuário"
When o usuário seleciona o usuário “João” na lista
And o usuário clica no botão "Remover"
And o sistema exibe uma mensagem de confirmação
When o usuário confirma a remoção
Then o sistema remove o cliente e exibe uma mensagem de sucesso

Cenário: Cancelamento da remoção de usuário
Given o usuário está na página "Remoção de Cliente"
When o usuário seleciona um cliente na lista
And o usuário clica no botão "Remover"
And o sistema exibe uma mensagem de confirmação
When o usuário cancela a remoção
Then o sistema exibe uma mensagem de que a operação não foi realizada, não remove o cliente e retorna à página de manutenção sem alterações
