import express from "express";
import { storer } from "../multer.config"
import {getItemById, addItem, updateItem, removeItem} from "../controllers/item.controller";

const router = express.Router()

// Get item:
router.get("/:itemId", getItemById)

// Post item:
router.post("/", storer.any(), addItem)

// Put item:
router.put("/:itemId", updateItem)

// Delete item:
router.delete("/:itemId", removeItem)

export default router