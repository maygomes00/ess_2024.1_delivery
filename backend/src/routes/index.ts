import { Express } from 'express';
import express from 'express';
import restaurantsRouter from './restaurant.routes';
import menuRouter from './menu.routes';
import clienteRouter from './login_cliente.routes';
import restauranteloginRouter from './login_restaurante.routes';
import categoryRouter from './category.routes';
import userRoutes from './usuario.routes'
import itemController from './item.routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import senhaRouter from './esqueci_senha.routes';

const setupRoutes = (app: Express): void => {
  app.use('/restaurant', restaurantsRouter);
  app.use('/restaurant/menu', menuRouter);
  app.use('/restaurant/menu/category', categoryRouter);
  app.use('/users', userRoutes);
  app.use('/login-client', clienteRouter);
  app.use('/logout-client', clienteRouter);
  app.use('/login-restaurant', restauranteloginRouter);
  app.use('/logout-restaurant', restauranteloginRouter);
  app.use('/forgot-password', senhaRouter);
  app.use(bodyParser.json());
  app.use(express.json());
  app.use("/restaurant/menu/item", itemController.router)
};


export default setupRoutes;
