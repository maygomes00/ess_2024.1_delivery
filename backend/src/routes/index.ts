import { Express } from 'express';
import restaurantRouter from './restaurant.routes';
import menuRouter from './menu.routes';
import clienteRouter from './login_cliente.routes';
import restauranteloginRouter from './login_restaurante.routes';
import categoryRouter from './category.routes';
import userRoutes from './user.routes'
import itemRouter from './item.routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const setupRoutes = (app: Express): void => {
  app.use('/restaurant', restaurantRouter);
  app.use('/restaurant/menu', menuRouter);
  app.use('/restaurant/menu/category', categoryRouter);
  app.use('/users', userRoutes);
  app.use('/login/client', clienteRouter);
  app.use('/login/restaurant', restauranteloginRouter);
  app.use('/forgot-password', clienteRouter);
  app.use('/reset-password', clienteRouter);
  app.use(bodyParser.json());
  app.use("/restaurant/menu/item", itemRouter)
};


export default setupRoutes;