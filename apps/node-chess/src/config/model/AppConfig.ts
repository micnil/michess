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
};
