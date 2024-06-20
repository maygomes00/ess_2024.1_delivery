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
  let rota: string;

  test('Tentar adicionar categoria sem dar nome', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(/^realizar uma requisição POST$/, async () => {
      response = await request.post(rota).send({
        name: "", 
      });
    });
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagem: string) => {
      expect(response!.body.error).toBe(mensagem);
    });
  });

  test('Adicionar categoria nova', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso) => {
      rota = rotaAcesso;
    });
  
    when(
      /^realizar uma requisição POST com o valor "(.*)" no body da requisição$/,
      async (categoria) => {
        response = await request.post(rota).send({
          name: categoria,
        });
      }
    );
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(
      /^o JSON retornado é a categoria criada com parâmetro nome "(.*)"$/,
      (categoria) => {
        expect(response!.body).toMatchObject({
          id: expect.any(String),
          nome: categoria,
          restauranteId: "restaurante-1", 
          temItens: false,
        });
      }
    );
  });

  test('Tentar adicionar categoria que já existe', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(
      /^realizar uma requisição POST com o valor "(.*)" no body da requisição$/,
      async (categoria: string) => {
        response = await request.post(rota).send({
          name: categoria,
        });
      }
    );
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagem: string) => {
      expect(response!.body.error).toBe(mensagem);
    });
  });

//////////////////////////PUT TESTES

  test('Mudar nome de categoria', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(
      /^realizar uma requisição PUT com o valor "(.*)" no body da requisição$/,
      async (novoNome: string) => {
        response = await request.put(rota).send({
          nome: novoNome,
        });
      }
    );
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o JSON retornado é a categoria com nome "(.*)"$/, (nomeCategoria: string) => {
      expect(response!.body).toEqual(
        expect.objectContaining({
          nome: nomeCategoria,
        })
      );
    });
  });

  test('Tentar mudar nome da categoria deixando em branco', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when('realizar uma requisição PUT', async () => {
      response = await request.put(rota).send({
        name: "",
      });
    });
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagemErro: string) => {
      expect(response!.body).toEqual(
        expect.objectContaining({
          error: mensagemErro
        })
      );
    });
  });

  test('Tentar mudar nome da categoria não encontrada', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(
      /^realizar uma requisição PUT com o valor "(.*)" no body da requisição$/,
      async (nomeCategoria: string) => {
        response = await request.put(rota).send({
          nome: nomeCategoria,
        });
      }
    );
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagemErro: string) => {
      expect(response!.body.error).toBe(mensagemErro);
    });
  });

  test('Mudar nome de categoria para nome que já existe', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(
      /^realizar uma requisição PUT com o valor "(.*)" no body da requisição$/,
      async (nomeCategoria: string) => {
        response = await request.put(rota).send({
          nome: nomeCategoria,
        });
      }
    );
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagemErro: string) => {
      expect(response!.body.error).toBe(mensagemErro);
    });
  });

  //////////////////////////GET TESTES

  test('Obter todas as categorias', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(/^realizar uma requisição GET$/, async () => {
      response = await request.get(rota);
    });
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o JSON retornado é uma lista de categorias$/, () => {
      expect(response!.body.categorias).toBeDefined();             // Verifica se existe a propriedade categorias
      expect(Array.isArray(response!.body.categorias)).toBe(true); // Verifica se categorias é um array
      expect(response!.body.categorias.length).toBeGreaterThan(0); // Verifica se o array não está vazio
    });
  
    and(/^a categoria com nome "(.*)" está na lista$/, (nomeCategoria: string) => {
      const categoria = response!.body.categorias.find((category: { nome: string }) => category.nome === nomeCategoria);
      expect(categoria).toBeDefined();
    });
  
    and(/^a categoria com nome "(.*)" está na lista$/, (nomeCategoria: string) => {
      const categoria = response!.body.categorias.find((category: { nome: string }) => category.nome === nomeCategoria);
      expect(categoria).toBeDefined();
    });
  });

  test('Obter categoria pelo Id', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(/^realizar uma requisição GET$/, async () => {
      response = await request.get(rota);
    });
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o JSON retornado é a categoria com parâmetros id "(.*)", nome "(.*)", restauranteId "(.*)" e temItens "(.*)"$/, (id: string, nome: string, restauranteId: string, temItens: string) => {
      expect(response!.body).toEqual({
        id: id,
        nome: nome,
        restauranteId: restauranteId,
        temItens: temItens === 'true'
      });
    });
  });
  
  test('Tentar Obter categoria com Id inexistente', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(/^realizar uma requisição GET$/, async () => {
      response = await request.get(rota);
    });
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagemErro: string) => {
      expect(response!.body.error).toBe(mensagemErro);
    });
  });

//////////////////////////DELET TESTES

  test('Deletar categoria que não existe', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });

    when(/^realizar uma requisição DELETE$/, async () => {
      response = await request.delete(rota);
    });

    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o retorno é a mensagem "(.*)"$/, (mensagemErro: string) => {
      expect(response!.body.error).toBe(mensagemErro);
    });
  });

  test('Deletar categoria sem itens', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(/^realizar uma requisição DELETE$/, async () => {
      response = await request.delete(rota);
    });
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagemSucesso: string) => {
      expect(response!.body.message).toBe(mensagemSucesso);
    });
  });
 
  test('Deletar categoria com itens', ({ given, when, then, and }) => {
    given(/^acesso a rota "(.*)"$/, (rotaAcesso: string) => {
      rota = rotaAcesso;
    });
  
    when(/^realizar uma requisição DELETE$/, async () => {
      response = await request.delete(rota);
    });
  
    then(/^o status da resposta retornada é "(.*)"$/, (statusCode: string) => {
      expect(response!.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o retorno é a mensagem "(.*)"$/, (mensagemErro: string) => {
      expect(response!.body.error).toBe(mensagemErro);
    });
  });
});

