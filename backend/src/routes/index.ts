import { Express } from 'express';
import restaurantRouter from './restaurant.routes';
import menuRouter from './menu.routes';
import categoryRouter from './category.routes';

const setupRoutes = (app: Express): void => {
  app.use('/restaurant', restaurantRouter);
  app.use('/restaurant/menu', menuRouter);
  app.use('/restaurant/menu/category', categoryRouter);
};

export default setupRoutes;
