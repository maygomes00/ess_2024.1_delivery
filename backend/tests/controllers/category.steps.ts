import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import CategoryRepository from '../../src/repositories/category.repository';

const feature = loadFeature('tests/features/category.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockCategoryRepository: CategoryRepository;
  let response: supertest.Response | null;

  beforeEach(() => {
    mockCategoryRepository = di.getRepository<CategoryRepository>(CategoryRepository);
    response = null;
  });

 /////////////////////////POST TESTES

  test('Tentar adicionar categoria sem dar nome', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {
    });

    when('realizar uma requisição “POST”', async () => {
      response = await request.post('/restaurant/menu/category').send({
        name: "", 
      });
    });

    then('o status da resposta retornada é “400”', () => {
      expect(response!.status).toBe(400);
    });

    and('o retorno é a mensagem “É obrigatório um nome para a categoria!”', () => {
      expect(response!.body.error).toBe("É obrigatório um nome para a categoria!");
    });
  });

  test('Adicionar categoria nova', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {});
  
    when('realizar uma requisição “POST” com o valor “Doce” no body da requisição', async () => {
      response = await request.post('/restaurant/menu/category').send({
        name: "Doce",
      });
    });
  
    then('o status da resposta retornada é “201 Created”', () => {
      expect(response!.status).toBe(201);
    });
  
    and('o JSON retornado é a categoria criada com parâmetro nome “Doce”', () => {
      expect(response!.body).toMatchObject({
        id: expect.any(String),
        nome: "Doce",
        restauranteId: "restaurante-1", 
        temItens: false,
      });
    });
  })

 test('Tentar adicionar categoria que já existe', ({ given, when, then, and }) => {
   given('acesso a rota “/restaurant/menu/category”', () => {});

   when('realizar uma requisição “POST” com o valor “Bebidas” no body da requisição', async () => {
     response = await request.post('/restaurant/menu/category').send({
       name: "Bebidas",
     });
   });

   then('o status da resposta retornada é “400 Bad Request”', () => {
     expect(response!.status).toBe(400);
   });

   and('o retorno é a mensagem “já existe uma categoria com esse nome!"', () => {
     expect(response!.body.error).toBe("Já existe uma categoria com esse nome!");
   });
 });

//////////////////////////PUT TESTES

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

  //////////////////////////GET TESTES

  test('Obter todas as categorias', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category”', () => {
    });

    when('realizar uma requisição “GET”', async () => {
      response = await request.get('/restaurant/menu/category');
    });

    then('o status da resposta retornada é “200 Ok”', () => {
      expect(response!.status).toBe(200);
    });

    and('o Json retornado é uma lista de categorias', () => {
      expect(response!.body.categorias).toBeDefined();             // Verifica se existe a propriedade categorias
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

//////////////////////////DELET TESTES

  test('Deletar categoria que não existe', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/9”', () => {
    });

    when('realizar uma requisição “DELETE”', async () => {
      response = await request.delete('/restaurant/menu/category/9');
    });

    then('o status da resposta retornada é “404”', () => {
      expect(response!.status).toBe(404);
    });

    and('o retorno é a mensagem “Categoria não encontrada!”', () => {
      expect(response!.body.error).toBe("Categoria não encontrada!");
    });
  });

  test('Deletar categoria sem itens', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/1”', () => {
    });

    when('realizar uma requisição “DELETE”', async () => {
      response = await request.delete('/restaurant/menu/category/1');
    });

    then('o status da resposta retornada é “200”', () => {
      expect(response!.status).toBe(200);
    });

    and('o retorno é a mensagem “Categoria deletada com sucesso!”', () => {
      expect(response!.body.message).toBe("Categoria deletada com sucesso!");
    });
  });

  test('Deletar categoria com itens', ({ given, when, then, and }) => {
    given('acesso a rota “/restaurant/menu/category/2”', () => {
    });

    when('realizar uma requisição “DELETE”', async () => {
      response = await request.delete('/restaurant/menu/category/2');
    });

    then('o status da resposta retornada é “400”', () => {
      expect(response!.status).toBe(400);
    });

    and('o retorno é a mensagem “Categoria com itens! Não pode ser deletada!”', () => {
      expect(response!.body.error).toBe("Categoria com itens! Não pode ser deletada!");
    });
  });
});

