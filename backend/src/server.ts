import app from './app';
import { config } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  // 1. Nconnectiw l database
  await connectDB();

  // 2. Nlanciw l server d Express
  app.listen(config.port, () => {
    console.log(`Server khddam f port: http://localhost:${config.port}`);
    console.log(` Environment: ${config.nodeEnv}`);
  });
};

startServer();

