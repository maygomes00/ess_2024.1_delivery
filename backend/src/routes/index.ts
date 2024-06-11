import { Express } from 'express';
import restaurantRouter from './restaurant.routes'
import menuRouter from './menu.routes';
import categoryRouter from './category.routes';
import itemRouter from './item.routes';

const setupRouters = (app: Express): void => {
  app.use('/restaurant', restaurantRouter)
  app.use("/restaurant/menu", menuRouter)
  app.use("/restaurant/menu/category", categoryRouter)
  app.use("/restaurant/menu/item", itemRouter)
}

export default setupRouters
