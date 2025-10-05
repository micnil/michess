import { EmailConfig } from '../../model/EmailConfig';
import { EmailService } from '../EmailService';

describe('EmailService', () => {
  let emailService: EmailService;
  let mockConfig: EmailConfig;

  beforeEach(() => {
    mockConfig = {
      host: 'smtp.test.com',
      port: 587,
      secure: false,
      auth: {
        user: 'test@test.com',
        pass: 'testpass',
      },
    };
    emailService = new EmailService(mockConfig, 'noreply@test.com');
  });

  it('should create an instance', () => {
    expect(emailService).toBeDefined();
  });
});
