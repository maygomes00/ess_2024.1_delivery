import { Router } from 'express';
import { restaurant } from '../controllers/restaurant.controller';

const restaurantRouter = Router();

restaurantRouter.get('/', restaurant);

export default restaurantRouter;