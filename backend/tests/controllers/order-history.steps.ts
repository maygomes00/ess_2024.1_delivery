import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';

const feature = loadFeature('tests/features/order-history.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockTestRepository: TestRepository;
  let response: supertest.Response;
  let user: any;

  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository);
  });

  test('Usuario com pedidos', ({ given, when, then, and }) => {
    given(/^o usuário de id "(.*)" está registrado no sistema$/, async (userId) => {

      user = await request.get(`/users/${userId}`);
      expect(user.body.error).not.toBeDefined();
    });

    and(/^o usuário possui um pedido de id "(.*)"$/, async (orderId) => {
      const order = user.body.pedidos.find((order: any) => order.order_id == orderId);
      expect(order).toBeDefined();
    });

    when('é feita uma requisição para obter os pedidos do usuário', async () => {
        response = await request.get(`/users/${user.body.id}/orders`);
    });

    then(/^o status da resposta retornada é "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode));
    });

    and(/^a resposta deve conter o pedido com id "(.*)"$/, (order_id) => {
        const order = response.body.find((order: any) => order.order_id == order_id);
        expect(order).toBeDefined();
        });
  });

  /////////////////////////////////////////////////////////////////

  test('Usuario sem pedidos', ({ given, when, then, and }) => {
    given(/^o usuário de id "(.*)" está registrado no sistema$/, async (userId) => {

      user = await request.get(`/users/${userId}`);
      expect(user.body.error).not.toBeDefined();
    });

    and('o usuário não possui pedidos', async () => {
        expect(user.body.pedidos.length).toEqual(0);
    });

    when('é feita uma requisição para obter os pedidos do usuário', async () => {
        response = await request.get(`/users/${user.body.id}/orders`);
    });

    then(/^o status da resposta retornada é "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode));
    });
    
    and(/^a mensagem "(.*)" deve ser retornada$/, (message) => {
      expect(response.body.message).toBe(message);
    });
  });
});