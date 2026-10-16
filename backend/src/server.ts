import app from './app';
import { config } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  try {
    await connectDB();

    const hasVisionProvider = Boolean(
      process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY
    );
    const hasChatProvider = Boolean(
      process.env.DEEPSEEK_API_KEY ||
        process.env.GROQ_API_KEY ||
        process.env.GEMINI_API_KEY
    );
    if (!hasVisionProvider || !hasChatProvider) {
      const missingFeatures = [
        !hasVisionProvider && 'image identification',
        !hasChatProvider && 'Naturalist AI chat',
      ].filter(Boolean);
      console.warn(
        `[AI setup] No provider key configured for ${missingFeatures.join(' and ')}. ` +
          'Add provider keys to backend/.env and restart the backend.'
      );
    }

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
