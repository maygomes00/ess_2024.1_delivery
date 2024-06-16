import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest'
import app from '../../src/app'
import { di } from '../../src/di'
import TestRepository from '../../src/repositories/test.repository'
import ItemEntity from '../../src/entities/item.entity';
import { json } from 'stream/consumers';
import fs from 'fs'
import path from 'path'

const feature = loadFeature('./tests/features/itens.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // Mock do repositório
  let mockTestRepository: TestRepository;
  let response: supertest.Response | null;

  const original_data = JSON.parse(fs.readFileSync(path.resolve("./src/data/itens/images"), 'utf-8'))
  var test_data = original_data

  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository)
    response = null
    test_data = original_data
  })

  test("Obter todos os itens de um restaurante", ({ given, and, when, then }) => {
    given(/^item com id “(.*)” e id de restaurante “(.*)” existe no banco de dados$/, (itemId, restId) => {
      //
      test_data.push({id: itemId, restaurant_id: restId,});
    });

    and(/^item com id “(.*)” e id de restaurante “(.*)” existe no banco de dados$/, (itemId, restId) => {
      //
      test_data.push({id: itemId, restaurant_id: restId,});
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.post(url)
    });

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    });

    and(/^retorna lista que contem item com id “(\d+)” e id de restaurante “(\d+)”$/, (itemId, restId) => {
      if (response != null){
        const e = {
          id: itemId,
          restaurant_id: restId,
          name: "",
          price: "",
          description: "",
          categories: ""
        }
        expect(response.body.data).toEqual(e)
      }
      else {
        fail("response is null")
      }
    });

    and(/^retorna lista que contem item com id “(\d+)” e id de restaurante “(\d+)”$/, (itemId, restId) => {
      if (response != null){
        expect(response.body.data).toEqual({
          id: itemId,
          restaurant_id: restId,
          name: "",
          price: "",
          description: "",
          categories: ""
        })
      }
      else {
        fail("response is null")
      }
    });
  });
})
