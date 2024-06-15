import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';

const feature = loadFeature('tests/features/category.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockTestRepository: TestRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository);
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

  test('Obter todas as categorias', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {
      // Não é necessário implementar nada aqui, pois o mock do repositório é feito no beforeEach
    });

    when('realizar uma requisição “GET”', async () => {
      response = await request.get('/restaurant/menu/category');
    });

    then('o status da resposta retornada é “200 Ok”', () => {
      expect(response.status).toBe(200);
    });

    and('o Json retornado é uma lista de categorias', () => {
      expect(response.body.categorias).toBeDefined(); // Verifica se existe a propriedade categorias
      expect(Array.isArray(response.body.categorias)).toBe(true); // Verifica se categorias é um array
      expect(response.body.categorias.length).toBeGreaterThan(0); // Verifica se o array não está vazio
    });

    and('a categoria com nome “Doce” está na lista', () => {
      const categoriaDoce = response.body.categorias.find((category: { nome: string }) => category.nome === 'Doce');
      expect(categoriaDoce).toBeDefined();
    });

    and('a categoria com nome “Salgado” está na lista', () => {
      const categoriaSalgado = response.body.categorias.find((category: { nome: string }) => category.nome === 'Salgado');
      expect(categoriaSalgado).toBeDefined();
    });
  });
});
