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
    given(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^o Json retornado contem os parametros id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      if (response != null){
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        expect(response.body).toEqual(item)
      }
      else {
        fail('response is null')
      }
    });
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter item que não existe por id', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id '(\d+)'$/, (itemId) => {
        var data = item_controller.get_itens_database()
        const no_item_data = data.filter((element: {id: any}) => element.id != itemId)
        item_controller.set_itens_database(no_item_data)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é '(\d+)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
      if (response != null){
        expect(response.body.Erro).toEqual(mensagem)
      }
      else {
        fail('response is null')
      }
    });
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Adicionar item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    and(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    when(/^uma requisição POST for enviada para "(.*)" com os parametros id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/, 
      async (url, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        response = await request.post(url).send(item)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        const data = item_controller.get_itens_database()
        const resultado = data.filter((element: {id: any, restaurant_id: any, name: any, price: any, description: any, categories:any, image64: any}) =>
          element.id == itemId && element.restaurant_id == restId && element.name == nome && element.price == preco &&
          element.description == descricao && element.categories == categorias && element.image64 == imagem)
        expect(resultado.length).toBe(1)
        expect(resultado[0]).toEqual(item);
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar adicionar item sem preencher todas as informações', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    and(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    when(/^uma requisição POST for enviada para "(.*)" com os parametros id de restaurante, nome, preco, descricao, categorias e imagem todos vazios$/, 
      async (url) => {
        const item = {restaurant_id: '', name: '', price: '', description: '', categories: '', image64: ''} 
        response = await request.post(url).send(item)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^banco de dados tem '(.*)' itens$/, (n) => {
        expect(item_controller.get_itens_database().length).toBe(parseInt(n, 10))
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
      if (response != null){
        expect(response.body.Erro).toEqual(mensagem)
      }
      else {
        fail('response is null')
      }
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Remover item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    and(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    and(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
      response = await request.delete(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        const data = item_controller.get_itens_database()
        const resultado = data.filter((element: {id: any, restaurant_id: any, name: any, price: any, description: any, categories:any, image64: any}) =>
          element.id == itemId && element.restaurant_id == restId && element.name == nome && element.price == preco &&
          element.description == descricao && element.categories == categorias && element.image64 == imagem)
        expect(resultado.length).toBe(1)
        expect(resultado[0]).toEqual(item);
    })

    and(/^item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        const data = item_controller.get_itens_database()
        const resultado = data.filter((element: {id: any, restaurant_id: any, name: any, price: any, description: any, categories:any, image64: any}) =>
          element.id == itemId && element.restaurant_id == restId && element.name == nome && element.price == preco &&
          element.description == descricao && element.categories == categorias && element.image64 == imagem)
        expect(resultado.length).toBe(1)
        expect(resultado[0]).toEqual(item);
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar remover item que não existe', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id '(\d+)'$/, (itemId) => {
      var data = item_controller.get_itens_database()
      const no_item_data = data.filter((element: {id: any}) => element.id != itemId)
      item_controller.set_itens_database(no_item_data)
    })

    when(/^uma requisição DELETE for enviada para "(.*)"$/, 
      async (url) => {
        response = await request.delete(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
      if (response != null){
        expect(response.body.Erro).toEqual(mensagem)
      }
      else {
        fail('response is null')
      }
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Editar informações de um item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/, 
      async (url, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        response = await request.put(url).send(item)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        const data = item_controller.get_itens_database()
        const resultado = data.filter((element: {id: any, restaurant_id: any, name: any, price: any, description: any, categories:any, image64: any}) =>
          element.id == itemId && element.restaurant_id == restId && element.name == nome && element.price == preco &&
          element.description == descricao && element.categories == categorias && element.image64 == imagem)
        expect(resultado.length).toBe(1)
        expect(resultado[0]).toEqual(item);
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar editar informações de um item que não existe', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id '(\d+)'$/, (itemId) => {
      var data = item_controller.get_itens_database()
      const no_item_data = data.filter((element: {id: any}) => element.id != itemId)
      item_controller.set_itens_database(no_item_data)
    })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/, 
      async (url, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        response = await request.put(url).send(item)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
      if (response != null){
        expect(response.body.Erro).toEqual(mensagem)
      }
      else {
        fail('response is null')
      }
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar editar informações de um item sem preencher todas as informações', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
      const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
      item_controller.push_item_data(item)
    })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante, nome, preco, descricao, categorias e imagem todos vazios$/, 
      async (url) => {
        const item = {restaurant_id: '', name: '', price: '', description: '', categories: '', image64: ''} 
        response = await request.put(url).send(item)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        const data = item_controller.get_itens_database()
        const resultado = data.filter((element: {id: any, restaurant_id: any, name: any, price: any, description: any, categories:any, image64: any}) =>
          element.id == itemId && element.restaurant_id == restId && element.name == nome && element.price == preco &&
          element.description == descricao && element.categories == categorias && element.image64 == imagem)
        expect(resultado.length).toBe(1)
        expect(resultado[0]).toEqual(item);
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Obter todos os itens de um restaurante', ({ given, and, when, then }) => {
    given(/^restaurante de id '(.*)' existe no banco de dados$/,
      async (restId) => {
      const item = {id: restId} 
      item_controller.push_restaurant_data(item)
    })

    and(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        item_controller.push_item_data(item)
    })

    and(/^banco de dados tem item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
        item_controller.push_item_data(item)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    });

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^retorna lista que contem item com id '(\d+)' e id de restaurante '(\d+)'$/, (itemId, restId) => {
      if (response != null){
        const response_list = response.body
        const list_with_item = response_list.filter((element: {id: any, restaurant_id: any}) =>
          element.id == itemId && element.restaurant_id == restId)
        expect(list_with_item.length).toBe(1)
      }
      else {
        fail('response is null')
      }
    })

    and(/^retorna lista que contem item com id '(\d+)' e id de restaurante '(\d+)'$/, (itemId, restId) => {
      if (response != null){
        const response_list = response.body
        const list_with_item = response_list.filter((element: {id: any, restaurant_id: any}) =>
          element.id == itemId && element.restaurant_id == restId)
        expect(list_with_item.length).toBe(1)
      }
      else {
        fail('response is null')
      }
    })
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter os itens de um restaurante que não tem itens', ({ given, when, then, and }) => {
    given(/^restaurante de id '(.*)' existe no banco de dados$/,
      async (restId) => {
      const item = {id: restId} 
      item_controller.push_restaurant_data(item)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^retorna lista vazia$/,
      () => {
      if (response != null){
        expect(response.body).toEqual([])
      }
      else {
        fail('response is null')
      }
    });
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter os itens de um restaurante que não existe', ({ given, when, then, and }) => {
    given(/^banco de dados não tem restaurante com id '(.*)'$/, (restId) => {
      var data = item_controller.get_restaurant_database()
      const no_restaurant_data = data.filter((element: {id: any}) => element.id != restId)
      item_controller.set_restaurant_database(no_restaurant_data)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      if (response != null){
        expect(response.status).toBe(parseInt(statusCode, 10));
      }
      else {
        fail('response is null')
      }
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
      if (response != null){
        expect(response.body.Erro).toEqual(mensagem)
      }
      else {
        fail('response is null')
      }
    })
  })
})
})