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
    server: {
      port: parseInt(process.env.SERVER_PORT || '5000', 10),
    },
  };
};

export const AppConfigService = {
  get: getConfig,
};
