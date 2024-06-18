import { Router } from 'express';
import { login, logout, forgotPassword } from '../controllers/login_cliente.controller';

const clienteRouter = Router();

clienteRouter.post('/', login);
clienteRouter.post('/logout', logout);
clienteRouter.post('/forgotPassword', forgotPassword);

export default clienteRouter;