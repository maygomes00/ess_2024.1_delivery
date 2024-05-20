Feature: Gerar link de compartilhamento de página personalizada
	As a usuário restaurante ou cliente
	I want to gerar um link único para uma página de restaurante personalizada
	so that posso compartilhar informações sobre o restaurante com outras pessoas

Scenario: Gerar link de compartilhamento sendo gerente da página
	Given estou logado como restaurante com login “Restaurante1” e senha “rest123”
	And   estou na página “Informações” do perfil “Restaurante1”
 	And   vejo informações sobre o cardápio do “Restaurante1”
	And   vejo o botão “Gerar Link” na parte inferior da página
	When  pressiono o botão “Gerar Link”
	Then  aparece um pop-up com um link criado e um ícone compartilhar.

Scenario: Tentar gerar link para uma página sem informações
	Given estou logado como restaurante com login “Restaurante1” e senha “rest123”
	And   estou na página “Informações” do perfil “Restaurante1”
	And   as informações sobre o restaurante estão vazias
	And   vejo o botão “Gerar link”  na parte inferior da página
	When  pressiono o botão “Gerar link”
	Then  aparece um pop-up com a frase “Adicione alguma informação sobre o restaurante”

Scenario: Gerar link de compartilhamento sendo usuário cliente
	Given estou logado com login “Cliente1” e senha “cliente123”
	And   estou na página “Informações” do perfil “Restaurante1”
 	And   vejo informações sobre o cardápio do “Restaurante1”
	And   vejo o botão “Gerar Link” na parte inferior da página
	When  pressiono o botão “Gerar Link”
	Then  aparece um pop-up com um link criado e um ícone compartilhar.

Scenario: Tentar gerar link para uma página sem informações com perfil de cliente
	Given estou logado com login “Cliente1” e senha “cliente123”
	And   estou na página “Informações” do perfil “Restaurante1”
	And   as informações sobre o restaurante estão vazias
	And   vejo o botão “Gerar link”  na parte inferior da página
	When  pressiono o botão “Gerar link”
	Then  aparece um pop-up com a frase “Este perfil não possui informações”