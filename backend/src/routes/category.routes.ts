import { Router } from 'express';
import { categoryGetAll, categoryGetById, categoryAdd, categoryUpdate, categoryDelete } from '../controllers/category.controller';

const categoryRouter = Router();

//GET
categoryRouter.get('/', categoryGetAll);
categoryRouter.get('/:id', categoryGetById);

//POST
categoryRouter.post('/', categoryAdd);

//PUT
categoryRouter.put('/:id', categoryUpdate);

//DELET
categoryRouter.delete('/:id', categoryDelete);

export default categoryRouter;