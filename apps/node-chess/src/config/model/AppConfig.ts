import { LlmConfig } from '@michess/api-service';
import { EmailConfig } from '@michess/infra-email';

export type AppConfig = {
  env: 'development' | 'production';
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
  llm: LlmConfig;
};
