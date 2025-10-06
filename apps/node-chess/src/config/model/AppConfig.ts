import { EmailConfig } from '@michess/infra-email';

export type AppConfig = {
  database: {
    url: string;
  };
  redis: {
    url: string;
    password?: string;
  };
  server: {
    port: number;
  };
  cors: {
    origins: string[];
  };
  email: EmailConfig;
  auth: {
    google: {
      clientId: string;
      clientSecret: string;
    };
  };
};
