import { Router } from 'express';
import { category, category1 } from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/', category);
categoryRouter.get('/1', category1);


export default categoryRouter;