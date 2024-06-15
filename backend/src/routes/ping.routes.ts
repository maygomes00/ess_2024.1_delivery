import express from "express";
import {ping} from "../controllers/ping.controller";

const router = express.Router()

router.get("/", ping)

export default router