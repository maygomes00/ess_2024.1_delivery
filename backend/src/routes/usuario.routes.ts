import express from 'express';
import {
  clienteGetAllJson,
  clienteGetById,
  clienteAddJson,
  clienteUpdateJson,
  clienteDeleteJson,
  getUserOrders,
  addUserOrder,
} from '../controllers/usuario.controller';

const router = express.Router();

router.get('/', clienteGetAllJson);
router.get('/:id', clienteGetById);
router.post('/register', clienteAddJson);
router.put('/:id', clienteUpdateJson);
router.delete('/:id', clienteDeleteJson);
router.get('/:id/orders', getUserOrders);
router.post('/:id/:produto_id', addUserOrder);

export default router;
