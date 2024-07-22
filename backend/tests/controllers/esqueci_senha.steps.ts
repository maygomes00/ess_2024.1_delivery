import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('tests/features/esqueci_senha.feature');
const request = supertest(app);

const dbPath = './src/data/users/users.json';

interface User {
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

defineFeature(feature, (test) => {
  let response: supertest.Response | null = null;

  const loadUsers = (): { clientes: User[] } => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  };

  const saveUsers = (clientes: User[]) => {
    fs.writeFileSync(dbPath, JSON.stringify({ clientes }, null, 2));
  };

  test('Solicitar alteração de senha de um cliente', ({ given, when, then, and }) => {
    given('que eu acesse a rota "/forgot-password"', () => {});

    when('eu realizo uma requisição "POST" com o email "john.doe@example.com"', async () => {
      response = await request.post('/forgot-password').send({
        email: "john.doe@example.com",
      });
    });

    then('o status da resposta retornada da API é "200"', () => {
      expect(response!.status).toBe(200);
    });

    and('o retorno deve ser a mensagem "Link para recuperação de sua senha senha foi enviado para o seu e-mail"', () => {
      expect(response!.body).toEqual({ msg: 'Link para recuperação de sua senha senha foi enviado para o seu e-mail', msgCode: 'success', code: 200 });
    });
  });

  test('Alterar senha com token válido', ({ given, when, then, and }) => {
    let token: string;

    given('que eu tenho um token de reset válido', () => {
      const { clientes } = loadUsers();
      const user = clientes.find(u => u.email === "john.doe@example.com");
      if (user) {
        token = user.resetPasswordToken!;
      }
    });

    when('eu realizo uma requisição "POST" para "/forgot-password/reset/<token>" com a nova senha "novaSenha123"', async () => {
      response = await request.post(`/forgot-password/reset/${token}`).send({
        newPassword: "novaSenha123",
      });
    });

    then('o status da resposta retornada da API é "200"', () => {
      expect(response!.status).toBe(200);
    });

    and('o retorno deve ser a mensagem "Senha nova confirmada! Tente fazer login novamente!"', () => {
      expect(response!.body).toEqual({ msg: 'Senha nova confirmada! Tente fazer login novamente!', msgCode: 'success', code: 200 });
    });
  });

  test('Alterar senha com token válido ou expirado', ({ given, when, then, and }) => {
    let invalidToken = "invalidToken123";

    given('que eu tenho um token de reset inválido ou expirado', () => {
      // Setting an invalid token for test purposes
    });

    when('eu realizo uma requisição "POST" para "/forgot-password/reset/<token>" com a nova senha "novaSenha123"', async () => {
      response = await request.post(`/forgot-password/reset/${invalidToken}`).send({
        newPassword: "novaSenha123",
      });
    });

    then('o status da resposta retornada da API é "400"', () => {
      expect(response!.status).toBe(400);
    });

    and('o retorno deve ser a mensagem "Token is invalid or has expired"', () => {
      expect(response!.body).toEqual({ msg: 'Token is invalid or has expired', msgCode: 'failure', code: 400 });
    });
  });
});
