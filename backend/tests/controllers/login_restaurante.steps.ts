import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';
import { beforeEach } from 'node:test';
import path from 'path';
import fs from 'fs';

const feature = loadFeature('tests/features/login_restaurante.feature');
const request = supertest(app);
const dbPath = 'src/data/restaurants/restaurants.json';

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

  afterEach(() => {
    // Clean up any open resources here if necessary
    jest.clearAllMocks();
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
  test('Realizar login de um restaurante com sucesso', ({ given, when, then, and }) => {
    given('acesso a rota "/login-restaurant"', () => {
    });

    when('realizo uma requisição "POST"', async () => {
      response = await request.post('/login-restaurant').send({
        email: "undecillion2@example.com",
        password: "!secureP4$$W0RD1234", // Enviando as credenciais do Restaurante
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
 test('Realizar login de um restaurante com senha incorreta', ({ given, when, then, and }) => {
  given('acesso a rota "/login-restaurant"', () => {
  });

  when('realizo uma requisição "POST" com o email "undecillion2@example.com" e o password "wrongpassword!"', async () => {
    response = await request.post('/login-restaurant').send({
      email: "undecillion2@example.com",
      password: "wrongpassword!", // Enviando as credenciais do Restaurante
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
test('Realizar login de um restaurante com e-mail incorreto', ({ given, when, then, and }) => {
  given('acesso a rota "/login/restaurant"', () => {
  });

  when('realizo uma requisição "POST" com o email "undecillion@gmail.com" e o password "!secureP4$$W0RD1234"', async () => {
    response = await request.post('/login/restaurant').send({
      email: "undecillion@gmail.com",
      password: "!secureP4$$W0RD1234", // Enviando as credenciais do Restaurante
    });
  });

  then('o status da resposta retornada da API é "401"', () => {
    expect(response!.status).toBe(401);
  });

  and('o retorno deve ser a mensagem "Invalid credentials"', () => {
    expect(response!.body).toEqual({ message: 'Invalid credentials' })
  });
});


/////////////// POST FOR LOGIN WITH ClIENT CREDENCIALS
test('Realizar login de um restaurante com credenciais de Cliente', ({ given, when, then, and }) => {
  given('acesso a rota "/login/restaurant"', () => {
  });

  when('realizo uma requisição "POST" com o email "joao.silva@example.com" e o password "senha123"', async () => {
    response = await request.post('/login/restaurant').send({
      email: "joao.silva@example.com",
      password: "senha123", // Enviando as credenciais do Restaurante
    });
  });

  then('o status da resposta retornada da API é "401"', () => {
    expect(response!.status).toBe(401);
  });

  and('o retorno deve ser a mensagem "Invalid credentials"', () => {
    expect(response!.body).toEqual({ message: 'Invalid credentials' })
  });
});
});