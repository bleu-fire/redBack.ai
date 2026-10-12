import app from './app';
import { config } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(`Server khddam f port: http://localhost:${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });

    server.on('error', (err: any) => {
      console.error('[Server Error]:', err);
    });
  } catch (err) {
    console.error('[Server Init Failed]:', err);
  }
};

process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Unhandled Rejection]:', reason);
});

startServer();
