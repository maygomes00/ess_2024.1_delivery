import app from './app';
import logger from './logger';
import Env from './env';

app.listen(Env.PORT, () => {
  logger.info(`Server started on http://localhost:${Env.PORT}/api`);
});

// Import routes:
import pingRoutes from "./routes/ping.routes";
import itemRoutes from "./routes/item.routes";

app.use("/ping", pingRoutes)
app.use("/item", itemRoutes)