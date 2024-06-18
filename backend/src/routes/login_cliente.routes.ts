import { Router } from 'express';
import { login, logout, forgotPassword, resetPassword } from '../controllers/login_cliente.controller';

const clienteRouter = Router();

clienteRouter.post('/', login);
clienteRouter.post('/logout', logout);
clienteRouter.post('/forgot-password', forgotPassword);
clienteRouter.post('/reset-password/:token', resetPassword);

export default clienteRouter;

