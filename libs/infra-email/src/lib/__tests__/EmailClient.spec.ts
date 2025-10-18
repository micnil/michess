import { EmailClient } from '../EmailClient';
import { EmailConfig } from '../model/EmailConfig';

describe('EmailCLient', () => {
  let emailClient: EmailClient;
  let mockConfig: EmailConfig;

  beforeEach(() => {
    mockConfig = {
      transportType: 'smtp',
      smtp: {
        host: 'smtp.test.com',
        port: 587,
        secure: false,
        auth: {
          user: 'test@test.com',
          pass: 'testpass',
        },
      },
    };
    emailClient = new EmailClient(mockConfig, 'noreply@test.com');
  });

  it('should create an instance', () => {
    expect(emailClient).toBeDefined();
  });
});
