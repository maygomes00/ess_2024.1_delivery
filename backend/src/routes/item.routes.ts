import express from "express";
import {getItemById, addItem, updateItem, removeItem} from "../controllers/item.controller";

const router = express.Router()

// Get item:
router.get("/:itemId", getItemById)

// Post item:
router.post("/", addItem)

// Put item:
router.put("/:itemId", updateItem)

// Delete item:
router.delete("/:itemId", removeItem)

export default router