Feature: Esqueci Senha

  Scenario: Solicitar alteração de senha de um cliente
    Given que eu acesse a rota "/forgot-password"
    When eu realizo uma requisição "POST" com o email "john.doe@example.com"
    Then o status da resposta retornada da API é "200"
    And o retorno deve ser a mensagem "Link para recuperação de sua senha senha foi enviado para o seu e-mail"

  Scenario: Alterar senha com token válido
    Given que eu tenho um token de reset válido
    When eu realizo uma requisição "POST" para "/forgot-password/reset/<token>" com a nova senha "novaSenha123"
    Then o status da resposta retornada da API é "200"
    And o retorno deve ser a mensagem "Senha nova confirmada! Tente fazer login novamente!"

  Scenario: Alterar senha com token válido ou expirado
    Given que eu tenho um token de reset inválido ou expirado
    When eu realizo uma requisição "POST" para "/forgot-password/reset/<token>" com a nova senha "novaSenha123"
    Then o status da resposta retornada da API é "400"
    And o retorno deve ser a mensagem "Token is invalid or has expired"
