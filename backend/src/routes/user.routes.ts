import express from 'express';
import { getAllUsers, getUserById, getUserOrders, registerUser, updateUserDetails, deleteUserAccount } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/:userId/orders', getUserOrders);

// Novas rotas para cadastro e manutenção de usuários
router.post('/register', registerUser);
router.put('/:userId/details', updateUserDetails);
router.delete('/:userId/account', deleteUserAccount);

export default router;
