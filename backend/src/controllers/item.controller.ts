import path from 'path'
import fs from 'fs'
import { Router } from 'express'
import { storer } from "../multer.config"

const store_path = "./src/data/itens/images"

export default class ItemController {
    private prefix : string = "/restaurant/menu/item"
    private using_path : boolean
    private router: Router
    private itens_path : string
    private restaurant_path : string
    private item_data : any
    private restaurant_data : any

    constructor(use_path: boolean, router: Router, item_data_path: any = null,
                restaurant_data_path: any = null, item_data: any = null, restaurant_data: any = null){
        this.using_path = use_path
        this.router = router
        if (this.using_path) {
            this.itens_path = item_data_path
            this.restaurant_path = restaurant_data_path
        }
        else {
            this.item_data = item_data
            this.restaurant_data = restaurant_data
        }
    }

    public startRouter() {
        // Get item:
        this.router.get("/:itemId", this.getItemById)
        this.router.get("/all/:restaurantId", this.getRestaurantItens)

        // Post item:
        this.router.post("/", storer.any(), this.addItem)

        // Put item:
        this.router.put("/:itemId", storer.any(), this.updateItem)

        // Delete item:
        this.router.delete("/:itemId", this.removeItem)
    }

    // Recebe um requerimento GET e da como resposta um item de acordo com o id recebido como parametro.
    private getItemById = (req : any, res : any) => {
        try {
            // Carrega o banco de dados de itens:
            var parser = this.get_itens_database()

            // Procura item nos dados e dá a resposta.
            this.getById(parser, req, res)
            
            
        } catch(error : any) {
            console.log("Erro in getItemById:", error.message)
            res.status(500).json("Internal Server Error")
        }
    }

    // Retorna um elemento dos dados do parse de acordo com seu id.
    private getById (parser: any, req : any, res: any) {
    
        const requested_id = req.params.itemId
    
        // Verifica se tem um item com o id especificado:
        if (!(this.id_exists(parser, requested_id, res))) {
            console.log(`Erro: item with id ${requested_id} not found`)
            res.status(404).json(`item with id ${requested_id} not found`)
            return
        }
        
        // Filtra dos dados pegando apenas aquele com o id igual ao especificado:
        const database_data = parser.filter((element: { id: any }) => element.id == requested_id)

        // Cria o conjunto de dados que será enviado, com os dados do item e a imagem codificada:
        const item_data = {
            id: database_data[0].id,
            restaurant_id: database_data[0].restaurant_id,
            name: database_data[0].name,
            price: database_data[0].price,
            description: database_data[0].description,
            categories: database_data[0].categories,
            image64: database_data[0].image64
        }

        // Manda os dados como resposta:
        res.status(200).json(item_data)
    }
    
    // Adiciona item ao banco de dados.
    private addItem = (req : any, res : any, database : any = null) => {
        try {
            // Carrega o banco de dados de itens:
            var data = this.get_itens_database()
            
            // Define o id do item:
            var new_id = this.define_new_item_id()
            
            // Verifica se as informações recebidas estão no formato correto e completas.
            if (!this.verify_info(req, res)){
                return
            }
    
            // Transforma imagem para base 64:
            const image_64 = this.image_to_64(req, res)
            if (image_64 == null) {
                return
            }

            // Remove imagem salva na pasta (fica salva só no item, como uma string):
            this.remove_image(req.files[0].path)
    
            // Adiciona as informações do item a lista de dados:
            data.push({
                id: JSON.stringify(new_id),
                restaurant_id: req.body.restaurant_id,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                categories: req.body.categories,
                image64: image_64
            })
            
            // Guarda dos dados no banco de dados de itens:
            this.set_itens_database(data)
    
            res.status(201).json("Item data was saved successfully")
    
        } catch(error : any) {
            console.log("Erro in addItem:", error.message)
            res.status(500).json("Internal Server Error")
        }
    }
    
    // Remove item do banco de dados.
    private removeItem = (req : any, res : any) => {
        try {
            // Carrega o banco de dados de itens:
            var data = this.get_itens_database()
            
            const requested_id = req.params.itemId
    
            // Verifica se o item com o id especificado exista:
            if (!this.id_exists(data, requested_id, res)) {
                return
            }
    
            // Elimina item com id especificado:
            data = data.filter((element: { id: any }) => element.id != requested_id)
    
            // Atualiza id dos itens:
            data = this.update_itens_id(data)
    
            // Guarda dos dados no banco de dados de itens:
            this.set_itens_database(data)
    
            res.status(200).json("Item data was removed successfully")
    
        } catch(error : any) {
            console.log("Erro in removeItem:", error.message)
            res.status(500).json("Internal Server Error")
        }
    }
    
    // Atualiza informações de um item no banco de dados
    private updateItem = (req : any, res : any) => {
        try {
            // Carrega o banco de dados de itens:
            var data = this.get_itens_database()
            
            const requested_id = req.params.itemId
    
            // Verifica se o item com o id especificado exista:
            if (!this.id_exists(data, requested_id, res)) {
                return
            }
    
            // Verifica se as informações recebidas estão no formato correto e completas.
            if (!this.verify_info(req, res)){
                return
            }
    
            // guarda indice do item que vai ser atualizado:
            const index = data.findIndex((element: { id: any }) => element.id == requested_id)
    
            // Transforma imagem para base 64:
            const image_64 = this.image_to_64(req, res)
            if (image_64 == null) {
                return
            }

            // Remove imagem salva na pasta (fica salva só no item, como uma string):
            this.remove_image(req.files[0].path)
    
            // Atualiza dados do item:
            data[index] = {
                id: requested_id,
                restaurant_id: req.body.restaurant_id,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                categories: req.body.categories,
                image64: image_64
            }
    
            // Guarda dos dados no banco de dados de itens:
            this.set_itens_database(data)
    
            res.status(200).json("Item data has been updated successfully")
    
        } catch(error : any) {
            console.log("Erro in updateItem:", error.message)
            res.status(500).json("Internal Server Error")
        }
    }
    
