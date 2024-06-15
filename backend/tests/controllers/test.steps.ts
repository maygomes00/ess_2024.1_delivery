import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';

const feature = loadFeature('tests/features/category.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // Mock do repositório
  let mockCategoryRepository: TestRepository;
  let response: supertest.Response | null;

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

  test('Tentar adicionar categoria sem dar nome', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {
      // Não é necessário nenhuma ação específica para acessar a rota
    });

    when('realizar uma requisição “POST”', async () => {
      response = await request.post('/restaurant/menu/category').send({
        name: "", // Enviando um nome vazio no corpo da requisição
      });
    });

    then('o status da resposta retornada é “400”', () => {
      expect(response!.status).toBe(400);
    });

    and('o retorno é a mensagem “É obrigatório um nome para a categoria!”', () => {
      expect(response!.body.error).toBe("É obrigatório um nome para a categoria!");
    });
  });
////////////////////////////////////
  test('Adicionar categoria nova', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {
      // Não é necessário nenhuma ação específica para acessar a rota
    });

    when('realizar uma requisição “POST” com  o valor “Doce” no body da requisição', async () => {
      response = await request.post('/restaurant/menu/category').send({
        nome: "Doce", // Enviando o nome "Doce" no corpo da requisição
      });
    });

    then('o status da resposta retornada é “201”', () => {
      expect(response!.status).toBe(201);
    });

    and('o Json retornado é a categoria criada com parâmetros nome “Doce”', () => {
      // Verifica se a resposta contém uma categoria com o nome "Doce"
      const categoriaDoce = response!.body;
      expect(categoriaDoce).toEqual(
        expect.objectContaining({
          nome: "Doce",
        })
      );
    });
  });

  test('Tentar adicionar categoria que já existe', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {});

    when('realizar uma requisição “POST” com o valor “Doce” no body da requisição', async () => {
      response = await request.post('/restaurant/menu/category').send({
        name: "Doce",
      });
    });

    then('o status da resposta retornada é “400 Bad Request”', () => {
      expect(response!.status).toBe(400);
    });

    and('o retorno é a mensagem “já existe uma category com esse nome!"', () => {
      expect(response!.body.error).toBe("Já existe uma category com esse nome!");
    });
  });

  test('Mudar nome de categoria', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/1”', () => {});

    when('realizar uma requisição “PUT” com o valor “Salgado” no body da requisição', async () => {
      response = await request.put('/restaurant/menu/category/1').send({
        nome: "Salgado",
      });
    });

    then('o status da resposta retornada é “200 Ok”', () => {
      expect(response!.status).toBe(200);
    });

    and('o Json retornado é a categoria com nome “Salgado”', () => {
      expect(response!.body).toEqual(
        expect.objectContaining({
          nome: "Salgado",
        })
      );
    });
  });

  test('Tentar mudar nome da categoria deixando em branco', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/1”', () => {});

    when('realizar uma requisição “PUT”', async () => {
      response = await request.put('/restaurant/menu/category/1').send({
        name: "",
      });
    });

    then('o status da resposta retornada é “400 Bad Request”', () => {
      expect(response!.status).toBe(400);
    });

    and('o retorno é a mensagem “Nome da categoria não pode ser vazio!”', () => {
      expect(response!.body).toEqual(
        expect.objectContaining({
          error: 'Nome da categoria não pode ser vazio!'
        })
      );
    });
  });

  test('Tentar mudar nome da categoria não encontrada', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/9”', () => {});

    when('realizar uma requisição “PUT” com o valor “Bebidas” no body da requisição', async () => {
      response = await request.put('/restaurant/menu/category/9').send({
        nome: "Bebidas",
      });
    });

    then('o status da resposta retornada é “404”', () => {
      expect(response!.status).toBe(404);
    });

    and('o retorno é a mensagem “Categoria não encontrada!”', () => {
      expect(response!.body.error).toBe("Categoria não encontrada!");
    });
  });

  test('Mudar nome de categoria para nome que já existe', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/1”', () => {});
  
    when('realizar uma requisição “PUT” com o valor “Doce” no body da requisição', async () => {
      response = await request.put('/restaurant/menu/category/1').send({
        nome: "Doce",
      });
    });
  
    then('o status da resposta retornada é “400”', () => {
      expect(response!.status).toBe(400);
    });
  
    and('o retorno é a mensagem “Já existe uma categoria com esse nome!”', () => {
      expect(response!.body.error).toBe("Já existe uma categoria com esse nome!");
    });
  });

  test('Obter todas as categorias', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {
      // Não é necessário implementar nada aqui, pois o mock do repositório é feito no beforeEach
    });

    when('realizar uma requisição “GET”', async () => {
      response = await request.get('/restaurant/menu/category');
    });

    then('o status da resposta retornada é “200 Ok”', () => {
      expect(response!.status).toBe(200);
    });

    and('o Json retornado é uma lista de categorias', () => {
      expect(response!.body.categorias).toBeDefined(); // Verifica se existe a propriedade categorias
      expect(Array.isArray(response!.body.categorias)).toBe(true); // Verifica se categorias é um array
      expect(response!.body.categorias.length).toBeGreaterThan(0); // Verifica se o array não está vazio
    });

    and('a categoria com nome “Doce” está na lista', () => {
      const categoriaDoce = response!.body.categorias.find((category: { nome: string }) => category.nome === 'Doce');
      expect(categoriaDoce).toBeDefined();
    });

    and('a categoria com nome “Salgado” está na lista', () => {
      const categoriaSalgado = response!.body.categorias.find((category: { nome: string }) => category.nome === 'Salgado');
      expect(categoriaSalgado).toBeDefined();
    });
  });

  test('Obter categoria pelo Id', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/2”', () => {
      // Não é necessário nenhuma ação específica para acessar a rota
    });

    when('realizar uma requisição “GET”', async () => {
      response = await request.get('/restaurant/menu/category/2');
    });

    then('o status da resposta retornada é “200 Ok”', () => {
      expect(response!.status).toBe(200);
    });

    and('o Json retornado é a categoria com parâmetros id “2”, nome “Doce”, restauranteId ”restaurante-1” e temItens “false”', () => {
      expect(response!.body).toEqual({
        id: "2",
        nome: "Doce",
        restauranteId: "restaurante-1",
        temItens: false
      });
    });
  });

  test('Tentar Obter categoria com Id inexistente', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/9”', () => {
      // Não é necessário nenhuma ação específica para acessar a rota
    });

    when('realizar uma requisição “GET”', async () => {
      response = await request.get('/restaurant/menu/category/9');
    });

    then('o status da resposta retornada é “404 Not Found”', () => {
      expect(response!.status).toBe(404);
    });

    and('o retorno é a mensagem “Categoria não encontrada!”', () => {
      expect(response!.body.error).toBe("Categoria não encontrada!");
    });
  });

});
