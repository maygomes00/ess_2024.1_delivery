import { Router } from 'express';
import { forgotPassword, resetPassword } from '../controllers/esqueci_senha_cliente.controller';

const senhaRouter = Router();

senhaRouter.post('/', forgotPassword);
senhaRouter.post('/reset/:token', resetPassword);

export default senhaRouter;