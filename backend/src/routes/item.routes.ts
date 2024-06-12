import express from "express";
import { storer } from "../multer.config"
import {getItemById, addItem, removeItem, updateItem, getRestaurantItens} from "../controllers/item.controller";

const itemRouter = express.Router()

// Get item:
itemRouter.get("/:itemId", getItemById)
itemRouter.get("/all/:restaurantId", getRestaurantItens)

// Post item:
itemRouter.post("/", storer.any(), addItem)

// Put item:
itemRouter.put("/:itemId", storer.any(),updateItem)

// Delete item:
itemRouter.delete("/:itemId", removeItem)

export default itemRouter