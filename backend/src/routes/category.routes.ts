import { Router } from 'express';
import { categoryGetAllJson, categoryAddJson, categoryUpdateJson, categoryDeleteJson } from '../controllers/category.controller';

const categoryRouter = Router();

//GET
categoryRouter.get('/', categoryGetAllJson);

//POST
categoryRouter.post('/', categoryAddJson);

//PUT
categoryRouter.put('/:id', categoryUpdateJson);

//DELET
categoryRouter.delete('/:id', categoryDeleteJson);

export default categoryRouter;