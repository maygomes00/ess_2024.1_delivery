import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import item_controller from '../../src/routes/item.routes'
import { URLType } from 'superagent/types';

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
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await requisicao_get(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^o Json retornado contem o item com id '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      (itemId, restId, nome, preco, descricao, categorias, imagem) => {
        json_retornado_contem_item(response, itemId, restId, nome, preco, descricao, categorias, imagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter item que não existe por id', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id '(\d+)'$/, (itemId) => {
      garante_banco_de_dados_nao_tem_item(itemId)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await requisicao_get(url)
    })

    then(/^o status da resposta retornada é '(\d+)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Obter item que não é mais ativo por id', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await requisicao_get(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })
  })


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Adicionar item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    and(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem (.*)$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição POST for enviada para "(.*)" com os parametros id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/, 
      async (url, restId, nome, preco, descricao, categorias, imagem) => {
        response = await requisicao_post(url, restId, nome, preco, descricao, categorias, imagem)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^banco de dados tem '(.*)' itens$/, (n) => {
      numero_itens_banco_de_dados(n)
    })

    and(/^item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        item_esta_no_banco_de_dados(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar adicionar item sem preencher todas as informações', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    and(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem (.*)$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição POST for enviada para "(.*)" com os parametros id de restaurante, nome, preco, descricao, categorias e imagem todos vazios$/, 
      async (url) => {
        response = await requisicao_post(url, '', '', '', '', '', '')
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^banco de dados tem '(.*)' itens$/, (n) => {
      numero_itens_banco_de_dados(n)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Remover item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
      response = await requisicao_delete(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        item_esta_no_banco_de_dados(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar remover item que não existe', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id '(\d+)'$/, (itemId) => {
      garante_banco_de_dados_nao_tem_item(itemId)
    })

    when(/^uma requisição DELETE for enviada para "(.*)"$/, 
      async (url) => {
        response = await requisicao_delete(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Remover item que não é mais ativo', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição DELETE for enviada para "(.*)"$/, 
      async (url) => {
        response = await requisicao_delete(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Editar informações de um item', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/, 
      async (url, restId, nome, preco, descricao, categorias, imagem) => {
        response = await requisicao_put(url, restId, nome, preco, descricao, categorias, imagem)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        item_esta_no_banco_de_dados(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar editar informações de um item que não existe', ({ given, when, then, and }) => {
    given(/^banco de dados não tem item com id '(\d+)'$/, (itemId) => {
      garante_banco_de_dados_nao_tem_item(itemId)
    })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/, 
      async (url, restId, nome, preco, descricao, categorias, imagem) => {
        response = await requisicao_put(url, restId, nome, preco, descricao, categorias, imagem)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar editar informações de um item sem preencher todas as informações', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante, nome, preco, descricao, categorias e imagem todos vazios$/, 
      async (url) => {
        response = await requisicao_put(url, '', '', '', '', '', '')
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })

    and(/^item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)' está no banco de dados$/, 
      (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        item_esta_no_banco_de_dados(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Editar informações de um item que não é mais ativo', ({ given, when, then, and }) => {
    given(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição PUT for enviada para "(.*)" com os parametros id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem '(.*)'$/, 
      async (url, restId, nome, preco, descricao, categorias, imagem) => {
        response = await requisicao_put(url, restId, nome, preco, descricao, categorias, imagem)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna mensagem de erro '(.*)'$/,
      (mensagem) => {
        retorna_mensagem_erro(response, mensagem)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Obter todos os itens de um restaurante', ({ given, and, when, then }) => {
    given(/^restaurante de id '(.*)' existe no banco de dados$/,
      async (restId) => {
        garante_banco_de_dados_tem_retaurante(restId)
    })

    and(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem (.*)$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    and(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem (.*)$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    and(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem (.*)$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await requisicao_get(url)
    });

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna lista que contem item com id '(\d+)' e id de restaurante '(\d+)'$/, (itemId, restId) => {
      retorna_lista_que_contem_item(response, itemId, restId)
    })

    and(/^retorna lista que contem item com id '(\d+)' e id de restaurante '(\d+)'$/, (itemId, restId) => {
      retorna_lista_que_contem_item(response, itemId, restId)
    })

    and(/^retorna lista que não contem item com id '(\d+)' e id de restaurante '(\d+)'$/, (itemId, restId) => {
      item_nao_ta_na_lista(response, itemId, restId)
    })
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter os itens de um restaurante que não tem itens', ({ given, when, then, and }) => {
    given(/^restaurante de id '(.*)' existe no banco de dados$/,
      async (restId) => {
        garante_banco_de_dados_tem_retaurante(restId)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await requisicao_get(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna lista vazia$/,
      () => {
      retorna_lista_vazia(response)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Tentar obter os itens de um restaurante que só tem item que não é mais ativo', ({ given, when, then, and }) => {
    given(/^restaurante de id '(.*)' existe no banco de dados$/,
      async (restId) => {
        garante_banco_de_dados_tem_retaurante(restId)
    })

    and(/^banco de dados tem item com id '(.*)', active '(.*)', id de restaurante '(.*)', nome '(.*)', preco '(.*)', descricao '(.*)', categorias '(.*)' e imagem (.*)$/,
      async (itemId, ativo, restId, nome, preco, descricao, categorias, imagem) => {
        garante_banco_de_dados_tem_item(itemId, ativo, restId, nome, preco, descricao, categorias, imagem)
    })

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await requisicao_get(url)
    })

    then(/^o status da resposta retornada é '(.*)'$/, (statusCode) => {
      verifica_estado_esperado(response, statusCode)
    })

    and(/^retorna lista vazia$/,
      () => {
      retorna_lista_vazia(response)
    })
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})



// Funções das ações dos testes:
// - Givens:
function garante_banco_de_dados_tem_item(itemId: any, ativo: any, restId: any, nome: any, preco: any, descricao: any, categorias: any, imagem: any) {
  const item = {id: itemId, active: ativo, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem}
  item_controller.push_item_data(item)
}

function garante_banco_de_dados_nao_tem_item(itemId: any) {
  var data = item_controller.get_itens_database()
  const no_item_data = data.filter((element: {id: any}) => element.id != itemId)
  item_controller.set_itens_database(no_item_data)
}

function garante_banco_de_dados_tem_retaurante(restId: any) {
  const item = {id: restId}
  item_controller.push_restaurant_data(item)
}

// Whens:
function requisicao_get(url: any) {
  return request.get(url)
}

function requisicao_post(url: any, restId: any, nome: any, preco: any, descricao: any, categorias: any, imagem: any) {
  const item = {restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
  return request.post(url).send(item)
}

function requisicao_delete(url: any) {
  return request.delete(url)
}

function requisicao_put(url: any, restId: any, nome: any, preco: any, descricao: any, categorias: any, imagem: any) {
  const item = {restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
  return request.put(url).send(item)
}

// Thens
function verifica_estado_esperado(response: any, statusCode: any) {
  if (response != null){
    expect(response.status).toBe(parseInt(statusCode, 10));
  }
  else {
    fail('response is null')
  }
}

function json_retornado_contem_item(response: any, itemId: any, restId: any, nome: any, preco: any, descricao: any, categorias: any, imagem: any) {
  if (response != null){
    const item = {id: itemId, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem} 
    expect(response.body).toEqual(item)
  }
  else {
    fail('response is null')
  }
}

function retorna_mensagem_erro(response: any, mensagem: any){
  if (response != null){
    expect(response.body.Erro).toEqual(mensagem)
  }
  else {
    fail('response is null')
  }
}

function item_esta_no_banco_de_dados(itemId: any, ativo: any, restId: any, nome: any, preco: any, descricao: any, categorias: any, imagem: any) {
  const item = {id: itemId, active: ativo, restaurant_id: restId, name: nome, price: preco, description: descricao, categories: categorias, image64: imagem}
  const data = item_controller.get_itens_database()
  const resultado = data.filter((element: {id: any, active: any, restaurant_id: any, name: any, price: any, description: any, categories:any, image64: any}) =>
    element.id == itemId && element.active == ativo && element.restaurant_id == restId && element.name == nome && element.price == preco &&
    element.description == descricao && element.categories == categorias && element.image64 == imagem)
  expect(resultado.length).toBe(1)
  expect(resultado[0]).toEqual(item);
}

function numero_itens_banco_de_dados(numero: any) {
  expect(item_controller.get_itens_database().length).toBe(parseInt(numero, 10))
}

function retorna_lista_que_contem_item(response: any, itemId: any, restId: any) {
  if (response != null){
    const response_list = response.body
    const list_with_item = response_list.filter((element: {id: any, restaurant_id: any}) =>
      element.id == itemId && element.restaurant_id == restId)
    expect(list_with_item.length).toBe(1)
  }
  else {
    fail('response is null')
  }
}

function item_nao_ta_na_lista(response: any, itemId: any, restId: any) {
  if (response != null){
    const response_list = response.body
    const list_with_item = response_list.filter((element: {id: any, restaurant_id: any}) =>
      element.id == itemId && element.restaurant_id == restId)
    expect(list_with_item.length).toBe(0)
  }
  else {
    fail('response is null')
  }
}

function retorna_lista_vazia(response: any) {
  if (response != null){
    expect(response.body).toEqual([])
  }
  else {
    fail('response is null')
  }
}