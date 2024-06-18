import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import express from 'express';
import userRoutes from '../../src/routes/usuario.routes';
import TestRepository from '../../src/repositories/test.repository';

const feature = loadFeature('tests/features/client.feature');
const app = express();
app.use(express.json());
app.use('/users', userRoutes); // Adicione o prefixo '/users' à rota
const request = supertest(app);

// Mock do repositório
let mockTestRepository: TestRepository;
let response: supertest.Response;

defineFeature(feature, (test) => {
  beforeEach(() => {
    mockTestRepository = new TestRepository(); // Assumindo que você tem um repositório TestRepository
  });

  test('Obter todos os usuários', ({ given, when, then, and }) => {
    given('acesso a rota "/users"', () => {
      // Não é necessário implementar nada aqui, pois o mock do repositório é feito no beforeEach
    });

    when('realizar uma requisição "GET"', async () => {
      response = await request.get('/users');
    });

    then('o status da resposta retornada é "200 Ok"', () => {
      expect(response.status).toBe(200);
    });

    and('o Json retornado é uma lista de usuários', () => {
      expect(response.body.clientes).toBeDefined(); // Verifica se existe a propriedade clientes
      expect(Array.isArray(response.body.clientes)).toBe(true); // Verifica se clientes é um array
      expect(response.body.clientes.length).toBeGreaterThan(0); // Verifica se o array não está vazio
    });

    and('o usuário com nome "João Silva" está na lista', () => {
      const usuarioJoao = response.body.clientes.find((user: { nome: string }) => user.nome === 'João Silva');
      expect(usuarioJoao).toBeDefined();
    });

    and('o usuário com nome "cascão" está na lista', () => {
      const usuarioMaria = response.body.clientes.find((user: { nome: string }) => user.nome === 'cascão');
      expect(usuarioMaria).toBeDefined();
    }); //////////////////////////////////////////////////////////////////////////////// ATUALIZAR CLIENTE
  });
    test('Update a client', ({ given, when, then, and }) => {
    given('acessando a rota "users/2"', () => {
      // Não é necessário implementar nada aqui, pois o mock do repositório é feito no beforeEach
    });

    when('uma requisição PUT com nome "cascão" e email "cascadebala@example.com"', async () => {
      response = await request.put('/users/2')
        .send({
          nome: "cascão",
          email: "cascadebala@example.com",
          password: "senha987",
          telefone: "(11) 9876-5432",
          endereco: "Rua Nova, 123, Bairro Novo, Cidade Nova, Estado Novo, 12345-678",
          pedidos: [],
          total: 0
        });
    });

    then('o status da resposta deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('o JSON da resposta deve conter o novo nome "cascão" e novo email "cascadebala@example.com"', () => {
      expect(response.body.nome).toBe("cascão");
      expect(response.body.email).toBe("cascadebala@example.com");
    }); //////////////////////////////////////////////////////////////////////////////// CRIAR CLIENTE
  });
      test('Create a client', ({ given, when, then, and }) => {
    given('acesso a rota "/users/register"', () => {
      // Não é necessário implementar nada aqui, pois o mock do repositório é feito no beforeEach
    });

    when('realizar uma requisição "POST com nome cliente "pedro", email "pedrinhogameplays@example.com", telefone "(81) 998425642", endereço "rua dos pedreiros"', async () => {
      response = await request.post('/users/register')
        .send({
          nome: "pedro",
          email: "pedrinhogameplays@example.com",
          password: "senha789",
          telefone: "(81) 998425642",
          endereco: "rua dos pedreiros",
          pedidos: [],
          total: 0
        });
    });

    then('o status da resposta deve ser "201"', () => {
      expect(response.status).toBe(201);
    });

    and('o JSON da resposta deve conter o nome "pedro" e email "pedrinhogameplays@example.com"', () => {
      expect(response.body.nome).toBe("pedro");
      expect(response.body.email).toBe("pedrinhogameplays@example.com");
    });
  });

  test('Get a client', ({ given, when, then, and }) => {
    given('acesso a rota "/users/1"', () => {
      // Não é necessário implementar nada aqui, pois o mock do repositório é feito no beforeEach
    });

    when('realiza uma requisição GET', async () => {
      response = await request.get('/users/1');
    });

    then('o status da resposta deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('o JSON da resposta deve conter o nome "João Silva" e email "john.doe@example.com"', () => {
      expect(response.body.nome).toBe("João Silva");
      expect(response.body.email).toBe("john.doe@example.com");
    });
  });
    test('Delete a client', ({ given, when, then }) => {
    given('acesso a rota "/users/3"', () => {
      // Não é necessário implementar nada aqui, pois o mock do repositório é feito no beforeEach
    });

    when('uma requisição DELETE for enviada', async () => {
      response = await request.delete('/users/3');
    });

    then('o status da resposta deve ser "200"', () => {
      expect(response.status).toBe(200);
    });
  });
});


