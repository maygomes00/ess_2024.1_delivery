import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import path from 'path';
import { di } from '../../src/di';
import CategoryRepository from '../../src/repositories/category.repository';
import { resetDatabase } from '../../src/helpers/resetDatabase'; 
import { readJsonFile, writeJsonFile, writeItemJsonFile } from '../../src/controllers/category.controller';
import { Item} from '../../src/types/types'; 

const feature = loadFeature('tests/features/category.feature');
const request = supertest(app);
const categoryFilePath = path.resolve(__dirname, '../../src/data/categories/categories.json');
const itemFilePath = path.resolve(__dirname, '../../src/data/itens/itens.json'); 

defineFeature(feature, (test) => {
  let mockCategoryRepository: CategoryRepository;
  let response: supertest.Response | null;

  beforeEach(async () => {
    mockCategoryRepository = di.getRepository<CategoryRepository>(CategoryRepository);
    response = null;
    await resetDatabase(); // Resetando o banco de dados antes de cada teste
  });
  

  let rota: string;
/////////////////////////////// POST TESTS

  test('Tentar adicionar categoria sem dar nome', ({ given, when, then, and }) => {
    given(
      /^acesso a rota "(.*)"$/,
      (rotaAcesso: string) => {
        rota = rotaAcesso;
      }
    );
  
    when(
      /^realizar uma requisição POST$/,
      async () => {
        response = await request.post(rota).send({
          name: "", 
        });
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response!.body.error).toBe(mensagem);
      }
    );
  });

  test('Adicionar categoria nova', ({ given, when, then, and }) => {
    given(/^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (categoriaId, nome) => {
        const categoria = { id: categoriaId, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      });
  
    and(/^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (categoriaId, nome) => {
        const categoria = { id: categoriaId, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      });
  
    when(/^uma requisição POST for enviada para "(.*)" com o parâmetro nome '(.*)'$/,
      async (url, nomeCategoria) => {
        response = await request.post(url).send({ name: nomeCategoria });
      });
  
    then(/^o status da resposta retornada é '(.*)'$/,
      (statusCode) => {
        if (response != null) {
          expect(response.status).toBe(parseInt(statusCode, 10));
        } else {
          fail('response is null');
        }
      });
  
    and(/^categoria com id '(.*)' e nome '(.*)' está no banco de dados$/,
      (categoriaId, nomeCategoria) => {
        const categoria = { id: categoriaId, nome: nomeCategoria, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        const resultado = data.categorias.filter(
          (element) => element.id == categoriaId && element.nome == nomeCategoria
        );
        expect(resultado.length).toBe(1);
        expect(resultado[0]).toEqual(categoria);
      });
  });

  test('Tentar adicionar categoria que já existe', ({ given, when, then, and }) => {
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (categoriaId, nome) => {
        const categoria = { id: categoriaId, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );

    when(
      /^uma requisição POST for enviada para "(.*)" com o parâmetro id '(.*)' e nome '(.*)'$/,
      async (url, categoriaId, nomeCategoria) => {
        response = await request.post(url).send({ id: categoriaId, name: nomeCategoria });
      }
    );

    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );

    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response!.body.error).toBe(mensagem);
      }
    );
  });

/////////////////////////////// PUT TESTS

  test('Mudar nome de categoria', ({ given, when, then, and }) => {
    let categoriaId: string;
  
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        categoriaId = id;
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^uma requisição PUT for enviada para '(.*)' com o parâmetro nome '(.*)'$/,
      async (url, novoNome) => {
        response = await request.put(url).send({ name: novoNome });
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^categoria com id '(.*)' e nome '(.*)' está no banco de dados$/,
      (id, novoNome) => {
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        const categoriaEncontrada = data.categorias.find(cat => cat.id === id && cat.nome === novoNome);
        expect(categoriaEncontrada).toBeTruthy();
      }
    );
  });
  
  test('Tentar mudar nome da categoria deixando em branco', ({ given, when, then, and }) => {
    let categoriaId: string;
  
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        categoriaId = id;
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^realizar uma requisição PUT for enviada para "(.*)"$/,
      async (url, novoNome) => {
        response = await request.put(url).send({ name: novoNome });
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response!.body.error).toBe(mensagem);
      }
    );
  });
  
  test('Tentar mudar nome da categoria não encontrada', ({ given, when, then, and }) => {
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^uma requisição PUT for enviada para "(.*)" com o parâmetro nome '(.*)'$/,
      async (url, novoNome) => {
        response = await request.put(url).send({ name: novoNome });
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response!.body.error).toBe(mensagem);
      }
    );
  });
  
  test('Mudar nome de categoria para nome que já existe', ({ given, when, then, and }) => {
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^uma requisição PUT for enviada para "(.*)" com o parâmetro nome '(.*)'$/,
      async (url, novoNome) => {
        response = await request.put(url).send({ name: novoNome });
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response!.body.error).toBe(mensagem);
      }
    );
  });
  
  /////////////////////////////// GET TESTS

  test('Obter todas as categorias', ({ given, when, then, and }) => {
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    and(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^uma requisição GET for enviada para "(.*)"$/,
      async (url) => {
        response = await request.get(url);
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o JSON retornado é uma lista de categorias$/,
      () => {
        expect(Array.isArray(response!.body)).toBe(true);
      }
    );
  
    and(
      /^a categoria com id '(.*)' e nome "(.*)" está na lista$/,
      (id, nome) => {
        const categoriaEncontrada = response!.body.find((cat: { id: string; nome: string }) => cat.id === id && cat.nome === nome);
        expect(categoriaEncontrada).toBeTruthy();
      }
    );
  
    and(
      /^a categoria com id '(.*)' e nome "(.*)" está na lista$/,
      (id, nome) => {
        const categoriaEncontrada = response!.body.find((cat: { id: string; nome: string }) => cat.id === id && cat.nome === nome);
        expect(categoriaEncontrada).toBeTruthy();
      }
    );
  });

  test('Obter categoria pelo Id', ({ given, when, then, and }) => {
    let categoriaId: string;
  
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        categoriaId = id;
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^uma requisição GET for enviada para "(.*)"$/,
      async (url) => {
        response = await request.get(`${url}/${categoriaId}`);
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o JSON retornado é a categoria com parâmetro de id "(.*)"$/,
      (id) => {
        expect(response!.body.id).toBe(id);
      }
    );
  });

  test('Tentar Obter categoria com Id inexistente', ({ given, when, then, and }) => {
    let categoriaId: string;
  
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        categoriaId = id;
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^uma requisição GET for enviada para "(.*)"$/,
      async (url) => {
        response = await request.get(`${url}/10`);
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response!.body.error).toBe(mensagem);
      }
    );
  });

