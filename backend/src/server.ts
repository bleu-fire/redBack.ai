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

<<<<<<< Updated upstream
=======
// تشغيل السيرفر والاتصال بقاعدة البيانات
>>>>>>> Stashed changes
bootstrap().catch((err) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
