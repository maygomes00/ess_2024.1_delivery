Cenário 1 Inserir Restaurante com Sucesso
Given que estou na página de cadastro de restaurante
When preencho os campos Nome com Restaurante X, Endereço com Rua Y, 123, Telefone com 1234-5678, Tipo de Cozinha com Italiana e Horário de Funcionamento com 10:00 - 22:00
And pressiono Salvar
Then vejo a mensagem Restaurante cadastrado com sucesso!
And o novo restaurante Restaurante X aparece na lista de restaurantes

Cenário 2 Remover Restaurante com Sucesso
Given que estou na página de lista de restaurantes
When seleciono o restaurante Restaurante Y
And pressiono Remover
And confirmo a remoção na mensagem de confirmação
Then vejo a mensagem Restaurante removido com sucesso!
And o restaurante Restaurante Y não aparece mais na lista de restaurantes

Cenário 3 Atualizar Restaurante com Sucesso
Given que estou na página de lista de restaurantes
When seleciono o restaurante Restaurante Z
And pressiono Editar
And modifico os campos desejados, como Endereço para Rua Nova, 456 e Horário de Funcionamento para 09:00 - 23:00
And pressiono Salvar
Then vejo a mensagem Restaurante atualizado com sucesso!

Cenário 4 Inserir Restaurante com Campos Obrigatórios em Branco
Given que estou na página de cadastro de restaurante
When deixo os campos Nome e Endereço em branco
And pressiono Salvar
Then vejo uma mensagem de erro Por favor, preencha todos os campos obrigatórios.

Cenário 5 Remover Restaurante e Cancelar
Given que estou na página de lista de restaurantes
When seleciono o restaurante Restaurante Y
And pressiono Remover
And cancelo a remoção na mensagem de confirmação
Then o restaurante Restaurante Y ainda aparece na lista de restaurantes
And aparece uma mensagem exibindo que a operação foi cancelada

Cenário 6 Atualizar Restaurante sem Modificar Dados
Given que estou na página de lista de restaurantes
When seleciono o restaurante Restaurante Z
And pressiono Editar
And não faço modificações nos campos
And pressiono Salvar
Then vejo a mensagem Nenhuma alteração foi feita.
And as informações do Restaurante Z permanecem inalteradas na lista de restaurantes
