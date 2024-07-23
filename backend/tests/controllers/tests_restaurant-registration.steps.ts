import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { eraseRestaurants, setTesting } from '../../src/controllers/restaurant-controller';
import fs from 'fs';
import path from 'path';

const feature = loadFeature(
  'tests/features/tests-restaurant-registration.feature'
);
const request = supertest(app);
const restaurants_path = './src/data/restaurants/restaurants_database.json';

setTesting(true);

defineFeature(feature, (test) => {
  let response: supertest.Response | null;

  beforeEach(() => {
    eraseRestaurants();
    response = null;
  });

  test('Teste de sanidade dos restaurantes', ({ given, when, then, and }) => {
    given('acesso a rota "/restaurant/test"', () => {
      // não é necessário nenhum teste específico
    });

    when('requisção GET é efetuada', async () => {
      response = await request.get('/restaurant/test').send({});
    });

    then('o status code retornado deve ser 200', () => {
      expect(response!.status).toBe(200);
    });

    and('a mensagem de sucesso deve ser "Rota funcional"', () => {
      expect(response!.text).toBe('Rota funcional');
    });
  });

  test('Tentar cadastrar um restaurante sem preencher todos os campos obrigatórios', ({
    given,
    when,
    then,
    and,
  }) => {
    given('acesso a rota "/restaurant/"', () => {
      // não é necessário nenhum teste específico
    });

    when('requisção POST é efetuada com campos faltosos', async () => {
      response = await request.post('/restaurant/').send({
        email: 'abdce@example.com',
        password: '!secureP4$$W0RD1234',
        owner_name: 'Abcd Efgh',
        owner_address: '1234 Abcd Ab, Abcdefg, AB',
        owner_telephone: '55 (81) 12345-6789',
        restaurant_name: 'Abcde Fghij',
        restaurant_cnpj: '12.345.678/0001-99',
        restaurant_address: '5678 Ijklmn Ij, Ijkmlno, IJ',
        restaurant_telephone: '55 81 1111-1111',
      });
    });

    then('o status code retornado deve ser 400', () => {
      expect(response!.status).toBe(400);
    });

    and(
      'a mensagem de erro deve ser "Faltando informações obrigatórias"',
      () => {
        expect(response!.text).toBe('Faltando informações obrigatórias');
      }
    );
  });

  test('Tentar cadastrar um restaurante com um CNPJ já cadastrado', ({
    given,
    when,
    then,
    and,
  }) => {
    given('acesso a rota "/restaurant/"', () => {
      // não é necessário nenhum teste específico
    });

    and(
      'um restaurante com um CNPJ igual a o do restaurante a ser cadastrado já existe na base de dados do sistema',
      () => {}
    );

    when(
      'requisção POST é efetuada com um campo de CNPJ igual a um CNPJ já cadastrado',
      async () => {
        fs.readFileSync(path.resolve(restaurants_path), 'utf8');
        if (fs.existsSync(path.resolve(restaurants_path))) {
          const cnpjTestDatabase = fs.readFileSync(
            path.resolve(restaurants_path),
            'utf8'
          );
          if (cnpjTestDatabase) {
            let checkList = JSON.parse(cnpjTestDatabase);
            checkList.push({
              email: 'a@a.com',
              password: '!@#$AAZZaazz1234',
              owner_name: 'abcde',
              owner_cpf: '123.456.789-00',
              owner_address: 'edcba',
              owner_telephone: '55 (81) 12345-6789',
              restaurant_name: 'zyxwv',
              restaurant_cnpj: '12.345.678/0001-99',
              restaurant_address: '5678 aaaa',
              restaurant_telephone: '99 99 1111-1111',
            });
            fs.writeFileSync(
              path.resolve(restaurants_path),
              JSON.stringify(checkList)
            );
          }

          response = await request.post('/restaurant/').send({
            email: 'b@b.com',
            password: '$#@!ZZAAzzaa4321',
            owner_name: 'edcba',
            owner_cpf: '987.654.321-00',
            owner_address: 'abcde',
            owner_telephone: '55 (81) 98765-4321',
            restaurant_name: 'zyxwv',
            restaurant_cnpj: '12.345.678/0001-99',
            restaurant_address: 'aaaa 5678',
            restaurant_telephone: '99 99 2222-2222',
          });
        }
      }
    );

    then('o status code retornado deve ser 409', () => {
      expect(response!.status).toBe(409);
    });

    and(
      'a mensagem de erro deve ser "Empresa com mesmo CNPJ já cadastrada"',
      () => {
        expect(response!.text).toBe('Empresa com mesmo CNPJ já cadastrada');
      }
    );
  });

  test('Tentar cadastrar um restaurante com um email já cadastrado', ({
    given,
    when,
    then,
    and,
  }) => {
    given('acesso a rota "/restaurant/"', () => {
      // não é necessário nenhum teste específico
    });

    when(
      'requisção POST para cadastro contém um email igual a um email de um restaurante já cadastrado',
      async () => {
        fs.readFileSync(path.resolve(restaurants_path), 'utf8');
        if (fs.existsSync(path.resolve(restaurants_path))) {
          const emailTestDatabase = fs.readFileSync(
            path.resolve(restaurants_path),
            'utf8'
          );
          if (emailTestDatabase) {
            let checkList = JSON.parse(emailTestDatabase);
            checkList.push({
              email: 'a@a.com',
              password: '!@#$AAZZaazz1234',
              owner_name: 'abcde',
              owner_cpf: '123.456.789-00',
              owner_address: 'edcba',
              owner_telephone: '55 (81) 12345-6789',
              restaurant_name: 'zyxwv',
              restaurant_cnpj: '12.345.678/9123-99',
              restaurant_address: '5678 aaaa',
              restaurant_telephone: '99 99 1111-1111',
            });
            fs.writeFileSync(
              path.resolve(restaurants_path),
              JSON.stringify(checkList)
            );
          }

          response = await request.post('/restaurant/').send({
            email: 'a@a.com',
            password: '!@#$AAZZaazz1234',
            owner_name: 'abcde',
            owner_cpf: '123.456.789-00',
            owner_address: 'edcba',
            owner_telephone: '55 (81) 12345-6789',
            restaurant_name: 'zyxwv',
            restaurant_cnpj: '12.345.678/0001-99',
            restaurant_address: '5678 aaaa',
            restaurant_telephone: '99 99 1111-1111',
          });
        }
      }
    );

    then('o status code retornado deve ser 409', () => {
      expect(response!.status).toBe(409);
    });

    and(
      'a mensagem de erro deve ser "Restaurante de mesmo email já cadastrado"',
      () => {
        expect(response!.text).toBe('Restaurante de mesmo email já cadastrado');
      }
    );
  });

  test('Tentar cadastrar um restaurante com uma senha fraca', ({
    given,
    when,
    then,
    and,
  }) => {
    given('acesso a rota "/restaurant/"', () => {
      // não é necessário nenhum teste específico
    });

    and(
      'a senha pretendida pelo usuário não atende os requisitos de segurança',
      () => {
        // não é necessário nenhum teste específico, será feito no when
      }
    );

    when(
      'requisção POST é efetuada com todos os campos preenchidos, incluindo uma senha fraca',
      async () => {
        response = await request.post('/restaurant/').send({
          email: 'undecillion@example.com',
          password: 'abc',
          owner_name: 'Abcd Efgh',
          owner_cpf: '123.456.789-00',
          owner_address: '1234 Abcd Ab, Abcdefg, AB',
          owner_telephone: '55 (81) 12345-6789',
          restaurant_name: 'Abcde Fghij',
          restaurant_cnpj: '12.345.678/0001-99',
          restaurant_address: '5678 Ijklmn Ij, Ijkmlno, IJ',
          restaurant_telephone: '55 81 1111-1111',
        });
      }
    );

    then('o status code retornado deve ser 400', () => {
      expect(response!.status).toBe(400);
    });

    and('a mensagem de erro deve ser "Senha fraca"', () => {
      expect(response!.text).toBe('Senha fraca');
    });
  });

  test('Cadastro de restaurante bem sucedido', ({ given, when, then, and }) => {
    given('acesso a rota "/restaurant/"', () => {
      // não é necessário nenhum teste específico
    });

    when(
      'requisção POST é efetuada com todos os campos corretamente preenchidos',
      async () => {
        response = await request.post('/restaurant/').send({
          email: 'undecillion@example.com',
          password: '!secureP4$$W0RD1234',
          owner_name: 'Abcd Efgh',
          owner_cpf: '123.456.789-00',
          owner_address: '1234 Abcd Ab, Abcdefg, AB',
          owner_telephone: '55 (81) 12345-6789',
          restaurant_name: 'Abcde Fghij',
          restaurant_cnpj: '12.345.678/0001-99',
          restaurant_address: '5678 Ijklmn Ij, Ijkmlno, IJ',
          restaurant_telephone: '55 81 1111-1111',
        });
      }
    );

    then('o status code retornado deve ser 201', () => {
      expect(response!.status).toBe(201);
    });

    and(
      'a mensagem de sucesso deve ser "Restaurante cadastrado com sucesso!"',
      () => {
        expect(response!.text).toBe('Restaurante cadastrado com sucesso!');
      }
    );
  });

  test('Consulta de restaurantes', ({ given, when, then, and }) => {
    given('acesso a rota "/restaurant/"', () => {
      // não é necessário nenhum teste específico
    });

    when(
      'requisção GET é efetuada com o nome do restaurante que se deseja consultar',
      async () => {
        fs.readFileSync(path.resolve(restaurants_path), 'utf8');
        if (fs.existsSync(path.resolve(restaurants_path))) {
          const insertDummyRestaurants = fs.readFileSync(
            path.resolve(restaurants_path),
            'utf8'
          );
          if (insertDummyRestaurants) {
            let checkList = JSON.parse(insertDummyRestaurants);
            checkList.push({
              email: 'blob@example.com',
              password: '!@#$AAZZaazz1234',
              owner_name: 'abcde',
              owner_cpf: '123.456.789-00',
              owner_address: 'edcba',
              owner_telephone: '55 (81) 12345-6789',
              restaurant_name: 'Pasteis Doces e Cia',
              restaurant_cnpj: '12.345.678/0001-99',
              restaurant_address: '5678 aaaa',
              restaurant_telephone: '99 99 1111-1111',
            });
            checkList.push({
              email: 'blob2@example.com',
              password: '!@#$AAZZaazz1234',
              owner_name: 'abcde',
              owner_cpf: '123.456.789-00',
              owner_address: 'edcba',
              owner_telephone: '55 (81) 12345-6789',
              restaurant_name: 'Pasteis Salgados e Associados',
              restaurant_cnpj: '12.345.678/0001-99',
              restaurant_address: '5678 aaaa',
              restaurant_telephone: '99 99 1111-1111',
            });
            fs.writeFileSync(
              path.resolve(restaurants_path),
              JSON.stringify(checkList)
            );
          }

          response = await request.get('/restaurant/').send({
            restaurant_name: 'Pasteis Doces',
          });
        }
      }
    );
    then('o status code retornado deve ser 200', () => {
      expect(response!.status).toBe(200);
    });

    and('lista de restaurante com nomes compatíveis deve ser retornada', () => {
      let restaurant_list = response!.body;
      expect(restaurant_list[0].restaurant_name).toBe('Pasteis Doces e Cia');
    });
  });
  test('Deletar cadastro de restaurante', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, () => {
      // não é necessário nenhum teste específico
    });

    when('requisção DELETE é efetuada', async () => {
      fs.readFileSync(path.resolve(restaurants_path), 'utf8');
      if (fs.existsSync(path.resolve(restaurants_path))) {
        const emailTestDatabase = fs.readFileSync(
          path.resolve(restaurants_path),
          'utf8'
        );
        if (emailTestDatabase) {
          let checkList = JSON.parse(emailTestDatabase);
          checkList.push({
            id: '123',
            email: 'a@a.com',
            password: '!@#$AAZZaazz1234',
            owner_name: 'abcde',
            owner_cpf: '123.456.789-00',
            owner_address: 'edcba',
            owner_telephone: '55 (81) 12345-6789',
            restaurant_name: 'zyxwv',
            restaurant_cnpj: '12.345.678/9123-99',
            restaurant_address: '5678 aaaa',
            restaurant_telephone: '99 99 1111-1111',
          });
          fs.writeFileSync(
            path.resolve(restaurants_path),
            JSON.stringify(checkList)
          );
        }
      }
      response = await request.delete('/restaurant/123');
    });

    then('o status code retornado deve ser 200', () => {
      expect(response!.status).toBe(200);
    });

    and(
      'a mensagem retornada deve ser "Restaurante deletado com sucesso!"',
      () => {
        expect(response!.text).toBe('Restaurante deletado com sucesso!');
      }
    );
  });
});
