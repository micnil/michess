export type EmailConfig =
  | {
      transportType: 'ses';
      ses: {
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
      };
    }
  | {
      transportType: 'smtp';
      smtp: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
          user: string;
          pass: string;
        };
      };
    };
