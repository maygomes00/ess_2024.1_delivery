import path from 'path'
import fs from 'fs'
import { randomInt } from 'crypto'

const itens_json_path = './src/data/Itens/Itens.json'
const max_id = 281474976710655

export const getItemById = (req : any, res : any) => {
    try {
        const parser = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))
        const data = parser.filter((element: { id: any }) => element.id == req.params.itemId)

        res.status(200).json(data)
    } catch(error : any) {
        console.log("Erro in getItemById:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const addItem = (req : any, res : any) => {
    try {
        var data = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))
        
        var new_id = randomInt(0, max_id)
        while (data.filter((element: { id: any }) => element.id == new_id).length > 0) {
            new_id = randomInt(0, max_id)
        }
        
        data.push({
            id: JSON.stringify(new_id),
            restaurant_id: req.body.restaurant_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            categories: req.body.categories,
            image: req.body.image
        })

        fs.writeFileSync(path.resolve(itens_json_path), JSON.stringify(data, null, 2))

        res.status(201).json(data)
    } catch(error : any) {
        console.log("Erro in addItem:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const updateItem = (req : any, res : any) => {
    try {
        var data = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))

        data[data.findIndex((element: { id: any }) => element.id == req.params.itemId)] = {
            id: req.params.itemId,
            restaurant_id: req.body.restaurant_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            categories: req.body.categories,
            image: req.body.image
        }

        fs.writeFileSync(path.resolve(itens_json_path), JSON.stringify(data, null, 2))

        res.status(200).json(data)
    } catch(error : any) {
        console.log("Erro in updateItem:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const removeItem = (req : any, res : any) => {
    try {
        var data = JSON.parse(fs.readFileSync(path.resolve(itens_json_path), 'utf-8'))
        
        data = data.filter((element: { id: any }) => element.id != req.params.itemId)

        fs.writeFileSync(path.resolve(itens_json_path), JSON.stringify(data, null, 2))

        res.status(200).json(data)
    } catch(error : any) {
        console.log("Erro in removeItem:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}