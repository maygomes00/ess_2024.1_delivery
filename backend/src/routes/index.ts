import { Express } from 'express';
import { restaurantsRouter } from './restaurant.routes';
import menuRouter from './menu.routes';
import categoryRouter from './category.routes';
import userRoutes from './user.routes'
import itemRouter from './item.routes';

const setupRoutes = (app: Express): void => {
  app.use('/restaurant', restaurantsRouter);
  app.use('/restaurant/menu', menuRouter);
  app.use('/restaurant/menu/category', categoryRouter);
  app.use('/users', userRoutes);
  app.use("/restaurant/menu/item", itemRouter)
};

export default setupRoutes;