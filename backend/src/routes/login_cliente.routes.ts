import { Router } from 'express';
import { login, logout} from '../controllers/login_cliente.controller';

const clienteRouter = Router();

clienteRouter.post('/', login);
clienteRouter.post('/logout', logout);

export default clienteRouter;

