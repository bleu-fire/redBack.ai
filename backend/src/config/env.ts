import dotenv from 'dotenv';

// read the file in the  roo of backend env
dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/redback_db',
  jwtSecret: process.env.JWT_SECRET || 'default-secret-change-it',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

