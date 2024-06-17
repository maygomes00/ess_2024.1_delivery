import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import item_controller from '../../src/routes/item.routes'


const feature = loadFeature('./tests/features/itens.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // Mock do repositório
  let response: supertest.Response | null;

  item_controller.set_using_path(false)

  beforeEach(() => {
    response = null;
    item_controller.reset_data()
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Obter item por id', ({ given, when, then, and }) => {
    given(/^item com id “(.*)”, id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)” existe no banco de dados de itens$/,
      async (itemId, restId, nome, preco, descricao, categorias) => {
      //controler.push_item_data({id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias});
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias} 
      item_controller.push_item_data(item)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^o Json retornado contem os parametros id “(.*)”, id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)”$/,
      (itemId, restId, nome, preco, descricao, categorias) => {
      if (response != null){
        expect(response.body).toEqual({
          id: itemId,
          restaurant_id: restId,
          name: nome,
          price: preco,
          description: descricao,
          categories: categorias})
      }
      else {
        fail("response is null")
      }
    });
  })
/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter item que não existe por id', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id “(\d+)”$/, (itemId) => {
        var data = controler.get_itens_database()
        const no_item_data = data.filter((element: {id: any}) => element.id != itemId)
        controler.set_itens_database(no_item_data)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é “(\d+)"$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^retorna mensagem de erro “(.*)”$/,
      (mensagem) => {
      if (response != null){
        expect(response.body.Erro).toEqual(mensagem)
      }
      else {
        fail("response is null")
      }
    });
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Adicionar item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    and(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    when(/^uma requisição POST for enviada para "(.*)" com os parametros id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      async (url, restId, nome, preco, descricao, categorias) => {
      // Fazer logica depois.
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar adicionar item sem preencher todas as informações', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    and(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    when(/^uma requisição POST for enviada para "(.*)" com os parametros id de restaurante, nome, preco, descricao e categorias todos vazios"$/, 
      async (url) => {
      // Fazer logica depois.
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^banco de dados tem "(.*)" itens$/, (n) => {
        // Fazer logica depois.
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Remover item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    and(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    and(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    when(/^uma requisição DELETE for enviada para "(.*)""$/, async (url) => {
      // Fazer logica depois.
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    and(/^banco de dados tem item com id "(.*)", id de restaurante "(.*)", nome "(.*)", preco "(.*)", descricao "(.*)" e categorias "(.*)"$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar remover item que não existe', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id "(.*)"$/, 
      (itemId) => {
        // Fazer logica depois.
    })

    when(/^uma requisição DELETE for enviada para "(.*)"$/, 
      async (url) => {
      // Fazer logica depois.
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^retorna mensagem de erro "(.*)"$/, (n) => {
        // Fazer logica depois.
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Editar informações de um item', ({ given, when, then, and }) => {
    given(/^item com id “(.*)”, id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)” existe no banco de dados de itens$/, 
      (itemId, restId, nome, preco, descricao, categorias) => {
        // Fazer logica depois.
    })

    when(/^uma requisição PUT for enviada para "(.*) com os parametros id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)"$/, 
      (url, itemId, restId, nome, preco, descricao, categorias) => {
      // Fazer logica depois.
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^item com id "(.*)" tem os parametros id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)”$/, (n) => {
        // Fazer logica depois.
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar editar informações de um item que não existe', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id "(.*)"$/, 
      (itemId) => {
        // Fazer logica depois.
    })

    when(/^uma requisição PUT for enviada para "(.*) com os parametros id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)"$/, 
      (url, itemId, restId, nome, preco, descricao, categorias) => {
      // Fazer logica depois.
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^retorna mensagem de erro "(.*)"$/, (n) => {
        // Fazer logica depois.
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar editar informações de um item sem preencher todas as informações', ({ given, when, then, and }) => {
    given(/^item com id “(.*)”, id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)” existe no banco de dados de itens$/, 
        (itemId, restId, nome, preco, descricao, categorias) => {
          // Fazer logica depois.
      })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante, nome, preco, descricao e categorias todos vazios"$/, 
      async (url) => {
      // Fazer logica depois.
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^item com id "(.*)" tem os parametros id de restaurante “(.*)”, nome “(.*)”, preco “(.*)”, descricao “(.*)” e categorias “(.*)”$/,
      (itemId, restId, nome, preco, descricao, categorias) => {
      // Fazer logica depois.
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test("Obter todos os itens de um restaurante", ({ given, and, when, then }) => {
    given(/^item com id “(.*)” e id de restaurante “(.*)” existe no banco de dados$/, (itemId, restId) => {
      //controler.push_restaurant_data({id: restId});
      controler.push_item_data({id: itemId, restaurant_id: restId, name: "a", price: "1.00", description: "a", categories: "aa"});
    });

    and(/^item com id “(.*)” e id de restaurante “(.*)” existe no banco de dados$/, (itemId, restId) => {
      controler.push_item_data({id: itemId, restaurant_id: restId, name: "a", price: "1.00", description: "a", categories: "aa"});
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.post(url).send({restaurant_id: "123"})
      console.log(response.body)
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
        expect(response.body).toEqual(controler.get_itens_database()[0])
      }
      else {
        fail("response is null")
      }
    });

    and(/^retorna lista que contem item com id “(\d+)” e id de restaurante “(\d+)”$/, (itemId, restId) => {
      if (response != null){
        expect(response.body.data[1]).toEqual(controler.get_itens_database()[1])
      }
      else {
        fail("response is null")
      }
    });
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter os itens de um restaurante que não tem itens', ({ given, when, then, and }) => {
    given(/^Banco de dados não tem item com id de restaurante “(.*)”$/,
      (restId) => {
        // Fazer logica depois.
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^retorna lista vazia”$/,
      () => {
      if (response != null){
        expect(response.body).toEqual([])
      }
      else {
        fail("response is null")
      }
    });
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter os itens de um restaurante que não existe', ({ given, when, then, and }) => {
    given(/^restaurante "(.*)" não existe no banco de dados$/,
      (restId) => {
        // Fazer logica depois.
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é “(.*)”$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail("response is null")
      }
    })

    and(/^retorna mensagem de erro “(.*)”$/,
      (mensagem) => {
      if (response != null){
        expect(response).toEqual(mensagem)
      }
      else {
        fail("response is null")
      }
    });
  })
})*/
})
  
