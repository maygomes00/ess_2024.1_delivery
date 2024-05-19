Feature: Gerar link de compartilhamento de página personalizada
	As a usuário restaurante ou cliente
	I want to gerar um link único para um cardápio personalizado
	so that posso compartilhar um cardápio personalizado com outras pessoas

Scenario: Gerar link de compartilhamento
	Given estou logado como restaurante com login “Restaurante1” e senha “rest123”
	And   estou na página “Cardápio personalizado”
	And   vejo o cardápio nomeado “sobremesa”  com quantidade “10” de itens 
	And   vejo o botão “Gerar Link” ao lado do cardápio
	When  pressiono o botão “Gerar Link”
	Then  aparece um pop-up com um link criado e um ícone compartilhar.

Scenario: Tentar gerar link para um cardápio vazio
	Given estou logado como restaurante com login “Restaurante1” e senha “rest123”
	And   estou na página “Cardápio personalizado”
	And   o cardápio com o nome “Almoço” está com a quantidade “0” de itens
	And   vejo o botão “Gerar link” ao lado do cardápio
	When  pressiono o botão “Gerar link”
	Then  aparece um pop-up com a frase “Adicione pelo menos um item ao cardápio”