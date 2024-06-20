import express from "express";
import ItemController from "../controllers/item.controller";

const itemRouter = express.Router()
const itens_json_path = './src/data/itens/itens.json'
const restaurant_json_path = './src/data/restaurants/restaurants.json'

const itens_test = JSON.parse("[]")
const restaurant_test = JSON.parse("[]")

// Cria e inicia o controlador das rotas de item:
var item_controller = new ItemController(true, itemRouter, itens_json_path, restaurant_json_path, itens_test, restaurant_test)
item_controller.startRouter()

export default item_controller