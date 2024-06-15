import express from 'express'
import { getAllUsers, getUserById, getUserOrders } from '../controllers/user.controller'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.get('/:userId/orders', getUserOrders)

export default router