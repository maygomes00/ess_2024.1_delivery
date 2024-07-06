import { Router } from 'express';
import { login } from '../controllers/login_cliente.controller';

const clienteRouter = Router();

clienteRouter.post('/', login);

export default clienteRouter;

