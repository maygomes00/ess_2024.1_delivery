import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';
import { beforeEach } from 'node:test';
import path from 'path';
import fs from 'fs';

const feature = loadFeature('tests/features/login_cliente.feature');
const request = supertest(app);
const dbPath = 'src/data/users/users.json';

defineFeature(feature, (test) => {
  // Mock do repositório
  let mockCategoryRepository: TestRepository;
  let response: supertest.Response | null;

  // Função auxiliar para ler o arquivo de usuários
const readUsersFile = () => {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

// Função auxiliar para escrever no arquivo de usuários
const writeUsersFile = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

  beforeEach(() => {
    mockCategoryRepository = di.getRepository<TestRepository>(TestRepository);
    response = null;
  });
/*
  test('Create a test', ({ given, when, then, and }) => {
    given(/^o TestRepository não tem um test com nome "(.*)"$/, async (testId, testName) => {
      // Check if the test does not exist in the repository and delete it if it exists
      const existingTest = await mockTestRepository.getTest(testId);
      if (existingTest) {
        await mockTestRepository.deleteTest(testId);
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)"$/,
      async (url, testName) => {
        response = await request.post(url).send({
          name: testName,
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter o nome "(.*)"$/, (testName) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            name: testName,
          })
        );
      }
    );
  });*/
  //////////// POST FOR SUCCESSFULL LOGIN
  test('Realizar login de um cliente com sucesso', ({ given, when, then, and }) => {
    given('acesso a rota "/login/client"', () => {
    });

    when('realizo uma requisição "POST"', async () => {
      response = await request.post('/login/client').send({
        email: "joao.silva@example.com",
        password: "senha123", // Enviando as credenciais do Cliente
      });
    });

    then('o status da resposta retornada da API é "200"', () => {
      expect(response!.status).toBe(200);
    });

    and('o retorno deve ser a mensagem "Login successful"', () => {
      expect(response!.body).toEqual({ message: 'Login successful' })
    });
  });



 //////////// POST FOR LOGIN WITH WRONG PASSWORD
 test('Realizar login de um cliente com senha incorreta', ({ given, when, then, and }) => {
  given('acesso a rota "/login/client"', () => {
  });

  when('realizo uma requisição "POST" com o email "joao.silva@example.com" e o password "senha456"', async () => {
    response = await request.post('/login/client').send({
      email: "joao.silva@example.com",
      password: "senha456", // Enviando as credenciais do Restaurante
    });
  });

  then('o status da resposta retornada da API é "401"', () => {
    expect(response!.status).toBe(401);
  });

  and('o retorno deve ser a mensagem "Invalid credentials"', () => {
    expect(response!.body).toEqual({ message: 'Invalid credentials' })
  });
});



/////////////// POST FOR LOGIN WITH WRONG EMAIL
test('Realizar login de um cliente com e-mail incorreto', ({ given, when, then, and }) => {
  given('acesso a rota "/login/client"', () => {
  });

  when('realizo uma requisição "POST" com o email "joao.silva@gmail.com" e o password "senha123"', async () => {
    response = await request.post('/login/client').send({
      email: "joao.silva@gmail.com",
      password: "senha123", // Enviando as credenciais do Cliente
    });
  });

  then('o status da resposta retornada da API é "401"', () => {
    expect(response!.status).toBe(401);
  });

  and('o retorno deve ser a mensagem "Invalid credentials"', () => {
    expect(response!.body).toEqual({ message: 'Invalid credentials' })
  });
});


/////////////// POST FOR LOGOT
test('Realizar logout de um cliente logado', ({ given, when, then, and }) => {
  given('acesso a rota "/logout"', async () => {
    response = await request.post('/login/client').send({ 
      email: 'joao.silva@example.com', 
      password: 'senha123' });
    expect(response!.status).toEqual(200);
  });

  when('realizo uma requisição "POST" com o email "joao.silva@example.com" e o password "senha123"', async () => {
    response = await request.post('/logout')
  });

  then('o status da resposta retornada da API é "200"', () => {
    expect(response!.status).toBe(200);
  });

  and('o retorno deve ser a mensagem "Logout successful"', () => {
    expect(response!.body).toEqual({ message: 'Logout successful' })
  });
});
});