/////////////////////////////// DELETE TESTS
 
  test('Deletar categoria que não existe', ({ given, when, then, and }) => {
    let categoriaId: string;
  
    given(
      /^banco de dados tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        categoriaId = id;
        const categoria = { id: id, nome: nome, restauranteId: 'restaurante-1', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );
  
    when(
      /^uma requisição DELETE for enviada para "(.*)"$/,
      async (url) => {
        response = await request.delete(`${url}/10`);
      }
    );
  
    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response!.status).toBe(parseInt(statusCode, 10));
      }
    );
  
    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response!.body.error).toBe(mensagem);
      }
    );
  });
  
  test('Deletar categoria sem itens', ({ given, when, then, and }) => {
    let response: supertest.Response;

    given(
      /^banco de dados de categoria tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        const categoria = { id: id, nome: nome, restauranteId: '123', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );

    and(
      /^banco de dados de itens tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, active, restauranteId, nomeItem, precoItem, descricaoItem, categoriasItem, imagemItem) => {
        const item: Item = {
          id: itemId,
          active: active,
          restauranteId: restauranteId,
          nome: nomeItem,
          preco: precoItem,
          descricao: descricaoItem,
          categorias: categoriasItem.split(','),
          imagem: imagemItem,
        };
        const data: { itens: Item[] } = readJsonFile(itemFilePath);
        data.itens.push(item);
        writeItemJsonFile(itemFilePath, data);
      }
    );

    when(
      /^uma requisição DELETE for enviada para "(.*)"$/,
      async (url) => {
        response = await request.delete(url);
      }
    );

    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
    );

    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response.body.message).toBe(mensagem);
      }
    );
  });

  test('Deletar categoria com itens', ({ given, when, then, and }) => {
    let response: supertest.Response;

    given(
      /^banco de dados de categoria tem categoria com id '(.*)' e nome '(.*)'$/,
      async (id, nome) => {
        const categoria = { id: id, nome: nome, restauranteId: '123', temItens: false };
        const data: { categorias: { id: string; nome: string; restauranteId: string; temItens: boolean; }[] } = readJsonFile(categoryFilePath);
        data.categorias.push(categoria);
        writeJsonFile(categoryFilePath, data);
      }
    );

    and(
      /^banco de dados de itens tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, active, restauranteId, nomeItem, precoItem, descricaoItem, categoriasItem, imagemItem) => {
        const item: Item = {
          id: itemId,
          active: active,
          restauranteId: restauranteId,
          nome: nomeItem,
          preco: precoItem,
          descricao: descricaoItem,
          categorias: categoriasItem.split(','),
          imagem: imagemItem,
        };
        const data: { itens: Item[] } = readJsonFile(itemFilePath);
        data.itens.push(item);
        writeItemJsonFile(itemFilePath, data);
      }
    );

    when(
      /^uma requisição DELETE for enviada para "(.*)"$/,
      async (url) => {
        response = await request.delete(url);
      }
    );

    then(
      /^o status da resposta retornada é "(.*)"$/,
      (statusCode: string) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
    );

    and(
      /^o retorno é a mensagem "(.*)"$/,
      (mensagem: string) => {
        expect(response.body.error).toBe(mensagem);
      }
    );
  });
});