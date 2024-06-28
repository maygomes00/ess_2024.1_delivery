import { Router } from 'express';
import { login } from '../controllers/login_restaurante.controller';

const restauranteloginRouter = Router();

restauranteloginRouter.post('/', login);

export default restauranteloginRouter;