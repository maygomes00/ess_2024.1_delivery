import { Router } from 'express';
import { login, logout } from '../controllers/login_restaurante.controller';

const restauranteloginRouter = Router();

restauranteloginRouter.post('/', login);
restauranteloginRouter.post('/logout-client', logout);

export default restauranteloginRouter;