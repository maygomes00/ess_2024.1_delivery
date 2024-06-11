import express from "express";
import { storer } from "../multer.config"
import {getItemById, addItem, updateItem, removeItem} from "../controllers/item.controller";

const itemRouter = express.Router()

// Get item:
itemRouter.get("/:itemId", getItemById)

// Post item:
itemRouter.post("/", storer.any(), addItem)

// Put item:
itemRouter.put("/:itemId", updateItem)

// Delete item:
itemRouter.delete("/:itemId", removeItem)

export default itemRouter