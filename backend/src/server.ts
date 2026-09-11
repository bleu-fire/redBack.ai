import { createApp } from './app';
import { connectDB } from './config/db';
import { config } from './config/env';

async function bootstrap() {
  await connectDB();

  const app = createApp();

  app.listen(config.port, () => {
    console.log(` Redback Express backend server running on http://localhost:${config.port}/api/v1`);
    console.log(` Environment: ${config.nodeEnv}`);
  });
}

// i need to know what is this is to start use it 
// bootstrap().catch((err) => {
//   console.error('Fatal bootstrap error:', err);
//   process.exit(1);
// });
