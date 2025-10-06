import { AppConfig } from '../model/AppConfig';

const readEnvStrict = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getConfig = (): AppConfig => {
  const DATABASE_URL = readEnvStrict('DATABASE_URL');
  return {
    database: {
      url: DATABASE_URL,
    },
    redis: {
      password: process.env.REDIS_PASSWORD || undefined,
      url: process.env.REDIS_URL || 'localhost',
    },
    server: {
      port: parseInt(process.env.SERVER_PORT || '5000', 10),
    },
    cors: {
      origins: (process.env.CORS_ORIGINS || 'http://localhost:4200').split(','),
    },
    email: {
      host: readEnvStrict('EMAIL_HOST'),
      port: parseInt(readEnvStrict('EMAIL_PORT'), 10),
      secure: (process.env.EMAIL_SECURE || 'false').toLowerCase() === 'true',
      auth: {
        user: readEnvStrict('EMAIL_USER'),
        pass: readEnvStrict('EMAIL_PASS'),
      },
    },
    auth: {
      google: {
        clientId: readEnvStrict('GOOGLE_OAUTH_CLIENT_ID'),
        clientSecret: readEnvStrict('GOOGLE_OAUTH_CLIENT_SECRET'),
      },
    },
  };
};

export const AppConfigService = {
  get: getConfig,
};
