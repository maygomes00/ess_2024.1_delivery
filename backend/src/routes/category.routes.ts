import { Router } from 'express';
import { categoryGetAllJson, categoryGetById, categoryAddJson, categoryUpdateJson } from '../controllers/category.controller';

const categoryRouter = Router();

//GET
categoryRouter.get('/', categoryGetAllJson);
categoryRouter.get('/:id', categoryGetById);

//POST
categoryRouter.post('/', categoryAddJson);

//PUT
categoryRouter.put('/:id', categoryUpdateJson);

//DELET
//categoryRouter.delete('/:id', categoryDeleteJson);

export default categoryRouter;