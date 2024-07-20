import { Router } from 'express';
import { login, logout } from '../controllers/login_cliente.controller';

const clienteRouter = Router();

clienteRouter.post('/login-client', login);
clienteRouter.post('/logout-client', logout);

export default clienteRouter;

