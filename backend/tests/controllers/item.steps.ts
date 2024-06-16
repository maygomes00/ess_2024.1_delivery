import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';
import { beforeEach } from '@jest/globals'

const feature = loadFeature('tests/features/category.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // Mock do repositório
  let mockTestRepository: TestRepository;
  let response: supertest.Response | null;

  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository);
    response = null;
  });

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
  });