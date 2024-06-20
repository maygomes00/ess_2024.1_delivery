import { Router } from 'express';
import { menu } from '../controllers/menu.controller';

const menuRouter = Router();

menuRouter.get('/', menu);

export default menuRouter;