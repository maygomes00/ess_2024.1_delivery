import { Router } from 'express';
import { testeGetAllJson, testeUpdateJson, testeDeleteJson, testAddJson} from '../controllers/teste.controller';

const testeRouter = Router();

//GET
testeRouter.get('/', testeGetAllJson);

//POST
testeRouter.post('/', testAddJson);

//PUT
testeRouter.put('/:id', testeUpdateJson);

//DELETE
testeRouter.delete('/:id', testeDeleteJson);

export default testeRouter;