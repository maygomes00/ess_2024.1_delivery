import path from 'path'
import fs from 'fs'
import { randomInt } from 'crypto'
import { Stream } from 'stream'
import { start } from 'repl'

const itens_json_path = './src/data/itens/itens.json'
//const restaurant_json_path = './src/data/restaurant/restaurant.json'
const store_path = "./src/data/itens/images"
const max_id = 281474976710655



export const getItemById = (req : any, res : any) => {
    try {
        // Carrega o banco de dados de itens:
        const parser = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))
        
        const requested_id = req.params.itemId

        // Verifica se tem um item com o id especificado:
        if (!(id_exists(parser, requested_id))) {
            console.log(`item with id ${requested_id} not found`)
            res.status(200).json({
                Response: `There is no item with id ${requested_id}`
            })
            return
        }

        // Verifica se tem mais de um item com o mesmo id (ERRO):
        if (is_id_duplicated(parser, requested_id)) {
            console.error(`Error: there is more than one item with id ${requested_id}`)
            res.status(500).json({
                error: "Internal Server Error"
            })
            return
        }
        
        // Filtra dos dados pegando apenas aquele com o id igual ao especificado:
        const database_data = parser.filter((element: { id: any }) => element.id == requested_id)


        // Carrega a imagem codificada em base64:
        const image_path = database_data[0].image_path
        const image_data = fs.readFileSync(image_path, { encoding: 'base64' })

        // Cria o conjunto de dados que será enviado, com os dados do item e a imagem codificada:
        const item_data = {
            id: database_data[0].id,
            restaurant_id: database_data[0].restaurant_id,
            name: database_data[0].name,
            price: database_data[0].price,
            description: database_data[0].description,
            categories: database_data[0].categories,
            image_64: image_data
        }

        // Manda os dados como resposta:
        res.status(200).json(item_data)
        
    } catch(error : any) {
        console.log("Erro in getItemById:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}



export const addItem = (req : any, res : any) => {
    try {
        // Carrega o banco de dados de itens:
        var data = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))
        
        // Define um id aleatorio para o item:
        var new_id = randomInt(0, max_id)
        while (data.filter((element: { id: any }) => element.id == new_id).length > 0) {
            new_id = randomInt(0, max_id)
        }
        
        // Verifica se dados do item recebidos estão corretos:
        const errors_found = verify_item_data(req)
        if (errors_found.length> 0) {
            if (req.files[0]){
                remove_image(req.files[0].path)
            }
            console.error("Error in recived data: " + errors_found.join(", "))
            res.status(500).json({
                error: "Error: " + errors_found.join(", ")
            })
            return
        }

        // Renomear imagem com id do item:
        const old_image_path = req.files[0].path
        const image_extension = req.files[0].mimetype.split("/")[1]
        const new_image_path = `${store_path}/${req.body.restaurant_id}_${new_id}.${image_extension}`
        fs.rename(old_image_path, new_image_path, (err) => {
            if (err) {
                console.error(`Error during image file rename: ${old_image_path} to ${new_image_path}`, err)
                res.status(500).json({
                    error: "Internal Server Error"
                })
                return
            }
        })

        // Adiciona as informações do item a lista de dados:
        data.push({
            id: JSON.stringify(new_id),
            restaurant_id: req.body.restaurant_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            categories: req.body.categories,
            image_path: new_image_path
        })
        
        // Guarda dos dados no banco de dados de itens:
        fs.writeFileSync(path.resolve(itens_json_path), JSON.stringify(data, null, 2))

        res.status(201).json({
            Response: "Item data was saved successfully"
        })

    } catch(error : any) {
        console.log("Erro in addItem:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}



export const removeItem = (req : any, res : any) => {
    try {
        // Carrega o banco de dados de itens:
        var data = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))
        
        const requested_id = req.params.itemId

        // Verifica se tem um item com o id especificado:
        if (!(id_exists(data, requested_id))) {
            console.log(`item with id ${requested_id} not found`)
            res.status(200).json({
                Response: `There is no item with id ${requested_id}`
            })
            return
        }

        // Verifica se tem mais de um item com o mesmo id (ERRO):
        if (is_id_duplicated(data, requested_id)) {
            console.error(`Error: there is more than one item with id ${requested_id}`)
            res.status(500).json({
                error: "Internal Server Error"
            })
            return
        }

        // Remove imagem do item:
        const item = data.filter((element: { id: any }) => element.id == requested_id)[0]
        remove_image(item.image_path)

        // Elimina item com id especificado:
        data = data.filter((element: { id: any }) => element.id != requested_id)

        // Guarda dados apos remocao do item:
        fs.writeFileSync(path.resolve(itens_json_path), JSON.stringify(data, null, 2))

        res.status(200).json({
            Response: "Item data was removed successfully"
        })

    } catch(error : any) {
        console.log("Erro in removeItem:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}



export const updateItem = (req : any, res : any) => {
    try {
        // Carrega o banco de dados de itens:
        var data = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))

        const requested_id = req.params.itemId

        // Verifica se tem um item com o id especificado:
        if (!(id_exists(data, requested_id))) {
            if (req.files[0]){
                remove_image(req.files[0].path)
            }
            console.log(`item with id ${requested_id} not found`)
            res.status(200).json({
                Response: `There is no item with id ${requested_id}`
            })
            return
        }

        // Verifica se tem mais de um item com o mesmo id (ERRO):
        if (is_id_duplicated(data, requested_id)) {
            if (req.files[0]){
                remove_image(req.files[0].path)
            }
            console.error(`Error: there is more than one item with id ${requested_id}`)
            res.status(500).json({
                error: "Internal Server Error"
            })
            return
        }

        // Verifica se dados do item recebidos estão corretos:
        const errors_found = verify_item_data(req)
        if (errors_found.length> 0) {
            if (req.files[0]){
                remove_image(req.files[0].path)
            }
            console.error("Error in recived data: " + errors_found.join(", "))
            res.status(500).json({
                error: "Error: " + errors_found.join(", ")
            })
            return
        }

        // guarda indice do item que vai ser atualizado:
        const index = data.findIndex((element: { id: any }) => element.id == requested_id)

        // Remove imagem atual do item:
        const item_image_path = data[index].image_path
        remove_image(item_image_path)

        // Renomear nova imagem com id do item:
        const old_image_path = req.files[0].path
        const image_extension = req.files[0].mimetype.split("/")[1]
        const new_image_path = `${store_path}/${req.body.restaurant_id}_${requested_id}.${image_extension}`
        fs.rename(old_image_path, new_image_path, (err) => {
            if (err) {
                console.error(`Error during image file rename: ${old_image_path} to ${new_image_path}`, err)
                res.status(500).json({
                    error: "Internal Server Error"
                })
                return
            }
        })

        // Atualiza dados do item:
        data[index] = {
            id: requested_id,
            restaurant_id: req.body.restaurant_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            categories: req.body.categories,
            image_path: new_image_path
        }

        // Guarda dados apos atualizacao do item:
        fs.writeFileSync(path.resolve(itens_json_path), JSON.stringify(data, null, 2))

        res.status(200).json({
            Response: "Item data has been updated successfully"
        })

    } catch(error : any) {
        console.log("Erro in updateItem:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}



export const getRestaurantItens = (req : any, res : any) => {
    try {
        // Carrega o banco de dados de itens:
        const parser_item = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))

        const requested_id = req.params.restaurantId
        
        /*
        // Carrega o banco de dados de restaurantes:
        const parser_restaurant = JSON.parse(fs.readFileSync(path.resolve(restaurant_json_path), 'utf-8'))

        // Verifica se tem um restaurante com o id especificado:
        if (!(id_exists(parser_restaurant, requested_id))) {
            console.log(`restaurant with id ${requested_id} not found`)
            res.status(200).json({
                Response: `There is no restaurant with id ${requested_id}`
            })
            return
        }

        // Verifica se tem mais de um restaurante com o mesmo id (ERRO):
        if (is_id_duplicated(parser_restaurant, requested_id)) {
            console.error(`Error: there is more than one restaurant with id ${requested_id}`)
            res.status(500).json({
                error: "Internal Server Error"
            })
            return
        }
        */

        // Filtra dos dados pegando apenas aquele com o restaurant_id igual ao especificado:
        var data = parser_item.filter((element: {restaurant_id: any}) => element.restaurant_id == requested_id)

        // Verifica se o restaurante tem algum item:
        if (data.length < 1) {
            console.log(`restaurant with id ${requested_id} dont have any itens`)
            res.status(200).json({
                Response: `Restaurant with id ${requested_id} has no itens`
            })
            return
        }

        // Prepara lista de dados que serão enviados:
        var data_list = []
        for (let i = 0; i < data.length; i++) {
            const item = data[i]

            const image_path = item.image_path
            const image_data = fs.readFileSync(image_path, { encoding: 'base64' })

            const item_send = {
                id: item.id,
                restaurant_id: item.restaurant_id,
                name: item.name,
                price: item.price,
                description: item.description,
                categories: item.categories,
                image_64: image_data
            }

            data_list.push(item_send)
        }

        // Manda os dados:
        res.status(200).json(data_list)

    } catch(error : any) {
        console.log("Erro in updateItem:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}



// Faz a verificação dos dados recebidos no corpo da requisição, retornando uma lista com os erros.
function verify_item_data(request : any): any {
    var error_list : String[] = []
    const request_body = request.body
    // restaurant_id
    if (request_body.restaurant_id == undefined) {
        error_list.push("restaurant_id is undefined")
    } else if (request_body.restaurant_id == "") {
        error_list.push("item has no restaurant_id")
    }
    // name
    if (request_body.name == undefined) {
        error_list.push("name is undefined")
    } else if (request_body.name.length < 1) {
        error_list.push("item has no name")
    }
    // price
    if (request_body.price == undefined) {
        error_list.push("price is undefined")
    } if (request_body.price == "") {
        error_list.push("item has no price")
    } else if ((request_body.price.split(".").length != 2) ||
               (request_body.price.split(".")[0].length < 1) ||
               (request_body.price.split(".")[1].length != 2)) {
        error_list.push("price value is in the wrong format")
    }
    // description
    if (request_body.description == undefined) {
        error_list.push("description is undefined")
    } else if (request_body.description == "") {
        error_list.push("item has no description")
    } else if (request_body.description.length > 50) {
        error_list.push("description is to long")
    }
    // categories
    if (request_body.categories == undefined) {
        error_list.push("categories is undefined")
    } else if (request_body.categories == "") {
        error_list.push("item has no categories")
    }
    // Image
    if (!(request.files[0])) {
        error_list.push("item has no image")
    }

    return error_list
}


function remove_image(image_path : string): any {
    fs.unlink(image_path, (err) => {
        if (err) {
            console.error('Erro ao deletar o arquivo:', err);
        }
    })
}

function id_exists(data: any, id: String): Boolean {
    const id_data = data.filter((element: { id: any }) => element.id == id)
    return id_data.length != 0
}

function is_id_duplicated(data: any, id: String): Boolean {
    const id_data = data.filter((element: { id: any }) => element.id == id)
    return id_data.length > 1
}