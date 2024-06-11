import { Express } from 'express';
import restaurantRouter from './restaurant.routes';
import menuRouter from './menu.routes';
import categoryRouter from './category.routes';
import userRoutes from './user.routes'

const setupRoutes = (app: Express): void => {
  app.use('/restaurant', restaurantRouter);
  app.use('/restaurant/menu', menuRouter);
  app.use('/restaurant/menu/category', categoryRouter);
  app.use('/users', userRoutes);
};

export default setupRoutes;