    private getRestaurantItens = (req : any, res : any) => {
        try {
            // Carrega o banco de dados de itens:
            var parser_item = this.get_itens_database()
            
            const requested_id = req.params.restaurantId
            
            // Carrega o banco de dados de restaurantes:
            const parser_restaurant = this.get_restaurant_database()
            
            // Verifica se o restaurante com o id especificado exista:
            if (!this.id_exists_rest(parser_restaurant, requested_id, res)) {
                return
            }
    
            // Filtra dos dados pegando apenas aquele com o restaurant_id igual ao especificado:
            var data = parser_item.filter((element: {restaurant_id: any}) => element.restaurant_id == requested_id)
    
            // Verifica se o restaurante tem algum item:
            if (data.length < 1) {
                console.log(`restaurant with id ${requested_id} dont have any itens`)
                res.status(200).json([])
                return
            }
    
            // Prepara lista de dados que serão enviados:
            var data_list = []
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
    
                const item_send = {
                    id: item.id,
                    restaurant_id: item.restaurant_id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    categories: item.categories,
                    image64: item.image64
                }
    
                data_list.push(item_send)
            }
    
            // Manda os dados:
            res.status(200).json(data_list)
    
        } catch(error : any) {
            console.log("Erro in updateItem:", error.message)
            res.status(500).json("Internal Server Error")
        }
    }

    // Retorna o banco de dados dos itens que está sendo usado.
    public get_itens_database (): any {
        if (this.using_path) {
            return JSON.parse(fs.readFileSync(this.itens_path, 'utf-8'))   
        }
        else {
            return this.item_data
        }
    }

    // Retorna o banco de dados dos restaurantes que está sendo usado.
    public get_restaurant_database (): any {
        if (this.using_path) {
            return JSON.parse(fs.readFileSync(this.restaurant_path, 'utf-8'))   
        }
        else {
            return this.restaurant_data
        }
    }

    // Atualiza a base de dados de item pela base de dados recebida.
    public set_itens_database (data: any): any {
        if (this.using_path) {
            fs.writeFileSync(path.resolve(this.itens_path), JSON.stringify(data, null, 2))   
        }
        else {
            this.item_data = data
        }
    }

    // Função responsavel por dar o indice de um novo item.
    private define_new_item_id(): any {
        const data = this.get_restaurant_database()
        const new_id = data.length
        return new_id
    }

    // Função responsavel por atualizar os indices dos itens, depois que um é removido.
    private update_itens_id(item_data : any,): any {
        for (let i = 0; i < item_data.length; i++) {
            item_data[i].id = JSON.stringify(i)
            return item_data
        }
    }

    // Verifica se dados do item recebidos estão corretos, retorna true se sim e false se não.
    private verify_info (req: any, res: any): boolean {
        const errors_found = this.verify_item_data(req)
        if (errors_found.length> 0) {
            if (req.files[0]){
                this.remove_image(req.files[0].path)
            }
            console.error("Error in recived data: " + errors_found.join(", "))
            res.status(400).json("Error: " + errors_found.join(", "))
            return false
        }
        return true
    }

    // Faz a verificação dos dados recebidos no corpo da requisição, retornando uma lista com os erros.
    private verify_item_data(request : any): any {
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
        if ((request_body.image64 == undefined || request_body.image64 == "") && !(request.files[0])) {
            error_list.push("item has no image")
        }
        return error_list
    }

    // Retorna a imagem que veiro na requisição em uma string base 64.
    private image_to_64(req: any, res: any) {
        if (req.files[0]) {
            const image_path = req.files[0].path
            const image_buffer = fs.readFileSync(image_path)
            return image_buffer.toString('base64')
        }
        else if (req.body.image64) {
            return req.body.image64
        }
        else {
            console.log("Erro: Erro na convercao da imagem para base 64")
            res.status(500).json("Internal Server Error")
            return null
        }
    }

    // Função responsavel por renomear a imagem para que ela possa ser identificada, de acordo com id do item e do restaurante.
    private giveItemImageName (req: any, res : any, item_id: any) {
        const old_image_path = req.files[0].path
        const image_extension = req.files[0].mimetype.split("/")[1]
        const new_image_path = `${store_path}/${req.body.restaurant_id}_${item_id}.${image_extension}`
        fs.rename(old_image_path, new_image_path, (err) => {
            if (err) {
                console.error(`Error during image file rename: ${old_image_path} to ${new_image_path}`, err)
                res.status(500).json("Internal Server Error")
                return null
            }
        })
        return new_image_path
    }

    private id_exists(data: any, id: String, res: any): Boolean {
        const id_data = data.filter((element: { id: any }) => element.id == id)
        if (id_data.length == 0) {
            console.log(`Erro: item with id ${id} not found`)
            res.status(404).json(`item with id ${id} not found`)
            return false
        }
        return true
    }

    private id_exists_rest(data: any, id: String, res: any): Boolean {
        const id_data = data.filter((element: { id: any }) => element.id == id)
        if (id_data.length == 0) {
            console.log(`Erro: restaurant with id ${id} not found`)
                res.status(404).json(`restaurant with id ${id} not found`)
            return false
        }
        return true
    }

    private remove_image(image_path : string): any {
        fs.unlink(image_path, (err) => {
            if (err) {
                console.error('Erro ao deletar o arquivo:', err);
            }
        })
    }
}