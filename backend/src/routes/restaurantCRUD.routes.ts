import { Router } from 'express';
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantCRUDController';

export const restaurantsCRUDRouter = Router();

restaurantsCRUDRouter.get('/', getRestaurants);
restaurantsCRUDRouter.get('/:id', getRestaurantById);
restaurantsCRUDRouter.post('/', createRestaurant);
restaurantsCRUDRouter.put('/:id', updateRestaurant);
restaurantsCRUDRouter.delete('/:id', deleteRestaurant);

export default restaurantsCRUDRouter;
