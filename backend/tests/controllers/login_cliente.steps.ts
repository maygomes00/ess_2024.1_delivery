import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { beforeEach } from 'node:test';
import fs from 'fs';

const feature = loadFeature('tests/features/login_cliente.feature');
const request = supertest(app);
const dbPath = 'src/data/users/users.json';

defineFeature(feature, (test) => {
  let response: supertest.Response | null;

  // Função auxiliar para ler o arquivo de usuários
  const readUsersFile = () => {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  };

  beforeEach(() => {
    response = null;
  });

  // POST FOR SUCCESSFUL LOGIN
  test('Realizar login de um cliente com sucesso', ({ given, when, then, and }) => {
    given('acesso a rota "/login-client"', () => {});

    when('realizo uma requisição "POST" com o email "john.doe@example.com" e o password "senha123"', async () => {
      response = await request.post('/login-client').send({
        email: "john.doe@example.com",
        password: "senha123", // Enviando as credenciais do Cliente
      });
    });

    then('o status da resposta retornada da API é "200"', () => {
      expect(response!.status).toBe(200);
    });

    and('o retorno deve ser a mensagem "Login successful" e o id do usuário', () => {
      expect(response!.body).toEqual(expect.objectContaining({ message: 'Login successful', id: "1" }));
    });
  });

  // POST FOR LOGIN WITH WRONG PASSWORD
  test('Realizar login de um cliente com senha incorreta', ({ given, when, then, and }) => {
    given('acesso a rota "/login-client"', () => {});

    when('realizo uma requisição "POST" com o email "john.doe@example.com" e o password "senha456"', async () => {
      response = await request.post('/login-client').send({
        email: "john.doe@example.com",
        password: "senha456", // Enviando as credenciais do Cliente
      });
    });

    then('o status da resposta retornada da API é "401"', () => {
      expect(response!.status).toBe(401);
    });

    and('o retorno deve ser a mensagem "Invalid credentials"', () => {
      expect(response!.body).toEqual({ message: 'Invalid credentials' });
    });
  });

  // POST FOR LOGIN WITH WRONG EMAIL
  test('Realizar login de um cliente com e-mail incorreto', ({ given, when, then, and }) => {
    given('acesso a rota "/login-client"', () => {});

    when('realizo uma requisição "POST" com o email "john.doe@gmail.com" e o password "senha123"', async () => {
      response = await request.post('/login-client').send({
        email: "john.doe@gmail.com",
        password: "senha123", // Enviando as credenciais do Cliente
      });
    });

    then('o status da resposta retornada da API é "401"', () => {
      expect(response!.status).toBe(401);
    });

    and('o retorno deve ser a mensagem "Invalid credentials"', () => {
      expect(response!.body).toEqual({ message: 'Invalid credentials' });
    });
  });

  // POST FOR SUCCESSFUL LOGOUT
  test('Realizar logout de um cliente com sucesso', ({ given, when, then, and }) => {
    given('um cliente está logado', async () => {
      // Realizando o login primeiro
      response = await request.post('/login-client').send({
        email: "john.doe@example.com",
        password: "senha123",
      });
      expect(response!.status).toBe(200);
    });

    when('realizo uma requisição "POST" para "/login-client/logout-client"', async () => {
      response = await request.post('/login-client/logout-client');
    });

    then('o status da resposta retornada da API é "200"', () => {
      expect(response!.status).toBe(200);
    });

    and('o retorno deve ser a mensagem "Logout successful"', () => {
      expect(response!.body).toEqual({ message: 'Logout successful' });
    });
  });
});
